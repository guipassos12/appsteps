import { MercadoService } from './../../services/mercado-service/mercado.service';
import { AppService } from './../../services/app-service/app.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nasa: any;
  qtdMercado = 0;

  constructor(private appService: AppService, private mercadoSrv: MercadoService) {

    this.appService.nasaService().subscribe(res => {
      this.nasa = res;
    });

    this.mercadoSrv.carregaTodos().subscribe(res => {
      const compras: [] = res;
      this.qtdMercado = compras.length;
    });
  }
}
