import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ICalendario } from 'src/app/domain/models/calendario/calendario';
import { GetCalendarioUseCaseService } from 'src/app/domain/usecases/calendario/get-calendario-use-case-service';
import { NotificationsService } from 'src/app/presentation/shared/services/notifications.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarCalendarioComponent implements OnInit {
  calendarios = new MatTableDataSource<ICalendario>();

  @ViewChild('MatPaginatorCesion') MatPaginatorCesion: MatPaginator;
  @ViewChild('MatPaginatorSubasta') MatPaginatorSubasta: MatPaginator;
  

  @ViewChild('MatPaginatorReintegro') MatPaginatorReintegro: MatPaginator;

  @ViewChild('MatPaginatorTraslado') MatPaginatorTraslado: MatPaginator;
  @ViewChild('MatPaginatorValoracion') MatPaginatorValoracion: MatPaginator;
  @ViewChild('MatPaginatorCuenta') MatPaginatorCuenta: MatPaginator;


  calendariosCargueCesion = new MatTableDataSource<ICalendario>();
  calendariosCargueReintegro = new MatTableDataSource<ICalendario>();
  calendariosCargueTraslado = new MatTableDataSource<ICalendario>();
  calendariosCargueValoracion = new MatTableDataSource<ICalendario>();
  calendariosCargueCuenta = new MatTableDataSource<ICalendario>();
  calendariosCargueSubasta = new MatTableDataSource<ICalendario>();
  

  displayedColumns: string[] = ['nombre', 'configuracion'];
  displayedColumnsConf: string[] = ['fechaDesde', 'fechaHasta', 'fechaInicial', 'fechaFinal', 'idTipoCargue'];
  displayedColumnsConfTras: string[] = ['fechaDesde', 'fechaHasta','uvr','fechaTrasMon', 'idTipoCargue'];
  displayedColumnsConfRei: string[] = ['fechaDesde', 'fechaHasta', 'idTipoCargue'];
  displayedColumnsConfCes: string[] = ['fechaDesde', 'fechaHasta', 'idTipoCargue'];
  displayedColumnsConfCuenta: string[] = ['fechaDesde', 'fechaHasta','nombreOrganizacion', 'idTipoCargue'];
  displayedColumnsConfSub: string[] = ['fechaDesde', 'fechaHasta', 'idTipoCargue'];

  constructor(private _notifications: NotificationsService,
    private _getCalendarioUseCaseService: GetCalendarioUseCaseService,
    private _router: Router
  ) {


  }

  ngOnInit(): void {
    const preloader = this._notifications.showPreloader();
    this._getCalendarioUseCaseService.ListarCalendarios().pipe(map((cals: ICalendario[]) => {
      cals.map((cal) => {
        switch (cal.idTipoCargue){
          case 2: this.calendariosCargueCesion.data.push(cal);break;
          case 13560023: this.calendariosCargueReintegro.data.push(cal);break;
          case 2045: this.calendariosCargueValoracion.data.push(cal);break;
          case 1: this.calendariosCargueTraslado.data.push(cal);break;
          case 3: this.calendariosCargueCuenta.data.push(cal);break;
          case 4: this.calendariosCargueSubasta.data.push(cal);break;
          
        }
      })
      this.calendariosCargueCesion.paginator = this.MatPaginatorCesion;
      this.calendariosCargueSubasta.paginator = this.MatPaginatorSubasta;      
      this.calendariosCargueReintegro.paginator = this.MatPaginatorReintegro;
      this.calendariosCargueValoracion.paginator = this.MatPaginatorValoracion;
      this.calendariosCargueTraslado.paginator = this.MatPaginatorTraslado;
      this.calendariosCargueCuenta.paginator = this.MatPaginatorCuenta;

      preloader.close();
    })).subscribe()
  }
}
