import { Component, Input, forwardRef, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { SelectList } from '../interfaces/select-list';

@Component({
  selector: 'app-selector-reactivo',
  templateUrl: './selector-reactivo.component.html',
  styleUrls: ['./selector-reactivo.component.css'],
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SelectorReactivoComponent),
        multi: true
    }
  ]
})
export class SelectorReactivoComponent implements ControlValueAccessor, OnChanges {
  @Input() items: SelectList[];
  @Input() readonly: boolean;
  @Input() searchable = true;
  @Input() clearable = true;
  @Input() multiple: boolean;
  @Input() selectableGroup: boolean;
  @Input() defaultOption: boolean;
  @Input() placeholder = 'Seleccione...';
  @Input() name: string;
  @Input() id: string;
  @Input() defaultCode: string;
  @Input() bindLabel = 'nombre';
  @Input() groupBy: string;
  @Input() bindValue = '';
  @Input() notFoundText = 'No hay registros';
  @Input() requerido = false;
  @Input() appendTo = null;

  // tslint:disable-next-line: no-output-native
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() clear: EventEmitter<any> = new EventEmitter();

  public defaultValue: any;
  public value: any;

  private onChangeCallback: (_: any) => void;
  private onTouchCallback: (_: any) => void;
  title: string = this.placeholder;

  ngOnChanges(changes: SimpleChanges): void {

  }

  changeSelector(val: any) {
    this.onChangeCallback(val);
    this.onTouchCallback(val);
    this.change.emit(val);
  }

  clearSelector() {
    this.value = null;
    this.clear.emit(this.value);
  }
  writeValue(value: any): void {
    this.value = value;
    if (value !== '') {
      this.defaultValue = value;
    }
  }
  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchCallback = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.readonly = isDisabled;
  }
}
