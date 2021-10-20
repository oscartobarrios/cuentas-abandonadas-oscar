import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface LateralItemMenu {
	icon: string;
	text: string;
}

@Component({
  selector: 'lateral-button-atom',
  templateUrl: './lateral-button-atom.component.html',
  styleUrls: ['./lateral-button-atom.component.css']
})
export class LateralButtonAtomComponent {

  @Input('item') item: LateralItemMenu;
  @Output('clickedItem') clickedItem: EventEmitter<LateralItemMenu> = new EventEmitter<LateralItemMenu>();

}
