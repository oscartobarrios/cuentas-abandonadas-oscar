import { environment } from './../../../../../environments/environment.pruebas';
import { NotificationsService } from './../../../shared/services/notifications.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GetArchivoUseCaseService } from './../../../../domain/usecases/archivo/get-archivo-use-case.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IDetallado } from 'src/app/domain/models/archivo/idetallado';
import { GetEntidadUseCaseService } from 'src/app/domain/usecases/entidad/get-entidad-use-case.service';

@Component({
  selector: 'app-detallados',
  templateUrl: './detallados.component.html',
  styleUrls: ['./detallados.component.css']
})
export class DetalladosComponent implements OnInit {
  tipoDetallado = "";
  detalladosDataSource = new MatTableDataSource<IDetallado>();
  displayedColumns: string[] = [];
  urlReporteDetallado: string;
  entidades:any;
  entidad: string;
  fechaInicio: string;
  fechaFin: string;
  type: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private _route: ActivatedRoute,
              private _entidadUseCase: GetEntidadUseCaseService,
              private _getarchivousecase: GetArchivoUseCaseService,
              private _notifications: NotificationsService,
              ) { 
    this._route.params.subscribe(params => {
      this.type = params.type;
      this.setDetallados(params.type)
    })
    this._entidadUseCase.ListadoEntidades().subscribe(res => {
      console.log("Entidades:", res);
      this.entidades = res;
    });
  }

  ngOnInit(): void {
  }

  buscar() {
    const preloader = this._notifications.showPreloader();
    if(this.type === "administradas" && this.entidad != "")
    {
      this._getarchivousecase.GetConsolidadoXEntidad('TRASLADO', 'PENDIENTE_AUTORIZACION', this.entidad)
          .subscribe(res => {
            this.detalladosDataSource.data = res,
            this.detalladosDataSource.paginator = this.paginator;
            preloader.close();
          });
    }

    if(this.type == "valoracion" && this.entidad != "")
    {
      this._getarchivousecase.GetConsolidadoXEntidad('VALORACION', 'CARGA_PROCESADA', this.entidad)
        .subscribe(res => {
          this.detalladosDataSource.data = res,
          this.detalladosDataSource.paginator = this.paginator;
          preloader.close();
        });
    }

    if(this.type === "administradas" && this.fechaInicio != "")
    {
      this._getarchivousecase.GetDetallado(this.entidad, 'TRASLADO', this.fechaInicio, this.fechaFin)
          .subscribe(res => {
            this.detalladosDataSource.data = res,
            this.detalladosDataSource.paginator = this.paginator;
            preloader.close();
          });
    }

    if(this.type == "valoracion" && this.fechaInicio != "")
    {
      this._getarchivousecase.GetDetallado(this.entidad,'VALORACION', this.fechaInicio, this.fechaFin)
        .subscribe(res => {
          this.detalladosDataSource.data = res,
          this.detalladosDataSource.paginator = this.paginator;
          preloader.close();
        });
    }
  }

  setDetallados(type:string){
    const preloader = this._notifications.showPreloader();
    if(type === "administradas")
    {
      this.tipoDetallado = "administradas";
      this.displayedColumns = [   'EntidadFinanciera',                               
                                  'FechaTraslado',
                                  'FechaCorte',
                                  'NumeroCuentas',
                                  'TotalTraslados',
                                  'TasaPonderada'];
      this.urlReporteDetallado = `${environment.rest.endpoint}/Cargue/GetConsolidadoExcel/TRASLADO`;
      this._getarchivousecase.GetDetallado(this.entidad, 'TRASLADO', this.fechaInicio, this.fechaFin)
          .subscribe(res => {
            this.detalladosDataSource.data = res,
            this.detalladosDataSource.paginator = this.paginator;
            preloader.close();
          });
    }

    if(type == "valoracion")
    {
      this.tipoDetallado = "valoración";
      this.displayedColumns = [   'EntidadFinanciera',
                                  'NumeroCuentas',
                                  'TotalSaldoInicial',
                                  'TotalRemuneracionPeriodo',
                                  'TotalRemuneracionAcumulada',
                                  'TasaPonderada'];
      this.urlReporteDetallado = `${environment.rest.endpoint}/Cargue/GetDetalladoExcel/VALORACION`;
      this._getarchivousecase.GetDetallado(this.entidad, 'VALORACION', this.fechaInicio, this.fechaFin)
        .subscribe(res => {
          this.detalladosDataSource.data = res,
          this.detalladosDataSource.paginator = this.paginator;
          preloader.close();
        });
    }
  }
}
