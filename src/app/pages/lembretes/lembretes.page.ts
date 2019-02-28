import { Component, OnInit } from '@angular/core';
import { Lembrete } from '../../entidades/lembrete';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { LembretesService } from '../../services/lembretes-service/lembretes.service';
import { ToastController } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

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
    private toastCtrl: ToastController, private localNotif: LocalNotifications) {
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
      .subscribe(
        (data => {
          this.lembretes = data;
        }));
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
    console.log(lemb.compromisso + ' ' + lemb.responsavel + ' ' + lemb.data);
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
    this.lembretes.splice(index, 1);
    const toast = await this.toastCtrl.create({
      duration: 2000,
      message: 'Que responsável! Fazendo todas as suas obrigações :) '
    });

    this.localNotif.schedule({
      id: 1,
      title: 'Local ILocalNotification Example',
      text: 'Multi ILocalNotification 2',
      led: 'red', // ANDROID
      icon: '../assets/icon/favicon.png'
    });

    // Schedule delayed notification
    /*this.localNotif.schedule({
      text: 'Delayed ILocalNotification',
      trigger: { at: new Date(new Date().getTime() + 3600) },
      led: 'FF0000',
      sound: null
    });*/

    toast.present();
  }

}
