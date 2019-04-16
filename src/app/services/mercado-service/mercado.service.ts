import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MercadoService {

  constructor(private http: HttpClient) { }

  carregaTodos(): Observable<any> {
    return this.http.get(environment.urlback + '/compras').pipe(
      catchError(this.handleError)
    );
  }


  salvar(compra): Observable<any> {
    return this.http.post(environment.urlback + '/compras/add', compra).pipe(
      catchError(this.handleError)
    );
  }


  finalizar(id): Observable<any> {
    return this.http.delete(environment.urlback + '/compras/del/' + id).pipe(
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
    return throwError('Algo de errado aconteceu, tente novamente mais tarde.');
  }
}
