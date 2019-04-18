import { Component, OnInit, ViewEncapsulation } from '@angular/core';


import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/user.model';
import { UserService } from 'src/app/shared/user.service';
import { State } from 'src/app/shared/state.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  states: State[] = [
    { id: 1, Name: 'Maharashtra' },
    { id: 2, Name: 'MP' },
    { id: 1, Name: 'Guajrat' }

  ];
  user: User;
  roles: any[];
  emailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$';
  constructor(private userService: UserService, private tostar: ToastrService) { }

  ngOnInit() {
    this.resetForm();
    this.userService.getAllRoles()
      .subscribe((data: any) => {
        data.forEach(obj => obj.selected = false);
        this.roles = data;
      }, error => {
        this.tostar.error('Unexpected error occured');
      });
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.user = {
      UserName: '',
      Password: '',
      Email: '',
      FirstName: '',
      LastName: ''
    };
  }
  OnSubmit(form: NgForm) {
    const x = this.roles.filter(c => c.selected).map(y => y.Name);
    this.userService.registerUser(form.value, x)
      .subscribe((data: any) => {
        if (data.Succeeded === true) {
          this.resetForm(form);
          this.tostar.success('Record successfully Added !');
        }
      });
  }
}
