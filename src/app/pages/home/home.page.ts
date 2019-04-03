import { AppService } from './../../services/app-service/app.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private appService: AppService) {
    this.appService.initService().subscribe();
  }

}
