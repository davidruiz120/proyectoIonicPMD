import { TodosService } from './../servicios/todos.service';
import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public listadoPanel;
  public listado$; // El $ indica que es un observable por los programadores

  constructor(private todoS:TodosService, public loadingController: LoadingController, private router: Router) {}


  ngOnInit(){
    this.refrescar();
  }

  ionViewDidEnter(){ // Cada vez que se habra esta pestaña, se meterá aquí
    //this.refrescar();
  }


  public borrarNota(id:string){
    console.log("Borrando...");
    this.todoS.deleteTODO(id).then((salida)=>{
      this.refrescar();
      console.log("Borrado");
      console.log(salida);
    }).catch((error)=>{
      console.log(error);
    });
  }

  public editaNota(id:string){

  }


  private refrescar(){
    this.presentLoading();
    try {

      
      this.todoS.readTODO2().subscribe((lista)=>{
        this.listadoPanel = lista;
        this.loadingController.dismiss();
      })
    } catch(err){
      this.loadingController.dismiss();
    }
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando'
    });
    await loading.present();
  }

  public doRefresh(e:any){
    this.listadoPanel=[];
    console.log("Cargando notas");
    let Myobservable = this.todoS.readTODO();
    Myobservable.subscribe((lista)=>{
      this.listadoPanel = [];
      lista.docs.forEach((nota)=>{
        this.listadoPanel.push({id:nota.id,...nota.data()}); // Concatena dos cosas para unirlas en una
        console.log(nota.id);
        console.log(nota.data());
      });
    })
    e.target.complete();
  }

  public irNueva():void{
    this.router.navigateByUrl('/tabs/tab1');
  }

}
