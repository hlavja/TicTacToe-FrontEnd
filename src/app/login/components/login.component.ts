import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {BehaviorSubject, Subscription} from 'rxjs';
import {Router} from "@angular/router";
import {LoginService} from "../../core/login/login.service";

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
    private router: Router,
    private loginService: LoginService
  ) {
    this.subscription = this.disableSubmitButton$.subscribe(submitted => this.submitted = submitted);
  }

  get registerFormControl() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.userRedirect();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
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
      this.login();
    } else {
      this.submitted = false;
      this.showError = true;
      this.errorMessage = "Need to fill form!"
    }
  }

  login(): void {
    this.loginService
      .login({
        username: this.loginForm.get('email')!.value,
        password: this.loginForm.get('password')!.value,
        rememberMe: false,
      })
      .subscribe(
        () => {
          if (
            this.router.url === '/account/register' ||
            this.router.url.startsWith('/account/activate') ||
            this.router.url.startsWith('/account/reset/')
          ) {
            this.router.navigate(['/lobby']);
          }
        },
        () => (this.showError = true)
      );
  }

  /*login(loginForm: FormGroup): void {
    this.authService.doLogin({
      email: loginForm.controls['email'].value,
      password: loginForm.controls['password'].value,
      rememberMe: loginForm.controls['rememberMe'].value
    }).toPromise()
      .then((success) => {
        this.disableSubmitButton$.next(false);
        if (success){
          this.router.navigate(['/lobby']);
        } else {
          this.showError = true;
          this.errorMessage = "Wrong email and password!"
          this.loginForm.reset();
        }
      });
  }*/

  userRedirect(): void {
   /* if (this.authService.getUser()){
      this.router.navigate(['/lobby']);
    }*/
  }
}
