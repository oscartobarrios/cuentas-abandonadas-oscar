import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Material
import { MaterialModule } from './material.module';

import { InputAtomComponent } from './../../app/atoms/input-atom/input-atom.component';
import { SelectAtomComponent } from './../../app/atoms/select-atom/select-atom.component';
import { TextareaAtomComponent } from './../../app/atoms/textarea-atom/textarea-atom.component';
import { LinkButtonAtomComponent } from './../../app/atoms/link-button-atom/link-button-atom.component';
import { ButtonAtomComponent } from './../../app/atoms/button-atom/button-atom.component';
import { LateralButtonAtomComponent } from './../../app/atoms/lateral-button-atom/lateral-button-atom.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
  	InputAtomComponent,
    SelectAtomComponent,
    TextareaAtomComponent,
    LinkButtonAtomComponent,
    ButtonAtomComponent,
    LateralButtonAtomComponent
  ],
  exports: [
  	InputAtomComponent,
    SelectAtomComponent,
    TextareaAtomComponent,
    LinkButtonAtomComponent,
    ButtonAtomComponent,
    LateralButtonAtomComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule
    ]
})
export class AtomsIntegratorModule { }
