import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IEntidad } from 'src/app/domain/models/administrativo/ientidad';
import { GetAdministrativoService } from 'src/app/domain/usecases/administrativo/administrativo.service';
import { NotificationsService } from 'src/app/presentation/shared/services/notifications.service';

@Component({
  selector: 'app-listar-entidades',
  templateUrl: './listar-entidades.component.html',
  styleUrls: ['./listar-entidades.component.css']
})
export class ListarEntidadesComponent implements OnInit {

  displayedColumns: string[] = ['Nit', 'Nombre','Direccion','Telefono','Actions'];
  dataSource = new MatTableDataSource<IEntidad>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private _servicioAdministrativo: GetAdministrativoService,
              private _notifications: NotificationsService) { }

  ngOnInit(): void {
    const preloader = this._notifications.showPreloader();
    this._servicioAdministrativo.ListarEntidades().subscribe((ResultData) => {

      console.log(ResultData);
      this.dataSource.data = ResultData;
      this.dataSource.paginator = this.paginator;
      preloader.close();
    });
  }

}
