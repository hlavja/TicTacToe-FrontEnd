import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {AuthService} from "../../auth/services/auth.service";
import {Router} from "@angular/router";
import {AccountResourceService, UserDTO} from "../../shared/swagger-generated";
import {UserState} from "../../auth/states/user.state";
import {LobbyService} from "../../lobby/services/lobby.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  disableSubmitButton$:BehaviorSubject<boolean> = new BehaviorSubject<boolean> (false);
  loginForm: FormGroup;
  submitted: boolean;
  subscription: Subscription;
  showError = false;
  showLoading = false;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private accountService: AccountResourceService,
    private userState: UserState,
    private lobbyService: LobbyService
  ) {
    this.subscription = this.disableSubmitButton$.subscribe(submitted => this.submitted = submitted);
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
    this.subscription.unsubscribe();
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
    this.authService.doLogin({
      username: loginForm.controls['email'].value,
      password: loginForm.controls['password'].value,
      rememberMe: loginForm.controls['rememberMe'].value
    })
      .toPromise()
      .then((success) => {
        this.disableSubmitButton$.next(false);
        if (success){
          this.authService.getUser().toPromise().then( (success) => {
            if(success){
              this.router.navigate(['/lobby']);
            }
          })
        } else {
          this.showError = true;
          this.errorMessage = "Wrong email and password!"
          this.loginForm.reset();
        }
      });
  }

  userRedirect(): void {
    if (this.authService.getRoles()){
      this.router.navigate(['/lobby']);
    }
  }
}
