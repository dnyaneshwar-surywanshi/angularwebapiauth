
// tslint:disable-next-line:eofline
import {HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable} from '@angular/core';
import {Router} from '@angular/router';

import { UserService } from 'src/app/shared/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') === 'True') {
            return next.handle(req.clone());
        }
        if (localStorage.getItem('userToken') != null) {
            const clonedreq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('userToken'))
            });
            return next.handle(clonedreq)
            .pipe(map(response => response));
        } else {
            this.router.navigateByUrl('/login');
        }
    }

}

