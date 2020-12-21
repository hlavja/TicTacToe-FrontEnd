import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {BehaviorSubject, of, Subscription} from 'rxjs';
import {AuthService} from "../../auth/services/auth.service";
import {Router} from "@angular/router";
import {AccountResourceService} from "../../shared/swagger-generated";
import {UserState} from "../../auth/states/user.state";
import {WebsocketService} from "../../shared/services/websocket.service";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  disableSubmitButton$:BehaviorSubject<boolean> = new BehaviorSubject<boolean> (false);
  loginForm: FormGroup;
  submitted: boolean;
  subscription: Subscription[] = [];
  showError = false;
  showLoading = false;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private accountService: AccountResourceService,
    private userState: UserState,
    private lobbyService: WebsocketService
  ) {
    this.subscription[0] = this.disableSubmitButton$.subscribe(submitted => this.submitted = submitted);
  }

  get registerFormControl() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.lobbyService.disconnect();
    this.userRedirect();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required/*, Validators.email*/]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  ngOnDestroy(): void{
    this.subscription.forEach(sub => sub.unsubscribe);
  }

  onSubmit(){
    this.submitted = true;
    if (this.loginForm.valid) {
      this.showError = false;
      this.login(this.loginForm);
    } else {
      this.submitted = false;
      this.showError = true;
      this.errorMessage = "Need to fill form!"
    }
  }

  login(loginForm: FormGroup): void {
    this.subscription[2] = this.authService.doLogin({
      username: loginForm.controls['email'].value,
      password: loginForm.controls['password'].value,
      rememberMe: loginForm.controls['rememberMe'].value
    })
      .pipe(
        switchMap(res => {
          this.disableSubmitButton$.next(false);
          if (res){
            return this.authService.getUserState();
          } else {
            this.showError = true;
            this.errorMessage = "Wrong email and password!"
            this.loginForm.reset();
            return of (false);
          }
        })
      ).subscribe(
        res => {
          if (res){
            this.subscription[2].unsubscribe();
            this.router.navigate(['/lobby']);
          }
        }
    );
  }

  userRedirect(): void {
    if (this.authService.getRoles()){
      this.router.navigate(['/lobby']);
    }
  }
}
