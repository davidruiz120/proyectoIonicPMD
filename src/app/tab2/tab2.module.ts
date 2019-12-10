import { ModaleditarPageModule } from './../modal/modaleditar/modaleditar.module';
import { ModaleditarPage } from './../modal/modaleditar/modaleditar.page';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';

@NgModule({
  entryComponents: [
    ModaleditarPage
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }]),
    ModaleditarPageModule
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
