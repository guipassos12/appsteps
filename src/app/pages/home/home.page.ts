import { MercadoService } from './../../services/mercado-service/mercado.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  qtdMercado = 0;

  constructor(private mercadoSrv: MercadoService) {

    this.mercadoSrv.carregaTodos().subscribe(res => {
      const compras: [] = res;
      this.qtdMercado = compras.length;
    });
  }
}
