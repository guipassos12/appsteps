import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.page.html',
  styleUrls: ['./contas.page.scss'],
})
export class ContasPage implements OnInit {

  constructor(public navCtrl: NavController) {
    navCtrl.navigateForward('/contas/contas/luz');
  }

  ngOnInit() {
  }

}
