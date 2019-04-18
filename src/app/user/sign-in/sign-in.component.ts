import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLoginError = false;
  constructor(private userService: UserService, private router: Router, private tostar: ToastrService) { }

  ngOnInit() {
  }

  Login(username, password) {
    this.userService.userAuthentication(username, password)
    .subscribe((data: any) => {
      localStorage.setItem('userToken', data.access_token);
      this.router.navigate(['/home']);
    }, (err: any ) => {
     // this.isLoginError = true;
     this.tostar.error('Invalid username and password');
     console.log(err);
    });
  }
}
