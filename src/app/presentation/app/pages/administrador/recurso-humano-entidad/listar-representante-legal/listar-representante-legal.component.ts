import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GetAdministrativoService } from 'src/app/domain/usecases/administrativo/administrativo.service';
import { NotificationsService } from 'src/app/presentation/shared/services/notifications.service';
import { StorageService } from 'src/app/presentation/shared/services/storage.service';

@Component({
  selector: 'app-listar-representante-legal',
  templateUrl: './listar-representante-legal.component.html',
  styleUrls: ['./listar-representante-legal.component.css']
})
export class ListarRepresentanteLegalComponent implements OnInit {
  usuario : any;
  displayedColumns: string[] = ['NombreEntidad','TipoIdentificacion','Identificacion','PrimerNombre', 'SegundoNombre','PrimerApellido','segundoApellido','Telefono','Direccion','Actions'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input('identidad') identidad: string;

  constructor(private _servicioAdministrativo: GetAdministrativoService,
              private _notifications: NotificationsService,
              private _storageservice: StorageService) { }

  ngOnInit(): void {
    this.usuario = this._storageservice.getItem('payload').infoUsuario;
    const preloader = this._notifications.showPreloader();

    if(this.usuario.idPerfil == "4")
    {
      this._servicioAdministrativo.ListarFuncionarioEntidadPorTipo("LEGAL").subscribe((ResultData) => {

        this.dataSource.data = ResultData;
        this.dataSource.paginator = this.paginator;
        preloader.close();
      });
    }

    if(this.usuario.idPerfil == "5" || this.usuario.idPerfil == "9")
    {
      this._servicioAdministrativo.ListarFuncionarioEntidadPorTipoIdOrganizacion("LEGAL",this.identidad).subscribe((ResultData) => {

        this.dataSource.data = ResultData;
        this.dataSource.paginator = this.paginator;
        preloader.close();
      });
    }

  }

}
