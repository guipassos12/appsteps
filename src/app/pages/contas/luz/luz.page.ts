import { LuzModalPage } from './../../../modals/luz-modal/luz-modal.page';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-luz',
  templateUrl: './luz.page.html',
  styleUrls: ['./luz.page.scss'],
})
export class LuzPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }


  async adicionar() {
    const modal = await this.modalCtrl.create({
      component: LuzModalPage,
      cssClass: 'my-modal-css'
    });

    modal.present();

    const resp = await modal.onDidDismiss();
    if (resp && resp.data) {
    }
  }
}
