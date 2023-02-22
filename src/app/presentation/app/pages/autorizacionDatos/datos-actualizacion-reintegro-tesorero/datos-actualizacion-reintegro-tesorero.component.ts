import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GetArchivoUseCaseService } from 'src/app/domain/usecases/archivo/get-archivo-use-case.service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';
import { StorageService } from 'src/app/presentation/shared/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-datos-actualizacion-reintegro-tesorero',
  templateUrl: './datos-actualizacion-reintegro-tesorero.component.html',
  styleUrls: ['./datos-actualizacion-reintegro-tesorero.component.css']
})
export class DatosActualizacionReintegroTesoreroComponent implements OnInit {

  DatosReintegroForm: FormGroup;
  public idcargo: string;
  usuario : any;

  constructor(private _storageservice: StorageService,
              private route: ActivatedRoute,
              private alarma: SweetAlertService,
              private _getarchivousecase: GetArchivoUseCaseService,
              private _router : Router) {
    this.formInit();
  }
            
  ngOnInit(): void {
    this.usuario = this._storageservice.getItem('payload').infoUsuario;
    this.idcargo = this.route.snapshot.params['id'];

    Swal.fire({
      title: 'Espere por favor, Consultando Datos de la orden de cumplimiento',
      allowOutsideClick:false,
      didOpen: () => {
        Swal.showLoading()
      }
    });

    this._getarchivousecase.GetObtenerOrdenCumplimientoIdCargue(this.idcargo).subscribe((ResultData) => {

      this.DatosReintegroForm.controls["nroperacioncud"].setValue(ResultData.nroOperacionCud);
      Swal.close()
    },  (error: any)  => {
      console.log(error);
      Swal.close();
      this.alarma.showError(error);
    });

  }

  formInit(){

    this.DatosReintegroForm = new FormGroup({
      nroperacioncud: new FormControl('', [Validators.required]),
      });
  }
  
  onSubmit(){
    if (!this.DatosReintegroForm.invalid) {

      const{nroperacioncud} = this.DatosReintegroForm.value;

      if(nroperacioncud.toString().length > 15)
      {
        this.alarma.showError("El número de operación CUD debe ser menor o igual a 15 caracteres numéricos");
        return;
      }

      Swal.fire({
        title: 'Espere por favor, Guardando Datos',
        allowOutsideClick:false,
        didOpen: () => {
            Swal.showLoading()
          }
        });

        const data:any = {
          idCargue: this.idcargo,
          idusuario: this.usuario.idUsuario,
          nroOperacionCud:nroperacioncud,
          observacionReintegro:'undefined',
          observacionAutorizacion: 'undefined',
          tipo: 'REINTEGRO'
        }; 

        this._getarchivousecase.ActualizarDatosOrdenCumplimientoReintegroTesoreroSebra(data).subscribe((ResponseData) => {
          Swal.close()
          this.alarma.showSuccess("Guardado exitosamente");
          this._router.navigate([`/autorizacion-cargues`]);
        },  (error: any)  => {
          console.log(error.error.mensaje);
          Swal.close();
          this.alarma.showError(error.error.mensaje)
        });

    }
    else{
      this.alarma.showWarning("Información incompleta, por favor verifique");
    }

  }
}
