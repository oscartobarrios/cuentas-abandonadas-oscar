import { entidadService } from './../../../../shared/services/entidad.service';
import { RecursoHumano } from './../../../../../domain/models/entidad-financiera/recurso-humano';
import { ModalDireccionComponent } from './../../../../shared/modal-direccion/modal-direccion.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-recurso-humano',
  templateUrl: './recurso-humano.component.html',
  styleUrls: ['./recurso-humano.component.css']
})
export class RecursoHumanoComponent implements OnInit {
  recursoHumanoForm: FormGroup;
  recursoHumano: RecursoHumano;
  lenghtIdentificacion: string = 'El campo es requerido';
  roles: string[] = [
    "FUNCIONARIO AUTORIZADO SOPORTE 1",
    "FUNCIONARIO AUTORIZADO SOPORTE 2",
    "FUNCIONARIO CONFIRMAR OPERACION 1",
    "REPRESENTANTE",
    "FUNCIONARIO AUTORIZADO ACCESO 1",
    "REVISOR",
    "FUNCIONARIO CONFIRMAR OPERACION 2",
    "FUNCIONARIO AUTORIZADO ACCESO 2"]
  tipoDocumento: any = [
    { codigo: 1, nombre: "Cédula"},
    { codigo: 2, nombre: "Cédula extranjería"},
    { codigo: 3, nombre: "Pasaporte"},
    { codigo: 4, nombre: "NIT"}
  ]
  errores: string[] = [];
  constructor(private _entidadService: entidadService, private _modalService: NgbModal) {
    this.formInit();
   }

  ngOnInit(): void {
  }

  setTipoIdentificacionMaxLength(){
    const tipoIdentificacion = this.recursoHumanoForm.value.TipoIdentificacion;
    if (tipoIdentificacion === '1')
    {
      this.lenghtIdentificacion = 'El campo Identificación no debe ser mayor a 11 caracteres y es requerido';
      this.recursoHumanoForm.controls["Identificacion"].setValidators([Validators.required, Validators.max(99999999999)]);
    }
    else if (tipoIdentificacion === '2')
    {
      this.lenghtIdentificacion = 'El campo Identificación no debe ser mayor a 6 caracteres y es requerido';
      this.recursoHumanoForm.controls["Identificacion"].setValidators([Validators.required,Validators.min(99999)]);
    }
    else
    {
      this.lenghtIdentificacion = 'El campo Identificación no debe ser mayor a 9 caracteres y es requerido';
      this.recursoHumanoForm.controls["Identificacion"].setValidators([Validators.required,Validators.min(99999999)]);
    }
    console.log(this.lenghtIdentificacion,tipoIdentificacion, this.recursoHumanoForm.controls["Identificacion"])
  }

  formInit() {
    this.recursoHumanoForm = new FormGroup({
      IdOrganizacion : new FormControl(this.recursoHumano?.IdOrganizacion),
      IdRecurso : new FormControl(this.recursoHumano?.IdRecurso),
      TipoIdentificacion : new FormControl(this.recursoHumano?.TipoIdentificacion, Validators.required),
      Identificacion : new FormControl(this.recursoHumano?.Identificacion, Validators.required),
      PrimerNombre : new FormControl(this.recursoHumano?.PrimerNombre, [Validators.required, Validators.maxLength(15)]),
      SegundoNombre : new FormControl(this.recursoHumano?.SegundoNombre, Validators.maxLength(15)),
      PrimerApellido : new FormControl(this.recursoHumano?.PrimerApellido, [Validators.required, Validators.maxLength(15)]),
      SegundoApellido : new FormControl(this.recursoHumano?.SegundoApellido, Validators.maxLength(15)),
      Area : new FormControl(this.recursoHumano?.Area),
      DireccionCorrespondencia : new FormControl(this.recursoHumano?.DireccionCorrespondencia, Validators.required),
      TelefonoArea : new FormControl(this.recursoHumano?.TelefonoArea),
      TelefonoNumero : new FormControl(this.recursoHumano?.TelefonoNumero, [Validators.required, Validators.max(9999999999)]),
      TelefonoExtension : new FormControl(this.recursoHumano?.TelefonoExtension, Validators.max(9999999999)),
      Celular : new FormControl(this.recursoHumano?.Celular, [Validators.required, Validators.max(9999999999)]),
      Email : new FormControl(this.recursoHumano?.Email, [Validators.required, Validators.email]),
      Rol : new FormControl(this.recursoHumano?.Rol),
    })

    console.log(this.recursoHumanoForm.controls['Identificacion'].valid, this.recursoHumanoForm.controls['Identificacion'].touched, this.recursoHumanoForm.controls['DireccionCorrespondencia'].valid);
  }
  
  onSubmit(){
    this.recursoHumanoForm.markAllAsTouched();
    console.log(this.recursoHumanoForm);
    if(this.recursoHumanoForm.valid)
    {
      //for debug porpuses
      this.recursoHumanoForm.value.IdOrganizacion = '6666';
      this.recursoHumanoForm.value.IdRecurso = 2691;
      this.recursoHumanoForm.value.TipoIdentificacion = +this.recursoHumanoForm.value.TipoIdentificacion;
      console.log("Formulario", this.recursoHumanoForm.value);
      this._entidadService.crearRecursoHumano(this.recursoHumanoForm.value).subscribe(()=>{
        this.recursoHumanoForm.reset();
      },
      error=> console.error("Error en el componente de recurso humano", error));
    }
  }

  openModal(content:any) {
    const modalRef = this._modalService.open(ModalDireccionComponent);
    modalRef.result.then((result) => {
      if (result) {
        this.recursoHumanoForm.controls['DireccionCorrespondencia'].setValue(result);
      }
    });
  }

}
