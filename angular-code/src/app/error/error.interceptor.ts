import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorComponent } from './error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(catchError((error: HttpErrorResponse) => {
        console.log(error);
        let errorMessage = "";
        let errorBody = error.error;
        let errorStatus = error.status;
        if (error instanceof ErrorEvent) {
          errorMessage = `Error: ${errorBody.message}`;
        } else {
          switch (errorStatus) {
            case 0:
              errorMessage =  "Please check your network connection and try again";
              break;
            case 401: 
              errorMessage = "Unauthorised Access";
              break;
            case 404:
              errorMessage = errorBody.message;
              break;
            case 500:
              errorMessage = "Internal Server Error";
              break;
            default:
              errorMessage = "Unknown error occurred";
              break;
          }
        }
        this.snackBar.openFromComponent(ErrorComponent, {
          data: {
            message: errorMessage
          }
        });

        return throwError(errorMessage);
      }))
  }
}
