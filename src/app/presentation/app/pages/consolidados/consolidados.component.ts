import { environment } from './../../../../../environments/environment.pruebas';
import { NotificationsService } from './../../../shared/services/notifications.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GetArchivoUseCaseService } from './../../../../domain/usecases/archivo/get-archivo-use-case.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IConsolidado } from 'src/app/domain/models/archivo/iconsolidado';

@Component({
  selector: 'app-consolidados',
  templateUrl: './consolidados.component.html',
  styleUrls: ['./consolidados.component.css']
})
export class ConsolidadosComponent implements OnInit {
  tipoConsolidado = "";
  consolidadosDataSource = new MatTableDataSource<IConsolidado>();
  displayedColumns: string[] = [];
  urlReporteConsolidado: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private _route: ActivatedRoute,
              private _getarchivousecase: GetArchivoUseCaseService,
              private _notifications: NotificationsService) { 
    this._route.params.subscribe(params => {
      this.setConsolidados(params.type)
    })
  }

  ngOnInit(): void {
  }

  setConsolidados(type:string){
    const preloader = this._notifications.showPreloader();
    if(type === "administradas")
    {
      this.tipoConsolidado = "administradas";
      this.displayedColumns = [   'EntidadFinanciera',
                                  'TipoArchivo',
                                  'FechaTraslado',
                                  'FechaCorte',
                                  'NumeroCuentas',
                                  'TotalTraslados',
                                  'TasaPonderada'];
      this.urlReporteConsolidado = `${environment.rest.endpoint}/Cargue/GetConsolidadoExcel/TRASLADO/PENDIENTE_AUTORIZACION`;
      this._getarchivousecase.GetConsolidado('TRASLADO', 'PENDIENTE_AUTORIZACION')
          .subscribe(res => {
            this.consolidadosDataSource.data = res,
            this.consolidadosDataSource.paginator = this.paginator;
            preloader.close();
          });
    }

    if(type == "valoracion")
    {
      this.tipoConsolidado = "valoración";
      this.displayedColumns = [   'EntidadFinanciera',
                                  'TipoArchivo',
                                  'NumeroCuentas',
                                  'TotalSaldoInicial',
                                  'TotalRemuneracionPeriodo',
                                  'TotalRemuneracionAcumulada',
                                  'TasaPonderada'];
      this.urlReporteConsolidado = `${environment.rest.endpoint}/Cargue/GetConsolidadoExcel/VALORACION/CARGA_PROCESADA`;
      this._getarchivousecase.GetConsolidado('VALORACION', 'CARGA_PROCESADA')
        .subscribe(res => {
          this.consolidadosDataSource.data = res,
          this.consolidadosDataSource.paginator = this.paginator;
          preloader.close();
        });
    }
  }
}
