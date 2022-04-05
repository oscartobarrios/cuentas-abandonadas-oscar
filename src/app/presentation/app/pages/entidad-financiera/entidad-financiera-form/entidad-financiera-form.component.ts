import { ModalDireccionComponent } from './../../../../shared/modal-direccion/modal-direccion.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { entidadService } from './../../../../shared/services/entidad.service';
import { EntidadFinanciera } from './../../../../../domain/models/entidad-financiera/entidad-financiera';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entidad-financiera-form',
  templateUrl: './entidad-financiera-form.component.html',
  styleUrls: ['./entidad-financiera-form.component.css']
})
export class EntidadFinancieraFormComponent implements OnInit {

  tipoEntidad: any = [
    { codigo:"01", nombre: "Establecimiento Bancario"},
    { codigo:"02", nombre: "Corporaciones Financieras"},
    { codigo:"04", nombre: "Compañía de Financiamiento"},
    { codigo:"22", nombre: "Entidades Oficiales Especiales"},
    { codigo:"32", nombre: "Entidad Cooperativa de Carácter Financiero"},
  ]
  financieraForm: FormGroup;
  entidadFinanciera: EntidadFinanciera;
  constructor(private _entidadService: entidadService, private _modalService: NgbModal) { 
    this.formInit();
  }

  ngOnInit(): void {
  }

  formInit(){
    this.financieraForm  = new FormGroup({
      "IdOrganizacion": new FormControl(this.entidadFinanciera?.IdOrganizacion),
      "Nombre": new FormControl(this.entidadFinanciera?.Nombre, Validators.required),
      "TipoEntidad": new FormControl(this.entidadFinanciera != null ? this.entidadFinanciera.TipoEntidad : null),
      "CodigoEntidad": new FormControl(this.entidadFinanciera?.CodigoEntidad),
      "TelefonoArea": new FormControl(this.entidadFinanciera?.TelefonoArea),
      "TelefonoNumero": new FormControl(this.entidadFinanciera?.TelefonoNumero, Validators.required),
      "TelefonoExtension": new FormControl(this.entidadFinanciera?.TelefonoExtension),
      "Direccion": new FormControl(this.entidadFinanciera?.Direccion, Validators.required),
      "CentroCosto": new FormControl(this.entidadFinanciera?.CentroCosto),
    })
  }

  openModal(content:any) {
    const modalRef = this._modalService.open(ModalDireccionComponent);
    modalRef.result.then((result) => {
      if (result) {
        this.financieraForm.controls['Direccion'].setValue(result);
      }
    });
  }

  onSubmit(){
    if(this.financieraForm.valid)
    {
      console.log("Formulario", this.financieraForm.value);
      this._entidadService.crearEntidad(this.financieraForm.value).subscribe(()=>{
        this.financieraForm.reset();
      },
      error=> console.error("Error en el componente de entidad financiera", error));
    }
  }
}
