import { Component } from '@angular/core';
import { Flashlight } from '@ionic-native/flashlight/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  
  public checkToggle:boolean;

  constructor(private flashlight: Flashlight) {}

  ngOnInit(){
    this.checkToggle = false;
  }

  activar(){
    if(!this.checkToggle){
      this.checkToggle = true;
    } else {
      this.checkToggle = false;
    }
    console.log("Tab3: switch");
    if(this.checkToggle){
      this.flashlight.switchOn();
    } else {
      this.flashlight.switchOff();
    }
  }


}
