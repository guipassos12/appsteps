import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(public http: HttpClient) { }


  initService(): Observable<any> {
    return this.http.get(environment.urlback + '/alive').pipe(
      map((res: Response) => {
        if (res) {
          console.log('alive');
        }
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error('Backend returned code' + error.status, + 'body was: ' + error.error);
    }
    // return an observable with a user-facing error message
    return throwError('Algo de errado aconteceu, tente novamente mais tarde.');
  }
}
