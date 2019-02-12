import { Component, OnInit } from '@angular/core';
import { Lembrete } from '../../entidades/lembrete';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { LembretesService } from '../../services/lembretes-service/lembretes.service';

@Component({
  selector: 'app-lembretes',
  templateUrl: './lembretes.page.html',
  styleUrls: ['./lembretes.page.scss'],
})
export class LembretesPage implements OnInit {

  itensForm: FormArray;
  cardForm: FormGroup;
  lembretes: Array<Lembrete> = [];
  lembrete: Lembrete = new Lembrete(null, null, null, false, false);

  constructor(public fb: FormBuilder, public lembreteService: LembretesService) {
    this.getAll();
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

  itemAdicionado(event) {
    this.lembretes.push(this.lembrete);
  }

  salvar(form) {
    const lemb = form;
    lemb.submitted = true;
    console.log(lemb.compromisso + ' ' + lemb.responsavel + lemb.submitted);
  }

  cancelar(index) {
    console.log(index);
    this.lembretes.splice(index, 1);
  }

}
