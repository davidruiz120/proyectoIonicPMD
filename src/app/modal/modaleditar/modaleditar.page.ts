import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modaleditar',
  templateUrl: './modaleditar.page.html',
  styleUrls: ['./modaleditar.page.scss'],
})
export class ModaleditarPage implements OnInit {

  @Input() id;
  @Input() title;
  @Input() description;

  public todoForm: FormGroup;

  constructor(private formBuilder:FormBuilder, public modalController:ModalController) { }

  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      title:['', Validators.required],
      description:['']
    });
    //console.log("Modal id:" + this.id);
    //console.log("Modal title:" + this.title);
    //console.log("Modal description:" + this.description);
    this.todoForm.get('title').setValue(this.title);
    this.todoForm.get('description').setValue(this.description);
  }

  cancelar(){
    this.modalController.dismiss();
  }

  editNote(){

    this.modalController.dismiss({
      id: this.id,
      title: this.todoForm.get('title').value,
      description: this.todoForm.get('description').value
    });

  }

}
