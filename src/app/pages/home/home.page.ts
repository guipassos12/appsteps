import { LembretesService } from './../../services/lembretes-service/lembretes.service';
import { LuzService } from './../../services/luz-service/luz.service';
import { MercadoService } from './../../services/mercado-service/mercado.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  qtdMercado = 0;
  luz = 0;
  lembretes = 0;
  path: any;

  constructor(private mercadoSrv: MercadoService, private luzSrv: LuzService, private lembreteSrv: LembretesService) {
    const mes = new Date().getMonth();
    const dia = new Date().getDay();
    this.path = "../assets/icon.png";
    
    this.mercadoSrv.carregaTodos().subscribe(res => {
      const compras: [] = res;
      this.qtdMercado = compras.length;
    });

    this.luzSrv.carregarContaVigente(dia + '/' + mes).subscribe(res => {
        this.luz = res;
    });

    this.lembreteSrv.carregaTodos().subscribe(res => {
      const lembs: [] = res;
      this.lembretes = lembs.length;
    });
  }
}
