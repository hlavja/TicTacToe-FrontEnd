import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import {CustomvalidationService} from "../services/customvalidation.service";
import {of} from "rxjs";
import {AccountResourceService, ManagedUserVM} from "../../shared/swagger-generated";
import {Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  showLoading = false;
  showSuccess = false;
  successMessage = "Registration complete! You will be redirected to login page!";
  showError = false;
  errorMessage = String;

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private accountService: AccountResourceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required], this.customValidator.userNameValidator.bind(this.customValidator)],
        password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      }
    );
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.showError = false;
    if (this.registerForm.valid) {
      this.showLoading = true;
      this.register(this.registerForm);
    } else {
      this.submitted = false;
    }
  }

  register(registerForm: FormGroup): void {
    const managedUserVM: ManagedUserVM = {
      email: registerForm.controls['email'].value,
      login: registerForm.controls['username'].value,
      password: registerForm.controls['password'].value
    }
    this.accountService.registerAccountUsingPOST(managedUserVM, "response").pipe(
      map((response: HttpResponse<any>) => {
        if (response.status === 201) {
          this.showSuccess = true;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 5000);
        }
      }) , catchError (err => {
        this.handleError(err)
        return of (null);
      })
    ).toPromise();
  }

  handleError(err): void{
    this.registerForm.controls['password'].reset();
    this.registerForm.controls['confirmPassword'].reset();
    this.showError = true;
    this.errorMessage = err.error.title;
    this.submitted = false;
    this.showLoading = false;
  }
}
