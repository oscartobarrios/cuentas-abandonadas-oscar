import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Direccion } from 'src/app/domain/models/shared/direccion';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';

@Component({
  selector: 'app-modal-direccion',
  templateUrl: './modal-direccion.component.html',
  styleUrls: ['./modal-direccion.component.css']
})
export class ModalDireccionComponent implements OnInit {
  direccionForm: FormGroup;
  direccion: Direccion;
  vias:any = [

    { valor: "CALLE", nombre: "CALLE"},
    { valor: "CARRERA", nombre: "CARRERA"},
    { valor: "AVENIDA", nombre: "AVENIDA"},
    { valor: "TRANSVERSAL", nombre: "TRANSVERSAL"},
    { valor: "DIAGONAL", nombre: "DIAGONAL"},
    { valor: "AV CARRERA", nombre: "AV CARRERA"},
    { valor: "CIRCULAR", nombre: "CIRCULAR"},
  ];


  abc:string[] = ["A","B","C","D","E","F","ESTE","SUR","NORTE"];

  constructor(public activeModal: NgbActiveModal,
              private alarma: SweetAlertService,) {
  }

  ngOnInit(): void {  
    this.formInit();
  }

  formInit() {
    this.direccionForm = new FormGroup({
      "Via" : new FormControl(this.direccion?.Via, Validators.required),
      "Numero" : new FormControl(this.direccion?.Numero, Validators.required),
      "Letra" : new FormControl(this.direccion?.Letra,),
      "NumeroDos" : new FormControl(this.direccion?.NumeroDos, Validators.required),
      "NumeroTres" : new FormControl(this.direccion?.NumeroTres, Validators.required),
      "DireccionEstandar" : new FormControl(this.direccion?.DireccionEstandar),
    })
  }

  buildAddress(){
    let direccion = this.direccionForm.value;
    console.log(this.direccionForm.value.Bis);
    this.direccionForm.value.DireccionEstandar = `${direccion.Via} ${direccion.Numero ? direccion.Numero : ''} ${direccion.Letra ? direccion.Letra : ''} ${direccion.Bis ? 'Bis' : ''} ` +
    `${direccion.Cardinal ? direccion.Cardinal : ''} Nro. ${direccion.NumeroDos ? direccion.NumeroDos : ''} ${direccion.LetraDos ? direccion.LetraDos : ''} ` +
    ` - ${direccion.NumeroTres ? direccion.NumeroTres : ''} ${direccion.CardinalDos ? direccion.CardinalDos : ''} ` +
    `${direccion.Complemento ? direccion.Complemento : ''} ${direccion.ComplementoDos ? direccion.ComplementoDos : ''}`;

    this.direccionForm.controls['DireccionEstandar'].setValue(this.direccionForm.value.DireccionEstandar);
  }

  onSubmit() {
    if(this.direccionForm.valid)
    {
      this.activeModal.close(this.direccionForm.value.DireccionEstandar);
    }
    else{
      this.alarma.showWarning("Información incompleta, por favor verifique");

    }
  }
}
