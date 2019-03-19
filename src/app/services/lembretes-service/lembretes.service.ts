import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LembretesService {
  constructor(public http: HttpClient) { }

  carregaTodos(): Observable<any> {
    return this.http.get(environment.urlback + '/lembretes')
      .pipe(
        map(data => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  salvar(lembrete): Observable<any> {
    return this.http.post(environment.urlback + '/lembretes/add', lembrete).pipe(
      catchError(this.handleError)
    );
  }


  finalizar(id): Observable<any> {
    return this.http.delete(environment.urlback + '/lembretes/del/' + id).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error('Backend returned code ${error.status}, ' + 'body was: ${error.error}');
    }
    // return an observable with a user-facing error message
    return throwError('Algo errado aconteceu, tente novamente mais tarde.');
  }
}
