import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRequestLogin } from 'src/app/domain/models/login/ilogin';
import { GetAdministrativoService } from 'src/app/domain/usecases/administrativo/administrativo.service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';
import { StorageService } from 'src/app/presentation/shared/services/storage.service';
import Swal from 'sweetalert2';
import { CustomValidators } from '../custom-validators';

@Component({
  selector: 'app-cambio-contrasena',
  templateUrl: './cambio-contrasena.component.html',
  styleUrls: ['./cambio-contrasena.component.css']
})
export class CambioContrasenaComponent implements OnInit {

  DatosFormVerificar: FormGroup;
  
  sw = false;
  usuario : any;
  public frmSignup: FormGroup;

  constructor(private alarma: SweetAlertService,
              private _storageservice: StorageService,
              private _router : Router,
              private _servicioAdministrativo: GetAdministrativoService,
              private fb: FormBuilder) { 
  this.frmSignup = this.createSignupForm();
    this.formInit();
  }

  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        // email: [
        //   null,
        //   Validators.compose([Validators.email, Validators.required])
        // ],
        password: [
          null,
          Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            CustomValidators.patternValidator(/\d/, {
              hasNumber: true
            }),
            // check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }),
            // check whether the entered password has a lower case letter
            CustomValidators.patternValidator(/[a-z]/, {
              hasSmallCase: true
            }),
            // check whether the entered password has a special character
            CustomValidators.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: true
              }
            ),
            Validators.minLength(12)
          ])
        ],
        confirmPassword: [null, Validators.compose([Validators.required])]
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      }
    );
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

      // this.DatosFormCambiar = new FormGroup({
      //   contrasenacambio: new FormControl('',[Validators.required]),
      //   contrasenaconfirmar: new FormControl('',[Validators.required]),
      //   });

  }

  onSubmitverificar(){

    if (!this.DatosFormVerificar.invalid) {

      debugger;

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

    if (!this.frmSignup.invalid) {
      debugger;

      const{password,confirmPassword} = this.frmSignup.value;

      if(password != confirmPassword)
      {
        Swal.close();
        this.alarma.showInfo("La contraseña y confirmar contraseña no son iguales");
        return;
      }

      Swal.fire({
        title: 'Espere por favor, Modificando',
        allowOutsideClick:false,
        didOpen: () => {
            Swal.showLoading()
          }
        });

        const data: any = {
          idUsuario: this.usuario.idUsuario,
          password: password
        }

      this._servicioAdministrativo.ActualizarClave(data).subscribe((ResponseData) => {
        Swal.close()
        this.alarma.showSuccess("La contraseña ha sido cambiada exitosamente");
        this._storageservice.clear();
        this._router.navigate(['/login']);
      },  (error: any)  => {
        console.log(error.error.mensaje);
        Swal.close();
        this.alarma.showError(error.error.mensaje)
      });

    }
    else{
      this.alarma.showWarning("por favor verifique la información ingresada");
    }

  }


}
