import { LuzService } from './../../../services/luz-service/luz.service';
import { LuzModalPage } from './../../../modals/luz-modal/luz-modal.page';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Luz } from 'src/app/entidades/luz';
import { Chart } from 'chart.js';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-luz',
  templateUrl: './luz.page.html',
  styleUrls: ['./luz.page.scss'],
})
export class LuzPage implements OnInit {

  @ViewChild('lineCanvas') lineCanvas;

  contasLuz: Array<Luz>;
  currentYear = new Date().getFullYear();
  years: Array<number> = [];

  constructor(private modalCtrl: ModalController, private luzSrv: LuzService) { }

  ngOnInit() {
    this.carregar();
    this.carregarAnos();
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
    this.contasLuz.slice().reverse().forEach(c => {
      let data = new DatePipe('pt-BR').transform(c.data, 'MMM', 'UTC');
      data = data.charAt(0).toUpperCase() + data.slice(1);
      meses.push(data);
      valores.push(c.valor);
    });
    const chart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
        labels: meses,
        datasets: [
          {
            label: 'Valor',
            fill: true,
            lineTension: 0.5,
            backgroundColor: 'rgba(100, 181, 246, 0.75)',
            borderColor: '#9be7ff',
            pointBorderColor: '#ababab',
            pointBackgroundColor: '#00e575',
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: '#00e575',
            pointHoverBorderColor: '#00e575',
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            data: valores
          }
        ]
      }
    });
  }


  carregarAnos() {
    for (let i = 2018; i <= new Date().getFullYear(); i++) {
      this.years.push(i);
    }
  }


  async adicionar() {
    const modal = await this.modalCtrl.create({
      component: LuzModalPage,
      cssClass: 'my-modal-css-small'
    });

    modal.present().then(() => {
      const focused: any = document.querySelector('ion-alert input');
      focused.focus();
    });

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
      cssClass: 'my-modal-css-small'
    });

    modal.present();

    const resp = await modal.onDidDismiss();
    if (resp && resp.data) {
      this.carregar();
    }
  }

}
