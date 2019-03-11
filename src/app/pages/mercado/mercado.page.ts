import { Component, OnInit } from '@angular/core';
import { Compra } from 'src/app/entidades/compra';
import { IonItemSliding, AlertController } from '@ionic/angular';
import { MercadoService } from './../../services/mercado-service/mercado.service';

@Component({
  selector: 'app-mercado',
  templateUrl: './mercado.page.html',
  styleUrls: ['./mercado.page.scss'],
})
export class MercadoPage implements OnInit {

  compras: Array<Compra> = [];

  constructor(public alertCtrl: AlertController, public mercadoSrv: MercadoService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.mercadoSrv.carregaTodos()
      .subscribe(data => {
        this.compras = data;
      });
  }


  comprado(slidingItem: IonItemSliding, index: number) {
    // é para tirar daqui
    slidingItem.close();
    this.compras.splice(index, 1);

    this.mercadoSrv.finalizar().subscribe(response => {
      if (response) {
        slidingItem.close();
        this.compras.splice(index, 1);
      }
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
            this.compras.push(compra);
          }
        }
      ]
    });

    await alert.present().then(() => {
      const focused: any = document.querySelector('ion-alert input');
      focused.focus();
    });
  }

}