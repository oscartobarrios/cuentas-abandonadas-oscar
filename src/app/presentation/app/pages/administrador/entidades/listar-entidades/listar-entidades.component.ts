import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IEntidad } from 'src/app/domain/models/administrativo/ientidad';
import { EntidadFinanciera } from 'src/app/domain/models/entidad-financiera/entidad-financiera';
import { GetAdministrativoService } from 'src/app/domain/usecases/administrativo/administrativo.service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';
import { NotificationsService } from 'src/app/presentation/shared/services/notifications.service';
import { StorageService } from 'src/app/presentation/shared/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-entidades',
  templateUrl: './listar-entidades.component.html',
  styleUrls: ['./listar-entidades.component.css']
})
export class ListarEntidadesComponent implements OnInit {

  usuario : any;
  displayedColumns: string[] = ['Nit', 'Nombre','Direccion','Telefono','NombreTipo','Actions'];
  dataSource = new MatTableDataSource<IEntidad>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  financieraForm: FormGroup;
  entidadFinanciera: EntidadFinanciera;
  idOrganizacion: any;
  estadoCorreo: string = "";
  swCorreo: number = 0;
  public nombreArchivo = 'Reporte Entidades Tesorero.xlsx';

  tipoEntidad: any = [
    { codigo:"01", nombre: "Establecimiento Bancario"},
    { codigo:"02", nombre: "Corporaciones Financieras"},
    { codigo:"04", nombre: "Compañía de Financiamiento"},
    { codigo:"22", nombre: "Entidades Oficiales Especiales"},
    { codigo:"32", nombre: "Entidad Cooperativa de Carácter Financiero"},
  ]


  constructor(private _servicioAdministrativo: GetAdministrativoService,
              private _notifications: NotificationsService,
              private _storageservice: StorageService,
              private alarma: SweetAlertService,
              private _router : Router,) { 
                this.formInit();
              }

  ngOnInit(): void {

    this.usuario = this._storageservice.getItem('payload').infoUsuario;
    this.swCorreo = 0;
    this._servicioAdministrativo.ConsultarNotificacionesLiderPorIdOrganizacion(this.usuario.idOrganizacion,"PENDIENTE").subscribe((ResponseData) => {

      if(ResponseData != null)
      {
        this.swCorreo = 1;
        this.estadoCorreo = "Estado del Correo: Pendiente por aprobar";
      }else{
        this._servicioAdministrativo.ConsultarNotificacionesLiderPorIdOrganizacion(this.usuario.idOrganizacion,"APROBADO").subscribe((ResponseData) => {

          if(ResponseData != null)
          {
            this.swCorreo = 2;
            this.estadoCorreo = "Estado del Correo: Aprobado";
          }else{
            this.swCorreo = 0;
          }
    
        },  (error: any)  => {
          console.log(error);
          Swal.close();
          this.alarma.showError(error.error.mensaje);
    
        });
      }

    },  (error: any)  => {
      console.log(error);
      Swal.close();
      this.alarma.showError(error.error.mensaje);

    });

    if(this.usuario.idPerfil == "4" || this.usuario.idPerfil == "5")
    {
      const preloader = this._notifications.showPreloader();
      this._servicioAdministrativo.ListarEntidades().subscribe((ResultData) => {
  
        console.log(ResultData);
        this.dataSource.data = ResultData;
        this.dataSource.paginator = this.paginator;
        preloader.close();
      });
    }

    if(this.usuario.idPerfil == "9")
    {
      const preloader = this._notifications.showPreloader();
      this.idOrganizacion = this.usuario.idOrganizacion;

      this._servicioAdministrativo.consultarEntidad(this.idOrganizacion).subscribe((ResponseData) => {

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
        preloader.close();
      },  (error: any)  => {
        console.log(error);
        this.alarma.showError(error);
        preloader.close();
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
      "swModificar": new FormControl(0),
      "idUsuario":new FormControl(0),
    })
  }
  

  onSubmit(){

    if(this.financieraForm.valid)
    {
      if(this.swCorreo == 2)
      {
            Swal.fire({
              title: 'Esta seguro que desea actualizar la entidad?, después de actualizado no se podrá modificar de nuevo el nombre código y tipo, se deberia mandar de nuevo otro correo solicitando dicho cambio',
              text: "No podrás revertir esto!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, Actualizar!',
              cancelButtonText: "Cancelar",
              allowOutsideClick:false,
            }).then((result) => {
              if (result.isConfirmed) {

            Swal.fire({
              title: 'Espere por favor, Actualizando Datos de la Entidad',
              allowOutsideClick:false,
              didOpen: () => {
                  Swal.showLoading()
                }
              });

              this.financieraForm.controls['swModificar'].setValue(this.swCorreo);
              this.financieraForm.controls["idUsuario"].setValue(this.usuario.idUsuario);

              this._servicioAdministrativo.actualizarEntidad(this.financieraForm.value).subscribe((ResponseData) => {
              
                alert("Actualizado exitosamente");
                Swal.close();
                window.location.reload();
                // this.alarma.showSuccess("Actualizado exitosamente");
                // this._router.navigate([`/entidad-financiera`]);
               
              },  (error: any)  => {
                console.log(error);
                Swal.close();
                this.alarma.showError(error.error.mensaje);
                
              });
            }
          })
      }else{
        this.financieraForm.controls['swModificar'].setValue(this.swCorreo);

              this._servicioAdministrativo.actualizarEntidad(this.financieraForm.value).subscribe((ResponseData) => {
                Swal.close()
                this.alarma.showSuccess("Actualizado exitosamente");
                this.swCorreo = 0;
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

  envioCorreoLider(){
    this._router.navigate([`/envioCorreoLiderEntidad`]);

  }

  descargarExcelEntidad(){

    Swal.fire({
      title: 'Espere por favor, Descargando Datos',
      allowOutsideClick:false,
      didOpen: () => {
          Swal.showLoading()
        }
      });

    this._servicioAdministrativo.getCargaexcelEntidadesTesorero().subscribe(response => {
    
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(response);
      downloadLink.setAttribute('download', this.nombreArchivo);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      Swal.close();
    })

  }


}
