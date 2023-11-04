import { Component, Input } from '@angular/core';
import {StorageService} from '../../../shared/services/storage.service';

@Component({
  selector: 'header-organism',
  templateUrl: './header-organism.component.html',
  styleUrls: ['./header-organism.component.css']
})
export class HeaderOrganismComponent {

  @Input('logoGovCo') logoGovCo: string = "./assets/img/png/logo-govco.png";


}
