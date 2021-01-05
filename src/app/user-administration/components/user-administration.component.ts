import { Component, OnInit } from '@angular/core';
import {UserDTO, UserResourceService} from "../../shared/swagger-generated";
import {catchError, map, tap} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {of} from "rxjs";

@Component({
  selector: 'app-user-administration',
  templateUrl: './user-administration.component.html',
  styleUrls: ['./user-administration.component.scss']
})
export class UserAdministrationComponent implements OnInit {

  users: UserDTO[];
  constructor(
    private userService: UserResourceService
  ) { }

  ngOnInit(): void {
    this.getUsers();
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

  }
}
