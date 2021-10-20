import { Component, Input, Output, EventEmitter } from '@angular/core';

import { LateralItemMenu } from './../../atoms/lateral-button-atom/lateral-button-atom.component';

@Component({
  selector: 'lateral-menu-molecule',
  templateUrl: './lateral-menu-molecule.component.html',
  styleUrls: ['./lateral-menu-molecule.component.css']
})
export class LateralMenuMoleculeComponent {

  @Input('items') items: LateralItemMenu[];
  @Output('clickedItem') clickedItem: EventEmitter<LateralItemMenu> = new EventEmitter<LateralItemMenu>();

  propageEvent(menu: LateralItemMenu) {
  	this.clickedItem.emit(menu);
  }
}
