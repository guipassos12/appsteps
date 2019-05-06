import { NavController } from '@ionic/angular';
import { LembretesService } from './../../services/lembretes-service/lembretes.service';
import { LuzService } from './../../services/luz-service/luz.service';
import { MercadoService } from './../../services/mercado-service/mercado.service';
import { Component } from '@angular/core';
import { Luz } from 'src/app/entidades/luz';

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

  constructor(private mercadoSrv: MercadoService, private luzSrv: LuzService,
              private lembreteSrv: LembretesService, private navCtrl: NavController) {
    let data = '';
    let mes = new Date().getMonth() + 1;
    const dia = new Date().getDate();
    const ano = new Date().getFullYear();

    this.path = '../assets/icon.png';

    this.mercadoSrv.carregaTodos().subscribe(res => {
      const compras: [] = res;
      this.qtdMercado = compras.length;
    });

    if (dia <= 8) {
      mes = mes - 2;
    } else {
      mes = mes - 1;
    }

    if (mes < 10) {
      data = ano + '-' + '0' + mes;
    } else {
      data = ano + '-' + mes;
    }

    this.luzSrv.carregarContaVigente(data).subscribe(res => {
        const retorno: Luz = res;
        this.luz = retorno.valor;
    });

    this.lembreteSrv.carregaTodos().subscribe(res => {
      const lembs: [] = res;
      this.lembretes = lembs.length;
    });
  }

  redirectCard(page) {
    this.navCtrl.navigateForward(page);
  }
}
