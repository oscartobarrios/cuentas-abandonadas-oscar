import { environment } from './../../../../../environments/environment.pruebas';
import { NotificationsService } from './../../../shared/services/notifications.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GetArchivoUseCaseService } from './../../../../domain/usecases/archivo/get-archivo-use-case.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IConsolidado } from 'src/app/domain/models/archivo/iconsolidado';
import { IDetallado } from 'src/app/domain/models/archivo/idetallado';
import { GetEntidadUseCaseService } from 'src/app/domain/usecases/entidad/get-entidad-use-case.service';

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
    })
   
  }

  ngOnInit(): void {
    this._entidadUseCase.ListadoEntidades().subscribe(res => {
      console.log("Entidades:", res);
      this.entidades = res;
    });
  }

  buscar() {
    const preloader = this._notifications.showPreloader();
    if(this.type === "administradas" && this.entidad != "")
    {
      this._getarchivousecase.GetConsolidadoXEntidad('TRASLADO', 'PENDIENTE_AUTORIZACION', this.entidad)
          .subscribe(res => {
            this.consolidadosDataSource.data = res,
            this.consolidadosDataSource.paginator = this.paginator;
            preloader.close();
          });
    }

    if(this.type == "valoracion")
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
      this._getarchivousecase.GetConsolidado('VALORACION', 'CARGA_PROCESADA', this.entidad, this.fechaFin, this.fechaFin)
        .subscribe(res => {
          this.consolidadosDataSource.data = res,
          this.consolidadosDataSource.paginator = this.paginator;
          preloader.close();
        });
    }
    if(this.type == "reintegro")
    {
      this._getarchivousecase.GetConsolidado('REINTEGRO', 'CARGA_PROCESADA', this.entidad, this.fechaInicio, this.fechaFin)
        .subscribe(res => {
          this.consolidadosDataSource.data = res,
          this.consolidadosDataSource.paginator = this.paginator;
          preloader.close();
        });
    }
    if(this.type == "cesion" && this.entidad != "")
    {
      this._getarchivousecase.GetConsolidadoXEntidad('CESION', 'CARGA_PROCESADA', this.entidad)
        .subscribe(res => {
          this.consolidadosDataSource.data = res,
          this.consolidadosDataSource.paginator = this.paginator;
          preloader.close();
        });
    }      

    if(this.type === "administradas" && this.fechaInicio != "")
    {
      this._getarchivousecase.GetConsolidadoXFechaCargue('TRASLADO', 'PENDIENTE_AUTORIZACION', this.fechaInicio, this.fechaFin)
          .subscribe(res => {
            this.consolidadosDataSource.data = res,
            this.consolidadosDataSource.paginator = this.paginator;
            preloader.close();
          });
    }

    
    if(this.type == "cesion" && this.fechaInicio != "")
    {
      this._getarchivousecase.GetConsolidadoXFechaCargue('CESION', 'CARGA_PROCESADA', this.fechaInicio, this.fechaFin)
        .subscribe(res => {
          this.consolidadosDataSource.data = res,
          this.consolidadosDataSource.paginator = this.paginator;
          preloader.close();
        });
    }   
  }
}
