import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Material && FlexLayout
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AtomsIntegratorModule } from './atoms-integrator.module';
import { InputSearchMoleculeComponent } from './../../app/molecules/input-search-molecule/input-search-molecule.component';
import { LateralMenuMoleculeComponent } from './../../app/molecules/lateral-menu-molecule/lateral-menu-molecule.component';

@NgModule({
  declarations: [
  	InputSearchMoleculeComponent,
    LateralMenuMoleculeComponent
  ],
  exports: [
  	InputSearchMoleculeComponent,
    LateralMenuMoleculeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    AtomsIntegratorModule
  ]
})
export class MoleculesIntegratorModule { }
