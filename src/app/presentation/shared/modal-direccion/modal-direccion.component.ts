import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Direccion } from 'src/app/domain/models/shared/direccion';

@Component({
  selector: 'app-modal-direccion',
  templateUrl: './modal-direccion.component.html',
  styleUrls: ['./modal-direccion.component.css']
})
export class ModalDireccionComponent implements OnInit {
  direccionForm: FormGroup;
  direccion: Direccion;
  vias:any = [
    { valor: "CL", nombre: "CALLE"},
    { valor: "AC", nombre: "AVENIDA CALLE"},
    { valor: "KR", nombre: "CARRERA"},
    { valor: "AK", nombre: "AVENIDA CARRERA"},
    { valor: "TV", nombre: "TRANSVERSAL"},
    { valor: "DG", nombre: "DIAGONAL"},
    { valor: "AV", nombre: "AVENIDA"},
    { valor: "AU", nombre: "AUTOPISTA"},
  ];

  complementos:any = [
    { valor: "BQ", nombre: "Bloque"},
    { valor: "BG", nombre: "Bodega"},
    { valor: "CA", nombre: "Casa"},
    { valor: "CO", nombre: "Conjunto"},
    { valor: "ED", nombre: "Edificio"},
    { valor: "EQ", nombre: "Esquina"},
    { valor: "ET", nombre: "Etapa"},
    { valor: "IN", nombre: "Interior"},
    { valor: "LC", nombre: "Local"},
    { valor: "LT", nombre: "Lote"},
    { valor: "MZ", nombre: "Manzana"},
    { valor: "PI", nombre: "Piso"},
  ]

  cardinales:any = [
    { valor: "N", nombre: "NORTE"},
    { valor: "S", nombre: "SUR"},
    { valor: "E", nombre: "ESTE"},
    { valor: "O", nombre: "OESTE"}
  ];

  abc:string[] = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","U","V","W","X","Y","Z"];

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {  
    this.formInit();
  }

  formInit() {
    this.direccionForm = new FormGroup({
      "Via" : new FormControl(this.direccion?.Via, Validators.required),
      "Numero" : new FormControl(this.direccion?.Numero, Validators.required),
      "Letra" : new FormControl(this.direccion?.Letra,),
      "Bis" : new FormControl(this.direccion?.Bis),
      "Cardinal" : new FormControl(this.direccion?.Cardinal),
      "NumeroDos" : new FormControl(this.direccion?.NumeroDos, Validators.required),
      "LetraDos" : new FormControl(this.direccion?.LetraDos),
      "NumeroTres" : new FormControl(this.direccion?.NumeroTres, Validators.required),
      "CardinalDos" : new FormControl(this.direccion?.CardinalDos),
      "Complemento" : new FormControl(this.direccion?.Complemento),
      "ComplementoDos" : new FormControl(this.direccion?.ComplementoDos),
      "DireccionEstandar" : new FormControl(this.direccion?.DireccionEstandar),
    })
  }

  buildAddress(){
    let direccion = this.direccionForm.value;
    console.log(this.direccionForm.value.Bis);
    this.direccionForm.value.DireccionEstandar = `${direccion.Via} ${direccion.Numero ? direccion.Numero : ''} ${direccion.Letra ? direccion.Letra : ''} ${direccion.Bis ? 'Bis' : ''} ` +
    `${direccion.Cardinal ? direccion.Cardinal : ''} # ${direccion.NumeroDos ? direccion.NumeroDos : ''} ${direccion.LetraDos ? direccion.LetraDos : ''} ` +
    ` - ${direccion.NumeroTres ? direccion.NumeroTres : ''} ${direccion.CardinalDos ? direccion.CardinalDos : ''} ` +
    `${direccion.Complemento ? direccion.Complemento : ''} ${direccion.ComplementoDos ? direccion.ComplementoDos : ''}`;

    this.direccionForm.controls['DireccionEstandar'].setValue(this.direccionForm.value.DireccionEstandar);
  }

  onSubmit() {
    if(this.direccionForm.valid)
    {
      this.activeModal.close(this.direccionForm.value.DireccionEstandar);
    }
  }
}
