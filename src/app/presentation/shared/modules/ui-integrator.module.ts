import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Material && FlexLayout
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AtomsIntegratorModule } from './atoms-integrator.module';
import { MoleculesIntegratorModule } from './molecules-integrator.module';
import { OrganismsIntegratorModule } from './organisms-integrator.module';
import { TemplatesIntegratorModule } from './templates-integrator.module';
import { StorageService } from './../services/storage.service';
import { LoggerService } from './../services/console-logger.service';
import { NotificationsService } from './../services/notifications.service';
import { NotificationsComponent } from './../components/notifications/notifications.component';

@NgModule({
  declarations: [
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    //Material
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,   
    FlexLayoutModule,
    //Atomic design
    AtomsIntegratorModule,
    MoleculesIntegratorModule,
    OrganismsIntegratorModule,
    TemplatesIntegratorModule
  ],
  exports: [
    BrowserModule,
  	//Material
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,   
    FlexLayoutModule,
    //Atomic design
    AtomsIntegratorModule,
    MoleculesIntegratorModule,
    OrganismsIntegratorModule,
    TemplatesIntegratorModule
  ],
  providers: [
    StorageService,
    LoggerService,
    NotificationsService
  ],
  entryComponents: [
    NotificationsComponent
  ]
})
export class UIIntegratorModule { }
