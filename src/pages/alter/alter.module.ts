import { CommonModule } from '@angular/common';
import { UserProvider } from './../../providers/user/user';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AlterPage } from './alter';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AlterPage,
  ],
  imports: [
    BrowserModule,
    IonicPageModule.forChild(AlterPage),
    IonicStorageModule.forRoot(),
    ReactiveFormsModule,
    IonicStorageModule,
    CommonModule
  ],
  providers: [
    UserProvider
  ]
})

export class AlterPageModule {}