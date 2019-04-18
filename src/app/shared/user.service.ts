import { User } from './user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private source = new BehaviorSubject<any>('');
  data = this.source.asObservable();
  readonly rootUrl = 'http://localhost:20910/';
  constructor(private httpClient: HttpClient) { }

  registerUser(user: User, roles: string[]) {
    const body = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Roles : roles
    };
    const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.httpClient.post(this.rootUrl + 'api/User/Register', body, { headers: reqHeader });
  }

  userAuthentication(userName, password) {
    const data = 'username=' + userName + '&password=' + password + '&grant_type=password';
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.httpClient.post(this.rootUrl + '/token', data, { headers: reqHeader });
  }
  getUserClaims() {
    // tslint:disable-next-line:no-debugger
    debugger;
    // tslint:disable-next-line:max-line-length
    // const reqHeader = new HttpHeaders ({'Authorization' : 'Bearer ' + localStorage.getItem('userToken')});
    return this.httpClient.get(this.rootUrl + 'api/GetUserClaims');
  }
  getAllUsers() {
    return this.httpClient.get(this.rootUrl + 'api/GetAllUser');
  }

  getAllRoles() {
    const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.httpClient.get(this.rootUrl + 'api/GetAllRoles', { headers: reqHeader });
  }

}
