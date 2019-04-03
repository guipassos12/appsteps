import { LuzService } from './../../../services/luz-service/luz.service';
import { LuzModalPage } from './../../../modals/luz-modal/luz-modal.page';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { Luz } from 'src/app/entidades/luz';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-luz',
  templateUrl: './luz.page.html',
  styleUrls: ['./luz.page.scss'],
})
export class LuzPage implements OnInit {

  @ViewChild('lineCanvas') lineCanvas;

  contasLuz: Array<Luz>;

  constructor(private modalCtrl: ModalController, private luzSrv: LuzService, private loadCtrl: LoadingController) { }

  ngOnInit() {
    this.carregar();
    this.carregaChart();
  }

  async carregar() {
    const load = await this.loadCtrl.create({
      message: 'Carregando dados...',
      spinner: 'bubbles'
    });
    load.present();

    this.luzSrv.carregaTodos().subscribe(
      res => {
        this.contasLuz = res;
        load.dismiss();
      }, err => {
        console.log(err);
        load.dismiss();
      });
  }


  carregaChart() {
    const chart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [
          {
            label: 'Valores',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
            spanGaps: false,
          }
        ]
      }
    });
  }


  async adicionar() {
    const modal = await this.modalCtrl.create({
      component: LuzModalPage,
      cssClass: 'my-modal-css'
    });

    modal.present();

    const resp = await modal.onDidDismiss();
    if (resp && resp.data) {
      this.carregar();
    }
  }

  async editar(i) {
    const luz = this.contasLuz[i];
    const modal = await this.modalCtrl.create({
      component: LuzModalPage,
      componentProps: { 'luz': luz },
      cssClass: 'my-modal-css'
    });

    modal.present();

    const resp = await modal.onDidDismiss();
    if (resp && resp.data) {
      this.carregar();
    }
  }
}
