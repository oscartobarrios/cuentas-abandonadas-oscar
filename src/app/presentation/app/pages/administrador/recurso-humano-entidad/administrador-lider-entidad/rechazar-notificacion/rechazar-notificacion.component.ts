import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GetAdministrativoService } from 'src/app/domain/usecases/administrativo/administrativo.service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';
import { StorageService } from 'src/app/presentation/shared/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rechazar-notificacion',
  templateUrl: './rechazar-notificacion.component.html',
  styleUrls: ['./rechazar-notificacion.component.css']
})
export class RechazarNotificacionComponent implements OnInit {

  reactiveForm: FormGroup;
  idNotificacion: string;
  usuario: string;

  constructor(private _storageservice: StorageService,
              private _router : Router,
              private route: ActivatedRoute,
              private alarma: SweetAlertService,
              private _servicioAdministrativo: GetAdministrativoService,) {

    this.reactiveForm = new FormGroup({
      observacion: new FormControl('', [Validators.required])
      });
   }

  ngOnInit(): void {
    this.idNotificacion = this.route.snapshot.params['id'];
    this.usuario = this.route.snapshot.params['usuario'];
  }

  onSubmit(){

    if (!this.reactiveForm.invalid) {

      Swal.fire({
        title: 'Esta seguro que desea rechazar la notificación?',
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

          Swal.fire({
            title: 'Espere por favor, Actualizando notificación',
            allowOutsideClick:false,
            didOpen: () => {
                Swal.showLoading()
              }
            });


          const{observacion} = this.reactiveForm.value;

          const data = {
            idNotificacion: this.idNotificacion,
            estado: "RECHAZADO",
            observacionRechazo: observacion,
            usuario: this.usuario,
          };
  
  
          this._servicioAdministrativo.ActualizarEstadoNotificacionLider(data).subscribe((ResponseData) => {
            Swal.close()
            this.alarma.showSuccess("notificación rechazada exitosamente");
            this._router.navigate([`/entidad-financiera`]);
  
          },  (error: any)  => {
            console.log(error);
            Swal.close();
            this.alarma.showError(error.error.mensaje);
  
          });


        }
      })

    }else{
      this.alarma.showWarning("Información incompleta, por favor verifique");
    }

  }
}
