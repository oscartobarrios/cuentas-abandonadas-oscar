import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EntidadFinanciera } from 'src/app/domain/models/entidad-financiera/entidad-financiera';
import { GetAdministrativoService } from 'src/app/domain/usecases/administrativo/administrativo.service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';
import { ConsoleLoggerService } from 'src/app/presentation/shared/services/console-logger.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entidad-registro',
  templateUrl: './entidad-registro.component.html',
  styleUrls: ['./entidad-registro.component.css']
})
export class EntidadRegistroComponent implements OnInit {

  public title: string;
  public identidad: number;

  tipoEntidad: any = [
    { codigo:"01", nombre: "Establecimiento Bancario"},
    { codigo:"02", nombre: "Corporaciones Financieras"},
    { codigo:"04", nombre: "Compañía de Financiamiento"},
    { codigo:"22", nombre: "Entidades Oficiales Especiales"},
    { codigo:"32", nombre: "Entidad Cooperativa de Carácter Financiero"},
  ]

  financieraForm: FormGroup;
  entidadFinanciera: EntidadFinanciera;
  
  constructor(private alarma: SweetAlertService,
              private _servicioAdministrativo: GetAdministrativoService,
              private _router : Router,
              private route: ActivatedRoute) {
    this.formInit();
  }

  ngOnInit(): void {
    this.cargardatos();
  }

  cargardatos(){
    this.identidad = this.route.snapshot.params['id'];
    this.title="Registrar Entidad";
    if(this.identidad !=0){
      this.title="Actualizar Entidad";

      Swal.fire({
        title: 'Espere por favor, Consultando Datos de la entidad',
        allowOutsideClick:false,
        didOpen: () => {
          Swal.showLoading()
        }
      });

      this._servicioAdministrativo.consultarEntidad(this.identidad).subscribe((ResponseData) => {

        console.log(ResponseData);

        this.financieraForm.controls["nombre"].setValue(ResponseData.nombre);
        this.financieraForm.controls["idOrganizacion"].setValue(ResponseData.idOrganizacion);
        this.financieraForm.controls["direccion"].setValue(ResponseData.direccion);
        this.financieraForm.controls["telefonoNumero"].setValue(ResponseData.telefonoNumero);
        this.financieraForm.controls["tipoEntidad"].setValue(ResponseData.tipoEntidad);
        this.financieraForm.controls["codigoEntidad"].setValue(ResponseData.codigoEntidad);
        this.financieraForm.controls["telefonoArea"].setValue(ResponseData.telefonoArea);
        this.financieraForm.controls["telefonoExtension"].setValue(ResponseData.telefonoExtension);
        this.financieraForm.controls["centroCosto"].setValue(ResponseData.centroCosto);

        Swal.close()
      },  (error: any)  => {
        console.log(error);
        Swal.close();
        this.alarma.showError(error);
        
      });

    }

  }


  formInit(){
    this.financieraForm  = new FormGroup({
      "idOrganizacion": new FormControl(this.entidadFinanciera?.IdOrganizacion,[Validators.required]),
      "nombre": new FormControl(this.entidadFinanciera?.Nombre, [Validators.required]),
      "tipoEntidad": new FormControl(this.entidadFinanciera != null ? this.entidadFinanciera.TipoEntidad : null),
      "codigoEntidad": new FormControl(''),
      "telefonoArea": new FormControl(''),
      "telefonoNumero": new FormControl(this.entidadFinanciera?.TelefonoNumero, [Validators.required]),
      "telefonoExtension": new FormControl(''),
      "direccion": new FormControl('',[Validators.required]),
      "centroCosto": new FormControl(''),
    })
  }

  
  onSubmit(){
    debugger;
    if(this.financieraForm.valid)
    {
       
      const{codigoEntidad,idOrganizacion,telefonoArea,telefonoNumero,telefonoExtension} = this.financieraForm.value;

      if(isNaN(codigoEntidad))
      {
        this.alarma.showWarning("El campo Código entidad debe ser numérico");
        return;
      }
      
      if(isNaN(idOrganizacion))
      {
        this.alarma.showWarning("El campo Nit debe ser numérico");
        return;
      }

      if(isNaN(telefonoArea))
      {
        this.alarma.showWarning("El campo Area Teléfono debe ser numérico");
        return;
      }

      if(isNaN(telefonoNumero))
      {
        this.alarma.showWarning("El campo Número Teléfono debe ser numérico");
        return;
      }

      if(isNaN(telefonoExtension))
      {
        this.alarma.showWarning("El campo Extensión Teléfono debe ser numérico");
        return;
      }

       Swal.fire({
        title: 'Espere por favor, Guardando Datos',
        allowOutsideClick:false,
        didOpen: () => {
            Swal.showLoading()
          }
        });
      
        if(this.identidad !=0){

          this._servicioAdministrativo.actualizarEntidad(this.financieraForm.value).subscribe((ResponseData) => {
            Swal.close()
            this.alarma.showSuccess("Actualizado exitosamente");
            this._router.navigate([`/entidad-financiera`]);
            
          },  (error: any)  => {
            console.log(error);
            Swal.close();
            this.alarma.showError(error.error.mensaje);
            
          });
        }  
        else
        {
          this._servicioAdministrativo.insertarEntidad(this.financieraForm.value).subscribe((ResponseData) => {
            Swal.close()
            this.alarma.showSuccess("Guardado exitosamente");
            this._router.navigate([`/entidad-financiera`]);
            
          },  (error: any)  => {
            console.log(error);
            Swal.close();
            this.alarma.showError(error.error.mensaje);
            
          });
          
        }
      
    }
    else{
      this.alarma.showWarning("Información incompleta, por favor verifique");

    }
  }


}
