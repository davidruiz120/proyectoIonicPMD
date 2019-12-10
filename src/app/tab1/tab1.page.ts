import { TodosService } from './../servicios/todos.service';
import { note } from './../modelo/note';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public todoForm: FormGroup;
  public icon_confirm:string = '<ion-icon name="checkmark"></ion-icon>';
  public icon_info:string = '<ion-icon name="information-circle"></ion-icon>';

  constructor(private formBuilder:FormBuilder, private todoS:TodosService, public loadingController: LoadingController,
              public toastController: ToastController ) {
    
  }

  ngOnInit(){
    this.todoForm = this.formBuilder.group({
      title:['', Validators.required],
      description:['']
    });
  }

  addNote(){
    let data:note;
    data = {
      title:this.todoForm.get('title').value,
      description:this.todoForm.get('description').value
    }
    this.presentLoading();
    this.todoS.addTODO(data)
    .then((ok)=>{
      this.todoForm.reset();
      this.presentToast("Nota agregada", this.icon_confirm, 'success');
    })
    .catch((err)=>{
      this.presentToast("Error al agregar la nota", this.icon_info, 'danger', 4000);
    })
    .finally(()=>{
      this.loadingController.dismiss();
    })
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Guardando'
    });
    await loading.present();
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
