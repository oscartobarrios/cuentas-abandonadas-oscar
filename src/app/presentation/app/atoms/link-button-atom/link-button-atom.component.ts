import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'link-button-atom',
  templateUrl: './link-button-atom.component.html',
  styleUrls: ['./link-button-atom.component.css']
})
export class LinkButtonAtomComponent {

  @Input('id') id: string;	
	@Input('text') text: string;
	@Input('className') className: string = 'link-button-atom';
	@Input('href') href: string;
	@Input('doRedirect') doRedirect: boolean = true;

	@Output('clickButton') clickButton: EventEmitter<any> = new EventEmitter<any>();	

	clickAction() {
		if (!this.doRedirect) this.clickButton.emit();
		else window.location.href = this.href;
	}
}
