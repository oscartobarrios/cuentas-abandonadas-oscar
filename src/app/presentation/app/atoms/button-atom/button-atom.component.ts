//https://www.w3schools.com/tags/tag_button.asp
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'button-atom',
  templateUrl: './button-atom.component.html',
  styleUrls: ['./button-atom.component.css']
})
export class ButtonAtomComponent {

	@Input('id') id: string;	
	@Input('text') text: string;
	@Input('icon') icon: string;
	@Input('tooltipText') tooltipText: string;	
	@Input('tooltipPosition') tooltipPosition: string = 'below';	
	@Input('className') className: string = 'button-atom';
	@Input('disabled') disabled: boolean;	

	@Output('clickButton') clickButton: EventEmitter<any> = new EventEmitter<any>();	

}
