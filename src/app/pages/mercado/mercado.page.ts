import { Component, OnInit } from '@angular/core';
import { Compra } from 'src/app/entidades/compra';
import { LoadingController, AlertController } from '@ionic/angular';
import { MercadoService } from './../../services/mercado-service/mercado.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mercado',
  templateUrl: './mercado.page.html',
  styleUrls: ['./mercado.page.scss'],
})
export class MercadoPage implements OnInit {

  compras: Array<Compra> = [];

  constructor(public alertCtrl: AlertController, public loadCtrl: LoadingController, public mercadoSrv: MercadoService) { }

  ngOnInit() {
    this.getCompras();
  }

  async getCompras() {
    const load = await this.loadCtrl.create({
      message: 'Carregando dados...',
      spinner: 'bubbles'
    });
    await load.present();
    await this.mercadoSrv.carregaTodos()
      .subscribe(res => {
        this.compras = res;
        load.dismiss();
      }, err => {
        console.log(err);
        load.dismiss();
      });
  }


  async adicionarItem() {
    const alert = await this.alertCtrl.create({
      subHeader: 'Adicione a lista de compras',
      inputs: [
        {
          name: 'titulo',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'OK',
          handler: (data) => {
            const compra = new Compra(data.titulo);
            this.mercadoSrv.salvar(compra).subscribe(() => {
              this.compras.push(compra);
            });
          }
        }
      ]
    });

    await alert.present().then(() => {
      const focused: any = document.querySelector('ion-alert input');
      focused.focus();
    });
  }

  async comprado(index: number) {
    const compra = this.compras[index];
    await this.mercadoSrv.finalizar(compra._id).subscribe(() => {
      this.compras.splice(index, 1);
    });
  }

}
