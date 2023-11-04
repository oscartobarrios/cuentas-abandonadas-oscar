//https://www.w3schools.com/tags/tag_textarea.asp
import { Component, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const CUSTOM_INPUT_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	multi: true,
	useExisting: forwardRef(() => TextareaAtomComponent)
}

@Component({
  selector: 'textarea-atom',
  templateUrl: './textarea-atom.component.html',
  styleUrls: ['./textarea-atom.component.css'],
  providers: [ CUSTOM_INPUT_ACCESSOR ]
})
export class TextareaAtomComponent implements ControlValueAccessor {

	@Input('id') id: string;
	@Input('name') name: string;	
	@Input('placeholder') placeholder: string = '';
	@Input('className') className: string = 'textarea-atom';
	@Input('readonly') readonly: boolean;
	@Input('cols') cols: number;
	@Input('rows') rows: number = 5;

	controlName: FormControl = new FormControl();

	private onChange: (name: string) => void;
	private onTouched: () => void;

	writeValue(data: any): void {
		this.controlName.setValue(data);
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		if (isDisabled) this.controlName.disable();
		else this.controlName.enable();
	} 

	doInput() {
		if (this.onChange) this.onChange(this.controlName.value);
	}

	doBlur() {
		if (this.onTouched)	this.onTouched();
	}

}
