import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GetArchivoUseCaseService } from 'src/app/domain/usecases/archivo/get-archivo-use-case.service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';
import { StorageService } from 'src/app/presentation/shared/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-datos-sebra',
  templateUrl: './datos-sebra.component.html',
  styleUrls: ['./datos-sebra.component.css']
})
export class DatosSebraComponent implements OnInit {

  DatosSebraForm: FormGroup;
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
    this.idcargo = this.route.snapshot.params['id'];
    this.usuario = this._storageservice.getItem('payload').infoUsuario;
  }

  formInit(){

    this.DatosSebraForm = new FormGroup({
      nroperacioncud: new FormControl('', [Validators.required]),
      observacion: new FormControl(''),
      
      });
  }

  onSubmit(){
    if (!this.DatosSebraForm.invalid) {
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


      const{nroperacioncud,observacion} = this.DatosSebraForm.value;

      var observacion2 = observacion;
      
      if(observacion == '')
      {
        observacion2 = 'undefined';
      }

      Swal.fire({
        title: 'Espere por favor, Guardando Datos',
        allowOutsideClick:false,
        didOpen: () => {
            Swal.showLoading()
          }
        });

        debugger;

        if(this.idcargo == "0"){ //para seleccionar todos
          this._getarchivousecase.RegistrarActualizarDatosOrdenSebraTodos(this.usuario.idUsuario,nroperacioncud,observacion2).subscribe((ResponseData) => {
            Swal.close()
            this.alarma.showSuccess("Guardado exitosamente");
            this._router.navigate([`/autorizacion-cargues`]);
          },  (error: any)  => {
            console.log(error.error.mensaje);
            Swal.close();
            this.alarma.showError(error.error.mensaje)
          });

        }else{ // uno por uno
          this._getarchivousecase.RegistrarActualizarDatosOrdenSebra(this.idcargo,this.usuario.idUsuario,nroperacioncud,observacion2).subscribe((ResponseData) => {
            Swal.close()
            this.alarma.showSuccess("Guardado exitosamente");
            this._router.navigate([`/autorizacion-cargues`]);
          },  (error: any)  => {
            console.log(error.error.mensaje);
            Swal.close();
            this.alarma.showError(error.error.mensaje)
          });
        }


      }
    })

    }
    else{
      this.alarma.showWarning("Información incompleta, por favor verifique");
    }
  }


}
