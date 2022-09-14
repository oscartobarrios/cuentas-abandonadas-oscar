import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GetArchivoUseCaseService } from 'src/app/domain/usecases/archivo/get-archivo-use-case.service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';
import { StorageService } from 'src/app/presentation/shared/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-datos-reintegro-tesorero',
  templateUrl: './datos-reintegro-tesorero.component.html',
  styleUrls: ['./datos-reintegro-tesorero.component.css']
})
export class DatosReintegroTesoreroComponent implements OnInit {

  DatosReintegroForm: FormGroup;
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
    this.idcargo = this.route.snapshot.params['id'];
  }

  
  formInit(){

    this.DatosReintegroForm = new FormGroup({
      nroperacioncud: new FormControl('', [Validators.required]),
      observacion: new FormControl(''),
      observacionAutorizacion: new FormControl(''),
      });
  }

  onSubmit(){
    if (!this.DatosReintegroForm.invalid) {

      Swal.fire({
        title: '¿Está seguro que desea guardar estos datos?',
        text: "Una vez guradado no se podrá revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Guardar',
        cancelButtonText: "Cancelar",
        allowOutsideClick:false,
      }).then((result) => {
        if (result.isConfirmed) {

      const{nroperacioncud,observacion,observacionAutorizacion} = this.DatosReintegroForm.value;

      var observacionreintegro = observacion;
      var observacionaut = observacionAutorizacion;

      if(nroperacioncud.toString().length > 15)
      {
        this.alarma.showError("El número de operación CUD debe ser menor o igual a 15 caracteres numéricos");
        return;
      }

      if(observacion == '')
      {
        observacionreintegro = 'undefined';
      }

      if(observacionAutorizacion == '')
      {
        observacionaut = 'undefined';
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
          observacionReintegro:observacionreintegro,
          observacionAutorizacion: observacionaut,
          tipo: 'REINTEGRO'
        }; 


        this._getarchivousecase.RegistrarActualizarDatosOrdenTesoreroReintegro(data).subscribe((ResponseData) => {
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
