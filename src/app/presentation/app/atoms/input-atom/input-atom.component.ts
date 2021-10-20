import { Component, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const CUSTOM_INPUT_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	multi: true,
	useExisting: forwardRef(() => InputAtomComponent)
}

@Component({
  selector: 'input-atom',
  templateUrl: './input-atom.component.html',
  styleUrls: ['./input-atom.component.css'],
  providers: [ CUSTOM_INPUT_ACCESSOR ]
})
export class InputAtomComponent implements ControlValueAccessor {

	@Input('id') id: string;
	@Input('name') name: string;
	@Input('type') type: string = 'text';
	@Input('placeholder') placeholder: string = '';
	@Input('className') className: string = 'input-atom';	
	@Input('readonly') readonly: boolean;
	@Input('autocomplete') autocomplete: string = 'off';

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
