import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LembretesService {
  data: any;
  constructor(public http: HttpClient) { }

  carregaTodos(): Observable<any> {
    if (this.data) {
      return this.data;
    }

    return this.http.get('')
      .pipe(
        map((data: any[]) => {
          this.data = data;
          return true;
        }), catchError(error => {
          return throwError('Deu ruim nos lembretes: ' + error);
        })
      );
  }

  carregaTodosPromise() {
    return this.http.get('').toPromise();
  }

  salvarNovo() {

  }
}
