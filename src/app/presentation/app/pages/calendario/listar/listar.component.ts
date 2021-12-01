import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ICalendario } from 'src/app/domain/models/calendario/calendario';
import { ICalendarios } from 'src/app/domain/models/calendario/calendarios';
import { NotificationsService } from 'src/app/presentation/shared/services/notifications.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarCalendarioComponent implements OnInit {
  tipos = new MatTableDataSource<ICalendarios>();
  calendarios = new MatTableDataSource<ICalendario>();
  archivos: ICalendarios[]=[
    {nombre:"CESION",descripcion:"Archivo de cargue de cesiones cuentas abandonadas"},
    {nombre:"REINTEGRO",descripcion:"Archivo de cargue de reintegros cuentas abandonadas"},
    {nombre:"TRASLADO",descripcion:"Archivo de cargue de traslado cuentas abandonadas"},
    {nombre:"VALORACION",descripcion:"Archivo de cargue de valoracion cuentas abandonadas"},
  ];
  displayedColumns: string[] = ['nombre','configuracion'];
  displayedColumnsConf: string[] = ['fechaDesde','fechaHasta','fechaInicial','fechaFinal'];
  constructor(private _notifications: NotificationsService) { }

  ngOnInit(): void {
    //const preloader = this._notifications.showPreloader();
    this.tipos.data = this.archivos;
    
    //preloader.close();
  }

}
