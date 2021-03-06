import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ToastController, ModalController } from '@ionic/angular';
import { LembretesService } from './../../services/lembretes-service/lembretes.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Lembrete } from 'src/app/entidades/lembrete';

@Component({
  selector: 'app-lembretes-modal',
  templateUrl: './lembretes-modal.page.html',
  styleUrls: ['./lembretes-modal.page.scss'],
})
export class LembretesModalPage implements OnInit {

  @Input() lembrete: Lembrete;

  isEdit = false;
  cardForm: FormGroup;
  customYearValues: Array<number> = [];
  minDate: string;
  selectOptions = [
    { id: 'Guilherme', text: 'Guilherme' },
    { id: 'Laís', text: 'Laís' },
    { id: 'Todos', text: 'Todos' }
  ];

  constructor(private fb: FormBuilder, private lembServ: LembretesService, private modalCtrl: ModalController,
    private toastCtrl: ToastController, private localNotif: LocalNotifications, private backgroundMode: BackgroundMode) { }

  ngOnInit() {
    this.cardForm = this.fb.group({
      compromisso: new FormControl('', [Validators.required]),
      responsavel: new FormControl('', [Validators.required]),
      data: new FormControl('', [Validators.required]),
    });

    if (this.lembrete != null) {
      this.isEdit = true;
      this.cardForm.controls['compromisso'].setValue(this.lembrete.compromisso);
      this.cardForm.controls['responsavel'].setValue(this.lembrete.responsavel);
      this.cardForm.controls['data'].setValue(this.lembrete.data);
    }

    this.ajustaData();
  }


  ajustaData() {
    const ano = new Date().getFullYear();
    for (let i = 0; i <= 2; i++) {
      this.customYearValues.push(ano + i);
    }
  }


  async salvar() {
    const lemb: Lembrete = this.cardForm.value;
    const alarme = new Date(lemb.data);
    alarme.setHours(alarme.getHours() - 1);
    lemb.alarme = alarme;

    if (this.isEdit) {
      lemb._id = this.lembrete._id;
      this.lembServ.editar(lemb).subscribe(() => {
        this.ativarNotificacao(lemb);
      });
    } else {
      this.lembServ.salvar(lemb).subscribe(() => {
        this.ativarNotificacao(lemb);
      });
    }

    const toast = await this.toastCtrl.create({
      duration: 1000,
      message: 'Compromisso para ' + lemb.responsavel + ' salvo com sucesso!'
    });
    toast.present();
    this.modalCtrl.dismiss({ 'success': true });
  }


  cancelar() {
    this.modalCtrl.dismiss();
  }


  ativarNotificacao(lemb) {
    this.backgroundMode.enable();
    this.localNotif.schedule({
      title: 'Compromisso a ser feito',
      text: lemb.compromisso,
      vibrate: true,
      foreground: true,
      trigger: { at: lemb.alarme },
      led: 'FF0000'
    });
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
