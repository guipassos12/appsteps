import { LembretesModalPage } from './../../modals/lembretes-modal/lembretes-modal.page';
import { Component, OnInit } from '@angular/core';
import { Lembrete } from '../../entidades/lembrete';
import { LembretesService } from '../../services/lembretes-service/lembretes.service';
import { ToastController, LoadingController, ModalController } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

@Component({
  selector: 'app-lembretes',
  templateUrl: './lembretes.page.html',
  styleUrls: ['./lembretes.page.scss'],
})
export class LembretesPage implements OnInit {

  lembretes: Array<Lembrete> = [];

  constructor(private lembServ: LembretesService,
    private loadCtrl: LoadingController, private modalCtrl: ModalController,
    private toastCtrl: ToastController, private localNotif: LocalNotifications, private backgroundMode: BackgroundMode) {
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
      component: LembretesModalPage
    });

    await modal.present();

    modal.onDidDismiss();
  }


  async itemFeito(index) {
    this.lembretes.splice(index, 1);
    const toast = await this.toastCtrl.create({
      duration: 2000,
      message: 'Que responsável! Fazendo todas as suas obrigações :) '
    });

    toast.present();
  }
}
