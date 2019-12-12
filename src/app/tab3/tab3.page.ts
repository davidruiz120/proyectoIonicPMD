import { TestService } from './../servicios/test.service';
import { Component } from '@angular/core';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  
  public checkToggle:boolean;

  public listaHttp: any[] = [];

  constructor(private flashlight: Flashlight, private testService: TestService, private vibration: Vibration) {}

  ngOnInit(){

    this.testService.getArrayDatos().subscribe((lista)=>{
      this.listaHttp = lista;
    })

    this.checkToggle = false;
  }

  vibrar(){
    this.vibration.vibrate(1000);
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
