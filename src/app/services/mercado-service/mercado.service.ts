import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MercadoService {
  data: any;
  constructor(public http: HttpClient) { }

  carregaTodos(): Observable<any> {
    return this.http.get('').pipe(
      map((data) => {
        this.data = data;
        return true;
      }),
      catchError(erro => {
        return throwError('Deu ruim nas compras: ' + erro);
      })
    );
  }


  salvar(): Observable<any> {
    return this.http.post('', null).pipe();
  }


  finalizar(): Observable<any> {
    return this.http.delete('').pipe();
  }
}
