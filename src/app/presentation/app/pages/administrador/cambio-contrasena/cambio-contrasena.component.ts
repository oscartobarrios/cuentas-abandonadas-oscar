import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRequestLogin } from 'src/app/domain/models/login/ilogin';
import { GetAdministrativoService } from 'src/app/domain/usecases/administrativo/administrativo.service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';
import { StorageService } from 'src/app/presentation/shared/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambio-contrasena',
  templateUrl: './cambio-contrasena.component.html',
  styleUrls: ['./cambio-contrasena.component.css']
})
export class CambioContrasenaComponent implements OnInit {

  DatosFormVerificar: FormGroup;
  DatosFormCambiar: FormGroup;
  
  sw = false;
  usuario : any;

  constructor(private alarma: SweetAlertService,
              private _storageservice: StorageService,
              private _router : Router,
              private _servicioAdministrativo: GetAdministrativoService,) { 
    this.formInit();
  }

  ngOnInit(): void {
    this.usuario = this._storageservice.getItem('payload').infoUsuario;
    console.log(this.usuario);
  }

  formInit(){

    this.DatosFormVerificar = new FormGroup({
      usuario: new FormControl('',[Validators.required]),
      contrasena: new FormControl('',[Validators.required]),
      });

      this.DatosFormCambiar = new FormGroup({
        contrasenacambio: new FormControl('',[Validators.required]),
        contrasenaconfirmar: new FormControl('',[Validators.required]),
        });

  }

  onSubmitverificar(){

    if (!this.DatosFormVerificar.invalid) {

    const{usuario,contrasena} = this.DatosFormVerificar.value;

    var usuariologueado = this.usuario.usuario.toUpperCase();
    var usuarioingresado = usuario.toUpperCase();

    if(usuariologueado != usuarioingresado){
      this.alarma.showWarning("Usuario o Contraseña incorrectos");
      return;
    }

    Swal.fire({
      title: 'Espere por favor, Verificando',
      allowOutsideClick:false,
      didOpen: () => {
          Swal.showLoading()
        }
      });

      debugger;

      const data: IRequestLogin = {
        userName: usuario,
        password: contrasena
      }

      this._servicioAdministrativo.verificarLogin(data).subscribe((ResponseData) => {
        Swal.close()
        this.alarma.showSuccess("Verificado exitosamente");
        this.DatosFormVerificar.get("usuario").disable();
        this.DatosFormVerificar.get("contrasena").disable();
        this.sw = true;
    
        
      },  (error: any)  => {
        console.log(error);
        Swal.close();
        this.alarma.showWarning(error.error.mensaje);
        
      });
    }
    else{
      this.alarma.showWarning("Información incompleta, por favor verifique");
    }

  }

  onSubmitcambiar(){
    if (!this.DatosFormCambiar.invalid) {

    }
    else{
      this.alarma.showWarning("Información incompleta, por favor verifique");
    }

  }


}
