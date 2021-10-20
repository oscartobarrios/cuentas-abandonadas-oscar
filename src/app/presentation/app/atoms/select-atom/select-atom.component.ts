import { Component, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const CUSTOM_INPUT_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	multi: true,
	useExisting: forwardRef(() => SelectAtomComponent)
}

@Component({
  selector: 'select-atom',
  templateUrl: './select-atom.component.html',
  styleUrls: ['./select-atom.component.css'],
  providers: [ CUSTOM_INPUT_ACCESSOR ]
})
export class SelectAtomComponent implements ControlValueAccessor {
  
  @Input('id') id: string;
	@Input('name') name: string;	
	@Input('placeholder') placeholder: string = 'Seleccione una opción';
	@Input('className') className: string = 'select-atom';
	@Input('dataList') dataList: any[];
	@Input('attrId') attrId: string;
	@Input('attrShow') attrShow: string;	

	formControl: FormControl = new FormControl();

	trackByItems(index: number, item: any): number { return item[this.attrId]; };

	private onChange: (name: string) => void;
	private onTouched: () => void;

	writeValue(data: any): void {
		this.formControl.setValue(data);
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		if (isDisabled) this.formControl.disable();
		else this.formControl.enable();
	} 

	doChange() {
		if (this.onChange) this.onChange(this.formControl.value);
	}

	doBlur() {
		if (this.onTouched)	this.onTouched();
	}

}
