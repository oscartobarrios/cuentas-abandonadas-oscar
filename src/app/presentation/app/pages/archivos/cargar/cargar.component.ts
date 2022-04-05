import {Component, OnInit} from '@angular/core';
import {GetArchivoUseCaseService} from '../../../../../domain/usecases/archivo/get-archivo-use-case.service';
import {Itipocargue} from '../../../../../domain/models/archivo/itipocargue';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StorageService} from '../../../../shared/services/storage.service';
import {NotificationsService} from '../../../../shared/services/notifications.service';

@Component({
  selector: 'app-cargar',
  templateUrl: './cargar.component.html',
  styleUrls: ['./cargar.component.scss']
})
export class CargarComponent implements OnInit {

  tipos: Itipocargue[] = [];
  opciontipo?: any;
  usuario?: any;
  formerror = false;


  reactiveForm: FormGroup;
  archivo: File;
  estadoenvio?: any = 'INICIO';
  mensaje?: any = '';

  constructor(private _getarchivousecase: GetArchivoUseCaseService,
              private _storageservice: StorageService,
              private _notifications: NotificationsService) {

    this.reactiveForm = new FormGroup({
      nombreCargue: new FormControl('', [Validators.required]),
      tipoArchivo: new FormControl('', [Validators.required]),
      file: new FormControl('', [Validators.required]),
    });
    this.usuario = this._storageservice.getItem('payload')?.infoUsuario.usuario;
  }


  ngOnInit(): void {
    this._getarchivousecase.TipoCargue().subscribe((ResulData) => {
      this.tipos = ResulData;
     
    });
  }

  get nombreCargue() {
    return this.reactiveForm.get('nombreCargue');
  }

  get tipoArchivo() {
    return this.reactiveForm.get('tipoArchivo');
  }

  get file() {
    return this.reactiveForm.get('file');
  }

  fileChange(e) {
    const fileList = e.target.files;
    this.estadoenvio = '';
    this.mensaje = '';

    if(fileList[0].type === "text/plain")
    {
      if (fileList.length > 0) {

        this.archivo = fileList[0];
      }

    }else{
      this.estadoenvio = 'RECHAZADO';
      this.mensaje = 'El archivo debe ser de extension .txt';
    }
    
  }

  onSubmit(): void {

    if (!this.reactiveForm.invalid) {

      const data = {
        tipoArchivo: this.tipoArchivo.value,
        nombreCargue: this.nombreCargue.value,
        usuario: this.usuario,
        file: this.archivo
      };
      
      const preloader = this._notifications.showPreloader();
      this._getarchivousecase.Cargar(data).subscribe((ResponseData) => {
        preloader.close();
        console.log(ResponseData);
        console.log(Number(ResponseData?.mensaje).toString());
        if(ResponseData?.mensaje.indexOf("Cargue Exitoso") === -1){
          this.estadoenvio = 'RECHAZADO';
        }else{
          this.estadoenvio = 'APROBADO';
        }
        this.mensaje = ResponseData?.mensaje;

      },  (error: any)  => {
        preloader.close();
        const dataerror = error.error || error.statusText;
        this.estadoenvio = 'RECHAZADO';
        this.mensaje = error.error.mensaje
      });
    } else {
      this.formerror = true;
    }
  }


}
