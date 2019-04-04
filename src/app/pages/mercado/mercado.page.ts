import { Component, OnInit, NgZone } from '@angular/core';
import { Compra } from 'src/app/entidades/compra';
import { LoadingController, AlertController, IonItemSliding, ToastController } from '@ionic/angular';
import { MercadoService } from './../../services/mercado-service/mercado.service';

@Component({
  selector: 'app-mercado',
  templateUrl: './mercado.page.html',
  styleUrls: ['./mercado.page.scss'],
})
export class MercadoPage implements OnInit {

  compras: Array<Compra> = [];

  constructor(public alertCtrl: AlertController, public toastCtrl: ToastController, public zone: NgZone,
    public loadCtrl: LoadingController, public mercadoSrv: MercadoService) { }

  ngOnInit() {
    this.getCompras();
  }

  async getCompras() {
   /* const load = await this.loadCtrl.create({
      message: 'Carregando dados...',
      spinner: 'bubbles'
    });
    load.present();*/
    this.mercadoSrv.carregaTodos()
      .subscribe(res => {
        this.compras = res;
      //  load.dismiss();
      }, err => {
        console.log(err);
    //    load.dismiss();
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
            this.mercadoSrv.salvar(compra).subscribe(
              res => {
                this.zone.run( () => {
                  this.compras.push(res);
                });
              },
              async err => {
                const toast = await this.toastCtrl.create({
                  duration: 1000,
                  message: err
                });
                toast.present();
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


  comprado(slidingItem: IonItemSliding, index: number) {
    const compra = this.compras[index];
    this.mercadoSrv.finalizar(compra._id).subscribe(
      res => {
        this.compras.splice(index, 1);
      },
      async err => {
        const toast = await this.toastCtrl.create({
          duration: 2000,
          message: err
        });

        toast.present();
      }
    );
    slidingItem.close();
  }

}
