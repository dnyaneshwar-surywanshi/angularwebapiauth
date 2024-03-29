import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import {Routes} from '@angular/router';

import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { TestComponent } from './test/test.component';

export const appRoutes: Routes = [
    {path : 'home', component : HomeComponent, canActivate: [AuthGuard]},
    {path : 'home', component : HomeComponent, canActivate: [AuthGuard]},
    {
        path : 'signup', component : UserComponent,
        children : [{path : '', component : SignUpComponent}]
    },
    {
        path : 'login', component : UserComponent,
        children : [{path : '', component : SignInComponent}]
    },
    {path: 'test', component : TestComponent},
    {path: 'test', component : TestComponent},

    { path : '', redirectTo: '/login', pathMatch: 'full'}
];
