import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GetArchivoUseCaseService } from 'src/app/domain/usecases/archivo/get-archivo-use-case.service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';
import { StorageService } from 'src/app/presentation/shared/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-datos-traslado-tesorero',
  templateUrl: './datos-traslado-tesorero.component.html',
  styleUrls: ['./datos-traslado-tesorero.component.css']
})
export class DatosTrasladoTesoreroComponent implements OnInit {

  DatosTrasladosForm: FormGroup;
  public idcargo: string;
  usuario : any;

   constructor(private alarma: SweetAlertService,
              private _getarchivousecase: GetArchivoUseCaseService,
              private route: ActivatedRoute,
              private _storageservice: StorageService,
              private _router : Router,) { 
    this.formInit();
  }

  ngOnInit(): void {
    this.usuario = this._storageservice.getItem('payload').infoUsuario;
  }

  formInit(){

    this.DatosTrasladosForm = new FormGroup({
      nrotransaccion: new FormControl('', [Validators.required]),
      nrooperacion: new FormControl('', [Validators.required]),
      observacionsebra: new FormControl(''),
      observacionconfirmacion: new FormControl(''),
      });

      this.idcargo = this.route.snapshot.params['id'];

  }

  onSubmit(){


    if (!this.DatosTrasladosForm.invalid) {

      Swal.fire({
        title: 'Esta seguro que desea Guardar estos Datos?',
        text: "No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Rechazarlo!',
        cancelButtonText: "Cancelar",
        allowOutsideClick:false,
      }).then((result) => {
        if (result.isConfirmed) {


      const{nrotransaccion,nrooperacion,observacionsebra,observacionconfirmacion} = this.DatosTrasladosForm.value;

      var observacionS = observacionsebra;
      var observacionC = observacionconfirmacion;
      
      if(observacionS == '' || observacionS == null)
      {
        observacionS = 'undefined';
      }

      if(observacionC == '' || observacionC == null)
      {
        observacionC = 'undefined';
      }

      Swal.fire({
        title: 'Espere por favor, Guardando Datos',
        allowOutsideClick:false,
        didOpen: () => {
            Swal.showLoading()
          }
        });

        debugger;

        const data:any = {
          idCargue: this.idcargo,
          idusuario: this.usuario.idUsuario,
          nroOperacion:nrooperacion,
          nroTransacion:nrotransaccion,
          observacionSebra: observacionS,
          observacionConfirmacion:observacionC,
          tipo: 'TRANSACCION'
        };  

      this._getarchivousecase.RegistrarActualizarDatosOrdenTesoreroTraslado(data).subscribe((ResponseData) => {
          Swal.close()
          this.alarma.showSuccess("Guardado exitosamente");
          this._router.navigate([`/autorizacion-cargues`]);
        },  (error: any)  => {
          console.log(error.error.mensaje);
          Swal.close();
          this.alarma.showError(error.error.mensaje)
        });
        
        }
    })

    }
    else{
      this.alarma.showWarning("Información incompleta, por favor verifique");
    }
  }

}
