import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IFuncionario } from 'src/app/domain/models/administrativo/iFuncionario';
import { GetAdministrativoService } from 'src/app/domain/usecases/administrativo/administrativo.service';
import { NotificationsService } from 'src/app/presentation/shared/services/notifications.service';

@Component({
  selector: 'app-listar-funcionarios',
  templateUrl: './listar-funcionarios.component.html',
  styleUrls: ['./listar-funcionarios.component.css']
})
export class ListarFuncionariosComponent implements OnInit {

  displayedColumns: string[] = ['Nombre', 'Cargo','Actions'];
  dataSource = new MatTableDataSource<IFuncionario>();
  idOrganizacion: any;
  usuario:any;
  ip: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _servicioAdministrativo: GetAdministrativoService,
              private _notifications: NotificationsService) {
   }

  ngOnInit(): void {
    const preloader = this._notifications.showPreloader();
    this._servicioAdministrativo.ListarFuncionarios().subscribe((ResultData) => {

      console.log(ResultData);
      this.dataSource.data = ResultData;
      this.dataSource.paginator = this.paginator;
      preloader.close();
    });
  }

 
}
