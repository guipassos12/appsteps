import { LembretesModalPage } from './../../modals/lembretes-modal/lembretes-modal.page';
import { Component, OnInit } from '@angular/core';
import { Lembrete } from '../../entidades/lembrete';
import { LembretesService } from '../../services/lembretes-service/lembretes.service';
import { ToastController, LoadingController, ModalController, IonItemSliding, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-lembretes',
  templateUrl: './lembretes.page.html',
  styleUrls: ['./lembretes.page.scss'],
})
export class LembretesPage implements OnInit {

  lembretes: Array<Lembrete> = [];

  constructor(private lembServ: LembretesService, private toastCtrl: ToastController,
    private loadCtrl: LoadingController, private modalCtrl: ModalController, private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.getAll();
  }


  async getAll() {
    const load = await this.loadCtrl.create({
      message: 'Carregando dados...',
      spinner: 'bubbles'
    });

    await load.present();
    await this.lembServ.carregaTodos()
      .subscribe(data => {
        load.dismiss();
        this.lembretes = data;
      });
  }


  async adicionar() {
    const modal = await this.modalCtrl.create({
      component: LembretesModalPage,
      cssClass: 'my-modal-css'
    });

    modal.present();

    const resp = await modal.onDidDismiss();
    if (resp && resp.data) {
      this.getAll();
    }
  }


  async editar(index) {
    const lemb = this.lembretes[index];
    const modal = await this.modalCtrl.create({
      component: LembretesModalPage,
      componentProps: { 'lembrete': lemb },
      cssClass: 'my-modal-css'
    });

    modal.present();

    const resp = await modal.onDidDismiss();
    if (resp && resp.data) {
      this.getAll();
    }
  }


  async feito(index: number) {
    const lemb = this.lembretes[index];
    const alert = await this.alertCtrl.create({
      subHeader: 'Fez o que tinha que fazer?',
      buttons: [
        {
          text: 'Ainda não'
        },
        {
          text: 'Sim',
          handler: async () => {
            this.lembServ.finalizar(lemb._id).subscribe(
              async res => {
                this.lembretes.splice(index, 1);
                const toast = await this.toastCtrl.create({
                  duration: 2000,
                  message: 'Que responsável! Fazendo todas as suas obrigações :) '
                });
                toast.present();
              },
              async err => {
                const toast = await this.toastCtrl.create({
                  duration: 2000,
                  message: err
                });
                toast.present();
              }
            );

          }
        }]
    });

    alert.present();
  }
}
