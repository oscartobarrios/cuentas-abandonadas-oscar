import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetAdministrativoService } from 'src/app/domain/usecases/administrativo/administrativo.service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';
import { StorageService } from 'src/app/presentation/shared/services/storage.service';
import Swal from 'sweetalert2';
import { CustomValidators } from '../custom-validators';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.scss']
})
export class RecuperarContrasenaComponent implements OnInit {

  DatosFormVerificar: FormGroup;
  DatosFormCodigo: FormGroup;
  public frmSignup: FormGroup;
  swenviar = false;
  swcodigo = false;
  idusuario: string;

  constructor(private fb: FormBuilder,
              private alarma: SweetAlertService,
              private _servicioAdministrativo: GetAdministrativoService,
              private _storageservice: StorageService,
              private _router : Router,) { 
    this.frmSignup = this.createSignupForm();
    this.formInit();
  }
    
  ngOnInit(): void {
  }

  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        
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


  formInit(){

    this.DatosFormVerificar = new FormGroup({
      usuario: new FormControl('',[Validators.required])
      });

      this.DatosFormCodigo = new FormGroup({
        codigo: new FormControl('',[Validators.required])
        });

  }

  onSubmitverificar(){

    if (!this.DatosFormVerificar.invalid) {

      const{usuario} = this.DatosFormVerificar.value;

      Swal.fire({
        title: 'Espere por favor, Verificando',
        allowOutsideClick:false,
        didOpen: () => {
            Swal.showLoading()
          }
        });

      this._servicioAdministrativo.enviarcodigoverificacion(usuario).subscribe((ResponseData) => {
        Swal.close()
        console.log(ResponseData.idUsuario);
        this.alarma.showSuccess("Correo enviado exitosamente con el código de verificación, por favor revise su correo");
        this.DatosFormVerificar.get("usuario").disable();
        this.swenviar = true;
        
      },  (error: any)  => {
        console.log(error);
        Swal.close();
        this.alarma.showWarning(error.error.mensaje);
        
      });

     

    }
    else{
      this.alarma.showWarning("Ingrese el usuario para poder enviar el correo");
    }
    

  }

  onSubmitCodigo(){

    if (!this.DatosFormCodigo.invalid) {

      const{usuario} = this.DatosFormVerificar.value;
      const{codigo} = this.DatosFormCodigo.value;

      Swal.fire({
        title: 'Espere por favor, Verificando',
        allowOutsideClick:false,
        didOpen: () => {
            Swal.showLoading()
          }
        });

      this._servicioAdministrativo.ConsultarUsuarioPorNombre(usuario).subscribe((ResponseData) => {
        Swal.close()
        // console.log(ResponseData.idUsuario);
        this.idusuario = ResponseData.idUsuario;
        debugger;

        if(ResponseData.codigoVerificacion.toString() === codigo){
          this.alarma.showSuccess("Código de verificación ingresado exitosamente");
          this.DatosFormCodigo.get("codigo").disable();
          this.swcodigo = true;
        }else{
          this.alarma.showWarning("El Código de verificación ingresado no es correcto, por favor intente nuevamente...");
        }
       
        
      },  (error: any)  => {
        console.log(error);
        Swal.close();
        this.alarma.showWarning(error.error.mensaje);
        
      });

     

    }
    else{
      this.alarma.showWarning("Ingrese el código de verificación");
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
          idUsuario: this.idusuario,
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
      this.alarma.showWarning("Información incompleta, por favor verifique");
    }
  }


}
