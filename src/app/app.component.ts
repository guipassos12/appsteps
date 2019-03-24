import { AppService } from './services/app-service/app.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Mercado',
      url: '/mercado',
      icon: 'cart'
    },
    {
      title: 'Contas',
      url: '/contas',
      icon: 'cash'
    },
    {
      title: 'Lembretes',
      url: '/lembretes',
      icon: 'clipboard'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private appService: AppService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.appService.initService().subscribe(() => { console.log('tamo ai na atividade') });
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
