import { LembretesModalPage } from './../../modals/lembretes-modal/lembretes-modal.page';
import { Component, OnInit } from '@angular/core';
import { Lembrete } from '../../entidades/lembrete';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
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

  itensForm: FormArray;
  cardForm: FormGroup;
  lembretes: Array<Lembrete> = [];
  customYearValues: Array<number> = [];
  selectOptions = [
    { id: 'G', text: 'Guilherme' },
    { id: 'L', text: 'Laís' },
    { id: 'T', text: 'Todos' }
  ];

  constructor(private fb: FormBuilder, private lembServ: LembretesService,
    private loadCtrl: LoadingController, private modalCtrl: ModalController,
    private toastCtrl: ToastController, private localNotif: LocalNotifications, private backgroundMode: BackgroundMode) {
    this.getAll();
    this.anosDisponiveis();
  }

  ngOnInit() {
    this.cardForm = this.fb.group({
      compromisso: new FormControl('', [Validators.required]),
      responsavel: new FormControl('', [Validators.required]),
      data: new FormControl('', [Validators.required]),
    });

    this.itensForm = this.fb.array([]);
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


  anosDisponiveis() {
    const ano = new Date().getFullYear();
    for (let i = 0; i <= 2; i++) {
      this.customYearValues.push(ano + i);
    }
  }


  async adicionar() {
    const modal = await this.modalCtrl.create({
      component: LembretesModalPage
    });

    await modal.present();

    modal.dismiss({

    });
  }


  async salvar(index) {
    const lemb = this.lembretes[index];

    this.lembServ.salvar(lemb).subscribe(async () => {
      this.backgroundMode.enable();
      this.localNotif.schedule({
        title: 'Compromisso a ser feito',
        text: lemb.compromisso,
        foreground: true,
        vibrate: true,
        trigger: { at: lemb.data },
        led: 'FF0000'
      });

      lemb.submitted = true;
      const toast = await this.toastCtrl.create({
        duration: 2000,
        message: 'Compromisso para ' + lemb.responsavel + ' salvo com sucesso!'
      });

      toast.present();
    });
  }


  cancelar(index) {
    this.lembretes.splice(index, 1);
  }


  async itemFeito(index) {
    this.lembretes.splice(index, 1);
    const toast = await this.toastCtrl.create({
      duration: 2000,
      message: 'Que responsável! Fazendo todas as suas obrigações :) '
    });

    toast.present();
  }


  get compromisso() {
    return this.cardForm.get('compromisso');
  }

  get responsavel() {
    return this.cardForm.get('responsavel');
  }

  get data() {
    return this.cardForm.get('data');
  }
}
