import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MercadoService {

  constructor(public http: HttpClient) { }

  carregaTodos(): Observable<any> {
    return this.http.get(environment.urlback + '/compras').pipe(
      map((data) => {
        return data;
      }),
      catchError(erro => {
        return throwError('Deu ruim nas compras: ' + erro);
      })
    );
  }


  salvar(compra): Observable<any> {
    return this.http.post(environment.urlback + '/compras/add', compra).pipe();
  }


  finalizar(id): Observable<any> {
    return this.http.delete(environment.urlback + '/compras/del/' + id).pipe();
  }
}
