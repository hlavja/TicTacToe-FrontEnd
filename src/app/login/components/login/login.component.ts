import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {BehaviorSubject, Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public disableSubmitButton$:BehaviorSubject<boolean> = new BehaviorSubject<boolean> (false);
  public loginForm: FormGroup;
  public returnUrl: string;
  public submitted: boolean;
  public subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.subscription = this.disableSubmitButton$.subscribe(submitted => this.submitted = submitted);
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(){
    this.submitted = true;
  }

  login(loginForm: FormGroup): void {
    /*this.messageService.clear();
    this.authService.doLogin({
      username: loginForm.controls['username'].value,
      password: loginForm.controls['password'].value,
      rememberMe: false
    }).toPromise()
      .then((success) => {
        this.disableSubmitButton$.next(false);
        if (success){
          this.userRedirect();
        } else {
          this.messageService.add({severity:'error', summary: "Nesprávné přihlašovací údaje -> neúspěšné přihlášení!", closable: false});
        }
      });*/
  }

  userRedirect(): void {
    /*if (this.authService.getUser().userRoleCode === 'ROLE_ADMIN'){
      this.router.navigate(['/accounts']);
    } else {
      this.router.navigate(['/user-account/cust-user', this.authService.getUser().id]);
    }*/
  }
}
