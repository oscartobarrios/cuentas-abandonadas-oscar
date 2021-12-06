import { Component, OnInit, QueryList, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ICalendario } from 'src/app/domain/models/calendario/calendario';
import { ICalendarios } from 'src/app/domain/models/calendario/calendarios';
import { GetCalendarioUseCaseService } from 'src/app/domain/usecases/calendario/get-calendario-use-case-service';
import { NotificationsService } from 'src/app/presentation/shared/services/notifications.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarCalendarioComponent implements OnInit {
  tipos = new MatTableDataSource<ICalendarios>();
  calendarios = new MatTableDataSource<ICalendario>();
  @ViewChild(MatPaginator) MatPaginatorValoracion: MatPaginator;
  archivos: ICalendarios[] = [
    { nombre: "CESION", descripcion: "Archivo de cargue de cesiones cuentas abandonadas" },
    { nombre: "REINTEGRO", descripcion: "Archivo de cargue de reintegros cuentas abandonadas" },
    { nombre: "TRASLADO", descripcion: "Archivo de cargue de traslado cuentas abandonadas" },
    { nombre: "VALORACION", descripcion: "Archivo de cargue de valoracion cuentas abandonadas" },
  ];

  calendariosCargueValoracion: ICalendario[] = [
    { fechaDesde: new Date(""), fechaHasta: new Date("10/12/2021"), fechaInicial: new Date("01/12/2021"), fechaFinal: new Date("30/12/2021"), uvr: 0, idTipoCargue: 2354 }
  ];

  calendariosCargueReintegro: ICalendario[] = [
    //{fechaDesde: new Date("01/01/2021"), fechaHasta:new Date(""), fechaInicial:new Date(""), fechaFinal:new Date(""),uvr: 0,idCargue: 2354}
  ];
  calendariosCargueTraslado: ICalendario[] = [
    //{fechaDesde: new Date("01/01/2021"), fechaHasta:new Date(""), fechaInicial:new Date(""), fechaFinal:new Date(""),uvr: 0,idCargue: 2354}
  ];
  calendariosCargueCesion: ICalendario[] = [
    //{fechaDesde: new Date("01/01/2021"), fechaHasta:new Date(""), fechaInicial:new Date(""), fechaFinal:new Date(""),uvr: 0,idCargue: 2354}
  ];

  displayedColumns: string[] = ['nombre', 'configuracion'];
  displayedColumnsConf: string[] = ['fechaDesde', 'fechaHasta', 'fechaInicial', 'fechaFinal'];
  constructor(private _notifications: NotificationsService,
    private _getCalendarioUseCaseService: GetCalendarioUseCaseService,
    private _router: Router
  ) { 
    

  }

  ngAfterViewInit() {
    this.calendarios.paginator = this.MatPaginatorValoracion;
}
  ngOnInit(): void {
    const preloader = this._notifications.showPreloader();
    this.tipos.data = this.archivos;
    this._getCalendarioUseCaseService.ListarCalendarios().pipe(map((response) => response))
      .subscribe((array: ICalendario[]) => {
        let modifiedArray = array.map((item: ICalendario) => {

          return {
            idTipoCargue: item.idTipoCargue,
            fechaDesde: item.fechaDesde,
            fechaHasta: item.fechaHasta,
            uvr: item.uvr,
            fechaInicial: item.fechaInicial,
            fechaFinal: item.fechaFinal,
          }
        })
        this.calendariosCargueValoracion = modifiedArray;
        this.calendarios.data = this.calendariosCargueValoracion;
        
        preloader.close();
        
      });
  }
}
