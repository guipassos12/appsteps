import { Component, OnInit } from '@angular/core';
import { Lembrete } from '../../entidades/lembrete';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { LembretesService } from '../../services/lembretes-service/lembretes.service';
import { ToastController } from '@ionic/angular';

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

  constructor(private fb: FormBuilder, private lembreteService: LembretesService, private toastCtrl: ToastController) {
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
    this.lembreteService.carregaTodos()
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

}
