import { Component, OnInit } from '@angular/core';
import {AccountResourceService, PasswordChangeDTO, UserDTO, UserResourceService} from "../../shared/swagger-generated";
import {catchError, map, tap} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {of, Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidationService} from "../../register/services/customvalidation.service";

@Component({
  selector: 'app-user-administration',
  templateUrl: './user-administration.component.html',
  styleUrls: ['./user-administration.component.scss']
})
export class UserAdministrationComponent implements OnInit {

  passwordForm: FormGroup;
  users: UserDTO[];
  showLoading = false;
  submitted = false;
  showError = false;
  errorMessage = String;
  success = false;
  successMessage: string;

  constructor(
    private userService: UserResourceService,
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private accountService: AccountResourceService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.passwordForm = this.fb.group({
        newPassword: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      }
    );
  }

  get passwordFormControl() {
    return this.passwordForm.controls;
  }


  getUsers(){
    this.userService.getAllUsersUsingGET("body").pipe(
      tap(data => this.users = data)
    ).toPromise();
  }

  demote(id: number) {
    this.userService.demoteUsingPUT(id,"response").pipe(
      map((response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.users.find(user => user.id === id).authorities = ["ROLE_USER"];
        }
      }) , catchError (err => {
        this.handleError(err)
        return of (null);
      })
    ).toPromise();
  }

  promote(id: number) {
    this.userService.promoteUserUsingPUT(id,"response").pipe(
      map((response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.users.find(user => user.id === id).authorities = ["ROLE_ADMIN"];
        }
      }) , catchError (err => {
        this.handleError(err)
        return of (null);
      })
    ).toPromise();
  }

  private handleError(err: any) {
    this.passwordForm.controls['newPassword'].reset();
    this.showError = true;
    this.errorMessage = err.error.title;
    this.submitted = false;
    this.showLoading = false;

  }

  setPassword(login: string) {
    this.submitted = true;
    const newPassword: PasswordChangeDTO = {
      newPassword: this.passwordForm.controls['newPassword'].value
    }
    if (this.passwordForm.valid) {
      this.accountService.setPasswordUsingPOST(login, newPassword, "response").pipe(
        map((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.successMessage = 'Password successfully changed!';
            this.success = true;
            this.passwordForm.controls['newPassword'].reset();
          }
        }) , catchError (err => {
          this.handleError(err)
          return of (null);
        })
      ).toPromise();
    } else {
      this.submitted = false;
    }
  }
}
