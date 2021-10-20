import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Material && FlexLayout
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MoleculesIntegratorModule } from './molecules-integrator.module';
import { HeaderOrganismComponent } from './../../app/organisms/header-organism/header-organism.component';
import { SubheaderOrganismComponent } from './../../app/organisms/subheader-organism/subheader-organism.component';
import { FooterOrganismComponent } from './../../app/organisms/footer-organism/footer-organism.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
  	HeaderOrganismComponent,
    SubheaderOrganismComponent,
    FooterOrganismComponent
  ],
  exports: [
  	HeaderOrganismComponent,
    SubheaderOrganismComponent,
    FooterOrganismComponent
  ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        MoleculesIntegratorModule,
        RouterModule
    ]
})
export class OrganismsIntegratorModule { }
