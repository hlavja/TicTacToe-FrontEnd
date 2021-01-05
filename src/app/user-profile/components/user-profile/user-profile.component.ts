import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../auth/services/auth.service";
import {AccountResourceService, PasswordChangeDTO, UserDTO} from "../../../shared/swagger-generated";
import {of, Subscription} from "rxjs";
import {CustomValidationService} from "../../../register/services/customvalidation.service";
import {catchError, map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {UserState} from "../../../auth/states/user.state";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  settingsForm: FormGroup;
  passwordForm: FormGroup;
  submitted = false;
  showLoading = false;
  showError = false;
  errorMessage = String;
  user: UserDTO;
  success = false;
  subscription: Subscription[] = [];
  successMessage: string;

  constructor(
    private customValidator: CustomValidationService,
    private fb: FormBuilder,
    private authService: AuthService,
    private accountService: AccountResourceService,
    private userState: UserState
  ) { }

  ngOnInit(): void {
    this.settingsForm = this.fb.group({
      lastName: [undefined],
      firstName: [undefined],
    });
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirmPassword: ['', [Validators.required]]
      },
    {
      validator: this.customValidator.MatchPassword('newPassword', 'confirmPassword'),
      }
    );
    this.setUser();
  }

  updateUser(){
    const changedUser: UserDTO = {
      firstName: this.settingsForm.controls['firstName'].value,
      lastName: this.settingsForm.controls['lastName'].value,
      login: this.user.login
    }
    console.log(changedUser);
    this.accountService.saveAccountUsingPOST(changedUser, "response").pipe(
      map((response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.successMessage = 'Info updated!';
          this.success = true;
          this.userState.getUser$(true);
        }
      }) , catchError (err => {
        this.handleErrorInfo(err)
        return of (null);
      })
    ).toPromise();
  }

  changePassword(){
    this.submitted = true;
    const newPassword: PasswordChangeDTO = {
      currentPassword: this.passwordForm.controls['currentPassword'].value,
      newPassword: this.passwordForm.controls['newPassword'].value
    }
    if (this.passwordForm.valid) {
      this.accountService.changePasswordUsingPOST(newPassword, "response").pipe(
        map((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.successMessage = 'Password successfully changed!';
            this.success = true;
          }
        }) , catchError (err => {
          this.handleErrorPassword(err)
          return of (null);
        })
      ).toPromise();
    } else {
      this.submitted = false;
    }
  }

  handleErrorInfo(err): void{
    this.showError = true;
    this.errorMessage = err.error.title;
    this.submitted = false;
    this.showLoading = false;
  }

  handleErrorPassword(err): void{
    this.passwordForm.controls['currentPassword'].reset();
    this.passwordForm.controls['newPassword'].reset();
    this.passwordForm.controls['confirmPassword'].reset();
    this.showError = true;
    this.errorMessage = err.error.title;
    this.submitted = false;
    this.showLoading = false;
  }

  get settingsFormControl() {
    return this.settingsForm.controls;
  }

  get passwordFormControl() {
    return this.passwordForm.controls;
  }

  setUser(){
    this.authService.getUserState().subscribe(res => {
      if(res){
        this.user = res;
        this.settingsForm.controls['firstName'].setValue(res.firstName);
        this.settingsForm.controls['lastName'].setValue(res.lastName);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.forEach(subs => subs.unsubscribe());
  }

}
