import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-luz-modal',
  templateUrl: './luz-modal.page.html',
  styleUrls: ['./luz-modal.page.scss'],
})
export class LuzModalPage implements OnInit {

  luzForm: FormGroup;
  customYearValues: Array<number> = [];

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) { }


  ngOnInit() {
    this.luzForm = this.fb.group({
      data: new FormControl('', [Validators.required]),
      valor: new FormControl('', [Validators.required])
    });

    const ano = new Date().getFullYear();
    for (let i = 0; i <= 2; i++) {
      this.customYearValues.push(ano + i);
    }
  }


  salvar() {

  }


  cancelar() {
    this.modalCtrl.dismiss();
  }
}
