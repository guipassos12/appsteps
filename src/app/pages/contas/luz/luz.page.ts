import { LuzService } from './../../../services/luz-service/luz.service';
import { LuzModalPage } from './../../../modals/luz-modal/luz-modal.page';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  currentYear: number;

  constructor(private modalCtrl: ModalController, private luzSrv: LuzService) { }

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
    this.carregar();
  }

  carregar() {
    this.luzSrv.carregaTodosAno(this.currentYear).subscribe(
      res => {
        this.contasLuz = res;
        this.carregaChart();
      }, err => {
        console.log(err);
      });
  }


  carregaChart() {
    const meses = [];
    const valores = [];
    this.contasLuz.forEach(c => {
        meses.push(c.data);
        valores.push(c.valor);
    });
    const chart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
        labels: meses,
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
            data: valores,
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
