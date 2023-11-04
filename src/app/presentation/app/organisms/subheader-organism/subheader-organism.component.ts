import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import {StorageService} from '../../../shared/services/storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'subheader-organism',
  templateUrl: './subheader-organism.component.html',
  styleUrls: ['./subheader-organism.component.css']
})
export class SubheaderOrganismComponent {

  @Input('drawer') drawer;

  usuario?: string = '';

  constructor(private _storageservice:StorageService, private _router : Router) {
    this.usuario = this._storageservice.getItem('payload').infoUsuario.nombreUsuario;
  }

  logout():void{
    this._storageservice.clear();
    this._router.navigate(['/login']);
  }

}
