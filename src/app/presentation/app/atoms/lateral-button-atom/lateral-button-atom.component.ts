import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StorageService } from './../../../shared/services/storage.service';

export interface LateralItemMenu {
	icon: string;
	text: string;
  url: string;
  rols: number[]
}

@Component({
  selector: 'lateral-button-atom',
  templateUrl: './lateral-button-atom.component.html',
  styleUrls: ['./lateral-button-atom.component.css']
})
export class LateralButtonAtomComponent {
  usuario = this._storageservice.getItem('payload').infoUsuario;
  @Input('item') item: LateralItemMenu;
  @Output('clickedItem') clickedItem: EventEmitter<LateralItemMenu> = new EventEmitter<LateralItemMenu>();
  constructor(private _storageservice: StorageService){}
}
