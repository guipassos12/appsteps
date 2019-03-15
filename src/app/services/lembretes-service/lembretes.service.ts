import { environment } from './../../../environments/environment';
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

    return this.http.get(environment.urlback + '/lembretes')
      .pipe(
        map((data: any[]) => {
          this.data = data;
          return this.data;
        }), catchError(error => {
          return throwError('Deu ruim nos lembretes: ' + error);
        })
      );
  }

  salvar(lembrete): Observable<any> {
    return this.http.post(environment.urlback + '/lembretes/add', lembrete).pipe();
  }


  finalizar(): Observable<any> {
    return this.http.delete('').pipe();
  }
}
