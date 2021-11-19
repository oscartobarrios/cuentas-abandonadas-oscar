import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { ICargue } from './../../../../domain/models/archivo/icargue';
import { NotificationsService } from './../../../shared/services/notifications.service';
import { StorageService } from './../../../shared/services/storage.service';
import { GetArchivoUseCaseService } from './../../../../domain/usecases/archivo/get-archivo-use-case.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-autorizacion-cargues',
  templateUrl: './autorizacion-cargues.component.html',
  styleUrls: ['./autorizacion-cargues.component.css']
})
export class AutorizacionCarguesComponent implements OnInit {
  displayedColumns: string[] = ['Entidad', 'NombreArchivo', 'FechaCargue', 'TipoArchivo', 'NumeroCuentas', 'Estado', 'Acciones'];
  idOrganizacion: any;
  usuario : any;
  cargues = new MatTableDataSource<ICargue>();
  ip: any;
  @ViewChild(MatPaginator) paginator:  MatPaginator;

  constructor(private _getarchivousecase: GetArchivoUseCaseService,
              private _storageservice: StorageService,
              private _notifications: NotificationsService,
              private _http: HttpClient) { }

  ngOnInit(): void {
    this._http.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
     this.ip = res.ip;
    });

    this.usuario = this._storageservice.getItem('payload').infoUsuario;
    this.idOrganizacion = this.usuario.idOrganizacion;
    const preloader = this._notifications.showPreloader();
    this._getarchivousecase.Listar(this.idOrganizacion).subscribe((ResultData) => {
      this.cargues.data = ResultData;
      this.cargues.paginator = this.paginator;
      preloader.close();
    });
  }

  cambiarestado(idCargue:any, tipoestado:string): void{
    var mensajeestado = '';
    switch(tipoestado){
      case 'confirmar_entidad':
        mensajeestado = '¿ Esta seguro que desea aprobar el cargue ?';
        break;
      case 'rechazar_entidad':
        mensajeestado = '¿ Esta seguro que desea rechazar el cargue ?';
        break;
    }
    const validar = confirm(mensajeestado);
    if(validar){
      this._getarchivousecase.CambiarEstadoCargue({idCargue,
                                                      usuario: this.usuario.usuario,
                                                      ip: this.ip || '193.168.1.1',
                                                      operacion: tipoestado})
                              .subscribe((ResulData) =>{
                                alert(ResulData?.mensaje);
                                window.location.reload();
                              });
    }
  }

}
