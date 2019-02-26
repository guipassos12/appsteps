import { Component, OnInit } from '@angular/core';
import { Compra } from 'src/app/entidades/compra';
import { IonItemSliding, AlertController } from '@ionic/angular';
import { text } from '@angular/core/src/render3';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage implements OnInit {

  compras: Array<Compra> = [];

  constructor(public alertCtrl: AlertController) { }

  ngOnInit() {
  }

  comprado(slidingItem: IonItemSliding, index: number) {
    slidingItem.close();
    this.compras.splice(index, 1);
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
