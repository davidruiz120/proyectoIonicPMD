import { TestService } from './../servicios/test.service';
import { Component } from '@angular/core';
import { Flashlight } from '@ionic-native/flashlight/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  
  public checkToggle:boolean;

  public listaHttp: any[] = [];

  constructor(private flashlight: Flashlight, private testService: TestService) {}

  ngOnInit(){

    this.testService.getArrayDatos().subscribe((lista)=>{
      this.listaHttp = lista;
    })

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
