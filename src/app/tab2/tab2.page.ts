import { note } from './../modelo/note';
import { ModaleditarPage } from './../modal/modaleditar/modaleditar.page';
import { TodosService } from './../servicios/todos.service';
import { Component } from '@angular/core';
import { LoadingController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public listadoPanel;
  public listado$; // El $ indica que es un observable por los programadores
  public icon_confirm:string = '<ion-icon name="checkmark"></ion-icon>';
  public icon_info:string = '<ion-icon name="information-circle"></ion-icon>';

  constructor(private todoS:TodosService, public loadingController: LoadingController, private router: Router,
    public alertController: AlertController, public toastController: ToastController, public modalController: ModalController) {}


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
      this.presentToast('Nota eliminada', this.icon_confirm, 'success');
    }).catch((error)=>{
      console.log(error);
      this.presentToast('Error al eliminar la nota', this.icon_info, 'danger');
    });
  }

  /* public editaNota(id:string){
    
  } */

  public editaNota(id:string){
    let id_modal;
    let data_title;
    let data_description;
    this.todoS.readTODOByID(id).subscribe((nota)=>{
      id_modal = nota.id;
      data_title = nota.data().title;
      data_description = nota.data().description;
      //console.log("Tab2 ID: " + nota.id);
      //console.log("Tab2 title: " + data_title + " description: " + data_description);
      this.modalEditar(id_modal, data_title, data_description);
    })
  }

  async modalEditar(id_modal:string, data_title:string, data_description:string){
    const modal = await this.modalController.create({
      component: ModaleditarPage,
      componentProps: {
        id: id_modal,
        title: data_title,
        description: data_description
      }
    });
    await modal.present();

    await modal.onDidDismiss().then((salida)=>{
      //console.log("modalEditar Promise then id:" + salida.data.id);
      //console.log("modalEditar Promise then title:" + salida.data.title);
      //console.log("modalEditar Promise then title:" + salida.data.description);

      let dataEdit:note;
      dataEdit = {
        title:salida.data.title,
        description:salida.data.description
      }
      this.presentLoading();
      this.todoS.updateTODO(salida.data.id, dataEdit).then((ok)=>{
        this.presentToast("Nota actualizada", this.icon_confirm, 'success');
      }).catch((error)=>{
        console.log(error);
        this.presentToast("Error al actualizar la nota", this.icon_info, 'success');
      }).finally(()=>{
        this.loadingController.dismiss();
        this.refrescar();
      })

    }).catch((error)=>{
      console.log("Error en el Promise al editar una nota en modal");
    });

  }

  private refrescar(){
    this.presentLoading();
    try {
      this.todoS.readTODO2().subscribe((lista)=>{
        this.listadoPanel = lista;
        this.loadingController.dismiss();
        console.log("Refrescado");
      })
    } catch(err){
      this.loadingController.dismiss();
      console.log("Error al refrescar");
    }
    //this.loadingController.dismiss();
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


  async presentAlertConfirmBorrar(id:string) {
    const alert = await this.alertController.create({
      header: 'Borrar',
      message: '¿Desea borrar la nota?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            console.log('Aceptado');
            this.borrarNota(id);
          }
        }
      ]
    });
    await alert.present();
  }

  async presentToast(msg:string, icn:string, col:string, dur:number=2000) {
    const toast = await this.toastController.create({
      message: icn + ' ' + msg,
      duration: dur,
      color: col
    });
    toast.present();
  }
  

}
