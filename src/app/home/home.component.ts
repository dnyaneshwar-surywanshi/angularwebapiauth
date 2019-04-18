import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { State } from '../shared/state.model';
import {  interval } from 'rxjs';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userClaims: any;
  users: User[];
  constructor(private router: Router, private userService: UserService ) { }

  ngOnInit() {
    this.userService.getUserClaims()
    .subscribe((data: any ) => { this.userClaims = data; });
    // tslint:disable-next-line:no-unused-expression
    const intervals1 = interval(1000);
    intervals1.subscribe(console.log);
    this.GetAllUserData();
  }

  GetAllUserData() {
    this.userService.getAllUsers().
    subscribe((data: any) => {
      this.users = data;
    });
  }
  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
}
