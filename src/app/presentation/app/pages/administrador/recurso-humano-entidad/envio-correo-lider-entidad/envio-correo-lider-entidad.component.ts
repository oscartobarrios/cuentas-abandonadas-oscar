import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetAdministrativoService } from 'src/app/domain/usecases/administrativo/administrativo.service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';
import { StorageService } from 'src/app/presentation/shared/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-envio-correo-lider-entidad',
  templateUrl: './envio-correo-lider-entidad.component.html',
  styleUrls: ['./envio-correo-lider-entidad.component.css']
})
export class EnvioCorreoLiderEntidadComponent implements OnInit {

  reactiveForm: FormGroup;
  archivo: File;
  archivo2: File;
  usuario: any;

  constructor(private _storageservice: StorageService,
              private alarma: SweetAlertService,
              private _servicioAdministrativo: GetAdministrativoService,
              private _router : Router) { 
    this.reactiveForm = new FormGroup({
      file: new FormControl('', [Validators.required]),
      file2: new FormControl('', [Validators.required]),
      });
      this.usuario = this._storageservice.getItem('payload').infoUsuario;
      console.log(this.usuario);

  }

  ngOnInit(): void {
  }

  get file() {
    return this.reactiveForm.get('file');
  }

  get file2() {
    return this.reactiveForm.get('file2');
  }

  fileChange(e) {
    
    const fileList = e.target.files;

    if(fileList[0].type != "application/pdf")
    {
      this.alarma.showWarning("El archivo debe ser en  formato pdf");
      return;
    }

    if (fileList.length > 0) {

      this.archivo = fileList[0];
    }
  }

  fileChange2(e) {
    
    const fileList = e.target.files;

    if(fileList[0].type != "application/pdf")
    {
      this.alarma.showWarning("El archivo debe ser en  formato pdf");
      return;
    }

    if (fileList.length > 0) {

      this.archivo2 = fileList[0];
    }
  }


  onSubmit(){
    if (!this.reactiveForm.invalid) {  

      Swal.fire({
        title: 'Espere por favor, Enviando Correo',
        allowOutsideClick:false,
        didOpen: () => {
            Swal.showLoading()
          }
        });

      const data = {
        usuario: this.usuario.usuario,
        nombreEntidad: this.usuario.nombreEntidad,
        file: this.archivo,
        file2: this.archivo2,
        idOrganizacion: this.usuario.idOrganizacion,
      };

      debugger;

      this._servicioAdministrativo.EnvioCorreoLiderEntidad(data).subscribe((ResponseData) => {
        Swal.close()
        this.alarma.showSuccess("Envio correo exitosamente");
        this._router.navigate([`/entidad-financiera`]);

      },  (error: any)  => {
        console.log(error);
        Swal.close();
        this.alarma.showError(error.error.mensaje);

      });

    }else{
      this.alarma.showWarning("Información incompleta, por favor verifique");
    }
  }

}
