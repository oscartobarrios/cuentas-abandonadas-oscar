import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'input-search-molecule',
  templateUrl: './input-search-molecule.component.html',
  styleUrls: ['./input-search-molecule.component.css']
})
export class InputSearchMoleculeComponent implements OnInit {

	@Input('id') id: string;
	@Input('type') type: string = 'text';
	@Input('placeholder') placeholder: string = "";
	@Input('disabled') disabled: boolean = false;

	@Output() notifyChange: EventEmitter<any> = new EventEmitter<any>();	

	formGroup: FormGroup;

	constructor(
	 	private fb: FormBuilder
	) { }

	ngOnInit(): void {
	  	this.formGroup = this.fb.group({      
	    	searchModel: ['', Validators.required]
	    });
	}

	emitEvents(event): void {
		this.notifyChange.emit({
			event: event,
			id: this.id,
			data: this.formGroup.get('searchModel').value
		});
	}

	clearField() {
		this.formGroup.get('searchModel').setValue(null);		
	}
}
