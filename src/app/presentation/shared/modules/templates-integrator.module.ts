import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Material && FlexLayout
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AtomsIntegratorModule } from './atoms-integrator.module';
import { MoleculesIntegratorModule } from './molecules-integrator.module';

@NgModule({
  declarations: [
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    AtomsIntegratorModule,
    MoleculesIntegratorModule
  ]
})
export class TemplatesIntegratorModule { }
