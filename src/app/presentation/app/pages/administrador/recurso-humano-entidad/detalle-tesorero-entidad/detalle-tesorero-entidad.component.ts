import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EntidadFinanciera } from 'src/app/domain/models/entidad-financiera/entidad-financiera';
import { GetAdministrativoService } from 'src/app/domain/usecases/administrativo/administrativo.service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-tesorero-entidad',
  templateUrl: './detalle-tesorero-entidad.component.html',
  styleUrls: ['./detalle-tesorero-entidad.component.css']
})
export class DetalleTesoreroEntidadComponent implements OnInit {

  public identidad: number;
  public idOrganizacion: string;
  financieraForm: FormGroup;
  entidadFinanciera: EntidadFinanciera;
  public nombreArchivo = 'Reporte Entidad Tesorero.xlsx';

  tipoEntidad: any = [
    { codigo:"01", nombre: "Establecimiento Bancario"},
    { codigo:"02", nombre: "Corporaciones Financieras"},
    { codigo:"04", nombre: "Compañía de Financiamiento"},
    { codigo:"22", nombre: "Entidades Oficiales Especiales"},
    { codigo:"32", nombre: "Entidad Cooperativa de Carácter Financiero"},
  ]
  
  constructor(private route: ActivatedRoute,
              private _servicioAdministrativo: GetAdministrativoService,
              private alarma: SweetAlertService,) { 
      this.formInit();
    }

  ngOnInit(): void {
    this.cargardatos();
  }

  cargardatos(){
    this.identidad = this.route.snapshot.params['id'];
    this.idOrganizacion = this.route.snapshot.params['id'];
    

    Swal.fire({
      title: 'Espere por favor, Consultando Datos de la entidad',
      allowOutsideClick:false,
      didOpen: () => {
        Swal.showLoading()
      }
    });

    this._servicioAdministrativo.consultarEntidad(this.identidad).subscribe((ResponseData) => {

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

  formInit(){
    this.financieraForm  = new FormGroup({
      "idOrganizacion": new FormControl(this.entidadFinanciera?.IdOrganizacion,[Validators.required]),
      "nombre": new FormControl(this.entidadFinanciera?.Nombre, [Validators.required]),
      "tipoEntidad": new FormControl(this.entidadFinanciera != null ? this.entidadFinanciera.TipoEntidad : null, [Validators.required]),
      "codigoEntidad": new FormControl('', [Validators.required]),
      "telefonoArea": new FormControl(''),
      "telefonoNumero": new FormControl(this.entidadFinanciera?.TelefonoNumero, [Validators.required]),
      "telefonoExtension": new FormControl(''),
      "direccion": new FormControl('',[Validators.required]),
      "centroCosto": new FormControl(''),
      "idUsuario":new FormControl(0),
      "swModificar": new FormControl(0),
    })
  }

  descargarExcel(){

    Swal.fire({
      title: 'Espere por favor, Descargando Datos',
      allowOutsideClick:false,
      didOpen: () => {
          Swal.showLoading()
        }
      });

    this._servicioAdministrativo.getCargaexcelEntidadTesorero(this.idOrganizacion).subscribe(response => {
    
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(response);
      downloadLink.setAttribute('download', this.nombreArchivo);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      Swal.close();
    })

  }

}
