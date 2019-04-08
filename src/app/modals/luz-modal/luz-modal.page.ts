import { Luz } from './../../entidades/luz';
import { LuzService } from './../../services/luz-service/luz.service';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-luz-modal',
  templateUrl: './luz-modal.page.html',
  styleUrls: ['./luz-modal.page.scss'],
})
export class LuzModalPage implements OnInit {

  @Input() luz: Luz;

  isEdit = false;
  luzForm: FormGroup;
  customYearValues: Array<number> = [];

  constructor(private modalCtrl: ModalController, private fb: FormBuilder, private luzSrv: LuzService) { }


  ngOnInit() {
    this.luzForm = this.fb.group({
      data: new FormControl('', [Validators.required]),
      valor: new FormControl('', [Validators.required])
    });

    if (this.luz != null) {
      this.isEdit = true;
      this.luzForm.controls['valor'].setValue(this.luz.valor);
      this.luzForm.controls['data'].setValue(this.luz.data);
    }

    for (let i = 2018; i <= new Date().getFullYear(); i++) {
      this.customYearValues.push(i);
    }
  }


  salvar() {
    const l = this.luzForm.value;
    if (this.isEdit) {
      l._id = this.luz._id;
      this.luzSrv.editar(l).subscribe();
    } else {
      this.luzSrv.salvar(l).subscribe();
    }

    this.modalCtrl.dismiss({ l });
  }


  cancelar() {
    this.modalCtrl.dismiss();
  }
}
