import { Component, OnInit } from '@angular/core';
import { Lembrete } from '../../entidades/lembrete';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { LembretesService } from '../../services/lembretes-service/lembretes.service';
import { ToastController } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

@Component({
  selector: 'app-lembretes',
  templateUrl: './lembretes.page.html',
  styleUrls: ['./lembretes.page.scss'],
})
export class LembretesPage implements OnInit {

  itensForm: FormArray;
  cardForm: FormGroup;
  lembretes: Array<Lembrete> = [];
  customYearValues: Array<number> = [];

  constructor(private fb: FormBuilder, private lembServ: LembretesService,
    private toastCtrl: ToastController, private localNotif: LocalNotifications, private backgroundMode: BackgroundMode) {
    this.getAll();
    this.anosDisponiveis();
  }

  ngOnInit() {
    this.cardForm = this.fb.group({
      compromisso: ['', Validators.required],
      responsavel: ['', Validators.required],
      data: ['', Validators.required]
    });

    this.itensForm = this.fb.array([]);
  }

  getAll() {
    this.lembServ.carregaTodos()
      .subscribe(data => {
        this.lembretes = data;
      });
  }


  anosDisponiveis() {
    const ano = new Date().getFullYear();
    for (let i = 0; i <= 2; i++) {
      this.customYearValues.push(ano + i);
    }
  }


  async itemAdicionado() {
    this.lembretes.push(new Lembrete());
  }


  async salvar(index) {
    const lemb = this.lembretes[index];

    lemb.submitted = true;
    const toast = await this.toastCtrl.create({
      duration: 2000,
      message: 'Compromisso para ' + lemb.responsavel + ' salvo com sucesso!'
    });

    toast.present();
  }


  async cancelar(index) {
    this.lembretes.splice(index, 1);
  }


  async itemFeito(index) {
    const lemb = this.lembretes[index];

    this.backgroundMode.enable();
    this.localNotif.schedule({
      title: 'Compromisso a ser feito',
      text: lemb.compromisso,
      foreground: true,
      vibrate: true,
      trigger: { at: lemb.data },
      led: 'FF0000'
    });

    this.lembretes.splice(index, 1);
    const toast = await this.toastCtrl.create({
      duration: 2000,
      message: 'Que responsável! Fazendo todas as suas obrigações :) '
    });

    toast.present();
  }

}
