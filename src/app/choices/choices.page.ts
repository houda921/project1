import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-choices',
  templateUrl: './choices.page.html',
  styleUrls: ['./choices.page.scss'],
})
export class ChoicesPage implements OnInit {

  constructor(public alertController:AlertController ,public router :Router) { }

  ngOnInit() { 
    this.welcome()
  }
async welcome(){ 
  const alert = await this.alertController.create({ 

    header: 'welcome!',
   
  });

  await alert.present();
}
}

