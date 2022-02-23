import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Itipocargue } from 'src/app/domain/models/archivo/itipocargue';
import { GetArchivoUseCaseService } from 'src/app/domain/usecases/archivo/get-archivo-use-case.service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';
import { NotificationsService } from 'src/app/presentation/shared/services/notifications.service';
import { StorageService } from 'src/app/presentation/shared/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-autorizacion-rechazo',
  templateUrl: './autorizacion-rechazo.component.html',
  styleUrls: ['./autorizacion-rechazo.component.scss']
})
export class AutorizacionRechazoComponent implements OnInit {

  usuario?: string;
  ip: string;
  reactiveForm: FormGroup;
  archivo: File;
  mensaje?: any = '';
  idCargue: string;

  constructor(private alarma: SweetAlertService,
              private _storageservice: StorageService,
              private _getarchivousecase: GetArchivoUseCaseService,
              private route: ActivatedRoute,
              private _router : Router) {

this.reactiveForm = new FormGroup({
observacion: new FormControl('', [Validators.required]),
file: new FormControl('', [Validators.required]),
});
this.usuario = this._storageservice.getItem('payload')?.infoUsuario.usuario;
}

  ngOnInit(): void {
    this.idCargue = this.route.snapshot.params['id'];
  }

  onSubmit(){

    if (!this.reactiveForm.invalid) {

      const{observacion} = this.reactiveForm.value;

      Swal.fire({
        title: 'Espere por favor, Guardando Datos',
        allowOutsideClick:false,
        didOpen: () => {
            Swal.showLoading()
          }
        });

        const data = {
          idCargue: this.idCargue,
          usuario: this.usuario,
          ip: this.ip || '193.168.1.1',
          observacion: observacion,
          file: this.archivo,
         
        };

      this._getarchivousecase.CambiarEstadoCargueRechazada(data).subscribe((ResponseData) => {
        Swal.close()
        this.alarma.showSuccess("autorización rechazada exitosamente");
        this._router.navigate([`/autorizacion-cargues`]);
        
      },  (error: any)  => {
        console.log(error);
        Swal.close();
        this.alarma.showError(this.mensaje);
        
      });

    }else{
      this.alarma.showWarning("Información incompleta, por favor verifique");
    }

  }

  get observacion() {
    return this.reactiveForm.get('observacion');
  }

  get file() {
    return this.reactiveForm.get('file');
  }
  

  fileChange(e) {
    const fileList = e.target.files;

    if(fileList[0].type === "text/plain")
    {
      if (fileList.length > 0) {

        this.archivo = fileList[0];
      }

    }else{
      this.alarma.showWarning("El archivo debe ser de extension .txt");
      // this.mensaje = 'El archivo debe ser de extension .txt';
    }
    
  }


}
