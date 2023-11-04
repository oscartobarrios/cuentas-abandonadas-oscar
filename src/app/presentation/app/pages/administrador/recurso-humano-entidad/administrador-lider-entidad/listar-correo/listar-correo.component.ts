import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GetAdministrativoService } from 'src/app/domain/usecases/administrativo/administrativo.service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';
import { NotificationsService } from 'src/app/presentation/shared/services/notifications.service';
import { StorageService } from 'src/app/presentation/shared/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-correo',
  templateUrl: './listar-correo.component.html',
  styleUrls: ['./listar-correo.component.css']
})
export class ListarCorreoComponent implements OnInit {
  usuario : any;
  displayedColumns: string[] = ['Entidad','Estado','Fecha','Actions'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private _servicioAdministrativo: GetAdministrativoService,
              private _notifications: NotificationsService,
              private _storageservice: StorageService,
              private alarma: SweetAlertService,
              private _router : Router) { }

  ngOnInit(): void {
    this.usuario = this._storageservice.getItem('payload').infoUsuario;
    const preloader = this._notifications.showPreloader();
    this._servicioAdministrativo.ListarNotificacionesLiderEntidad().subscribe((ResultData) => {

      console.log(ResultData);
      this.dataSource.data = ResultData;
      this.dataSource.paginator = this.paginator;
      preloader.close();
    });
  }

  aprobar(idNotificacion:number,usuario: string){
    
    Swal.fire({
      title: 'Esta seguro que desea aprobar la notificación?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Aprobarlo!',
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

        const data = {
          idNotificacion: idNotificacion,
          estado: "APROBADO",
          usuario: usuario,
        };


        this._servicioAdministrativo.ActualizarEstadoNotificacionLider(data).subscribe((ResponseData) => {
          Swal.close()
          this.alarma.showSuccess("notificación aprobada exitosamente");
          this._router.navigate([`/entidad-financiera`]);

        },  (error: any)  => {
          console.log(error);
          Swal.close();
          this.alarma.showError(error.error.mensaje);

        });

      }

    });
  }


  rechazar(idNotificacion:number,usuario:string){
    this._router.navigate([`/autorizacion-rechazo-lider-entidad/${idNotificacion}/${usuario}`]);

  }

}
