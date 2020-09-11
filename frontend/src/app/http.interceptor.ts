import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class NgHttpInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        // console.log(event);
        /*if (event instanceof HttpResponse) {
          return event;
        }*/

        return event;
      }),
      tap((event: HttpEvent<any>) => { }, (error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401 || error.status === 403) {
            this.router.navigate(['login']);
          } else {
            this.toastr.error(error.error.message, 'Errore!');
            throw new HttpErrorResponse({
              error
            });
          }
        }
      })
    );
  }
}
