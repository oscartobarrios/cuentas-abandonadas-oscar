import { environment } from './../../../../../environments/environment.pruebas';
import { NotificationsService } from './../../../shared/services/notifications.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GetArchivoUseCaseService } from './../../../../domain/usecases/archivo/get-archivo-use-case.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IConsolidado } from 'src/app/domain/models/archivo/iconsolidado';
import { IDetallado } from 'src/app/domain/models/archivo/idetallado';
import { GetEntidadUseCaseService } from 'src/app/domain/usecases/entidad/get-entidad-use-case.service';
import { Page } from '../../interfaces/page';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { GetReporteService } from 'src/app/domain/usecases/reportes/get-reporte.service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';

@Component({
  selector: 'app-consolidados',
  templateUrl: './consolidados.component.html',
  styleUrls: ['./consolidados.component.css']
})
export class ConsolidadosComponent implements OnInit {
  
  @ViewChild('numberTemplate', { static: true }) numberTemplate: TemplateRef<any>;
  @ViewChild('monedaTemplate', { static: true }) monedaTemplate: TemplateRef<any>;

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

  // Variables NgxTable
  public pagination = [10, 20, 30, 40, 50, 60];
  public page = new Page();
  public rows = new Array<any>();
  public columnMode = ColumnMode;
  public dataQuery: IDetallado[] = [];
  public resultSearch = false;
  public columns = [];
  public resultadosBusqueda: any[] = [];
  public nombreArchivo = 'Consolidado.xlsx';
  
  constructor(private _route: ActivatedRoute,
              private _entidadUseCase: GetEntidadUseCaseService,
              private _getarchivousecase: GetArchivoUseCaseService,
              private _notifications: NotificationsService,
              private _getreportecase: GetReporteService,
              private alarma: SweetAlertService
              ) 
  { 
    this._route.params.subscribe(params => {
      this.type = params.type;
      this.setDefaultValues();
    })
   
  }

  ngOnInit(): void {
    this.columns = [
      { prop: 'nombre', name: 'Entidad financiera' },
      { prop: 'tipoArchivo', name: 'Tipo archivo' },
      { prop: 'fechaCargue', name: 'FechaCargue' },
      { prop: 'nroCuentas', name: 'Número cuentas' },
      { prop: 'totalSaldoInicial', name: 'Total saldo inicial', cellTemplate: this.monedaTemplate },
      { prop: 'remuneracion', name: 'Total remuneración período', cellTemplate: this.monedaTemplate },
      { prop: 'totalRemuneracionAcumulada', name: 'Total remuneración acumulada', cellTemplate: this.monedaTemplate },
      { prop: 'tasaPonderada', name: 'Tasa ponderada', cellTemplate: this.numberTemplate }   

    ];

    // Establecer la página de inicio de la tabla en 1
    this.setPage({ offset: 0 });
  }

  // Conulta de registros
  consultarRegistros(): void {
    var init = this.fechaInicio;

    if(!this.fechaInicio || !this.fechaFin){
      this.alarma.showWarning("Debe seleccionar un rango de fechas para realizar la consulta");
    }else{
      const preloader = this._notifications.showPreloader();
      this._getarchivousecase.GetConsolidadoFilter(this.page)
        .subscribe(res => {
          this.configurarTablaConRespuesta(res);
          preloader.close();
        });
    }
   
  }

  setDefaultValues() {
    if(this.type == "valoracion")
    {
      this.tipoConsolidado = "valoración";
    }
    
    this._entidadUseCase.ListadoEntidades().subscribe(res => {
      this.entidades = res;
    });
    
    this.page.pageNumber = 1;
    this.page.size = 10;
    this.page.totalElements = 0;
  }

  buscar() {
    if(this.type === "administradas" && this.entidad != "")
    {
      this._getarchivousecase.GetConsolidadoXEntidad('TRASLADO', 'PENDIENTE_AUTORIZACION', this.entidad)
          .subscribe(res => {
            this.consolidadosDataSource.data = res,
            this.consolidadosDataSource.paginator = this.paginator;
          });
    }

    if(this.type == "valoracion")
    {
      this.tipoConsolidado = "valoración";

      
      this.setPage({ offset: 0 });
      this.page.data = {
        "entidad": this.entidad,
        "tipoArchivo": "VALORACION",
        "fechaInicial": this.fechaInicio,
        "fechaFinal": this.fechaFin
      };
      this.consultarRegistros()
    }
    if(this.type == "reintegro")
    {
      this._getarchivousecase.GetConsolidado('REINTEGRO', 'CARGA_PROCESADA', this.entidad, this.fechaInicio, this.fechaFin)
        .subscribe(res => {
          this.consolidadosDataSource.data = res,
          this.consolidadosDataSource.paginator = this.paginator;

        });
    }
    if(this.type == "cesion" && this.entidad != "")
    {
      this._getarchivousecase.GetConsolidadoXEntidad('CESION', 'CARGA_PROCESADA', this.entidad)
        .subscribe(res => {
          this.consolidadosDataSource.data = res,
          this.consolidadosDataSource.paginator = this.paginator;

        });
    }      

    if(this.type === "administradas" && this.fechaInicio != "")
    {
      this._getarchivousecase.GetConsolidadoXFechaCargue('TRASLADO', 'PENDIENTE_AUTORIZACION', this.fechaInicio, this.fechaFin)
          .subscribe(res => {
            this.consolidadosDataSource.data = res,
            this.consolidadosDataSource.paginator = this.paginator;
     
          });
    }

    
    if(this.type == "cesion" && this.fechaInicio != "")
    {
      this._getarchivousecase.GetConsolidadoXFechaCargue('CESION', 'CARGA_PROCESADA', this.fechaInicio, this.fechaFin)
        .subscribe(res => {
          this.consolidadosDataSource.data = res,
          this.consolidadosDataSource.paginator = this.paginator;
      
        });
    }   
  }

  // Configuración de la tabla con respuesta
  private configurarTablaConRespuesta(modelo: any): void {
    //this.loadingService.loadingOff();
    this.resultSearch = true;
    this.dataQuery = modelo.data;
    this.rows = modelo.data;
    this.definirValoresPagina(modelo);
    if (this.rows === null || this.rows.length === 0) {
      this.resultSearch = false;
    }
  }
  // definicion de valores del paginador
  private definirValoresPagina(values): void {
    this.page.pageNumber = values.pageNumber;
    this.page.size = values.size;
    this.page.totalElements = values.totalElements;
    this.page.totalPages = values.totalPages;
  }

  public setPage(pageInfo: any, fromPagination?: boolean) {
    this.page.pageNumber = pageInfo.offset;
    if (this.page.data && fromPagination) this.consultarRegistros();
  }

  descargarExcel(){
    const preloader = this._notifications.showPreloader();
    this.page.data = {
      "entidad": this.entidad,
      "tipoArchivo": "VALORACION",
      "fechaInicial": this.fechaInicio,
      "fechaFinal": this.fechaFin
    };
    this._getreportecase.getReporteConsolidadoExcel(this.page.data).subscribe(response => {
      
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(response);
      downloadLink.setAttribute('download', this.nombreArchivo);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      preloader.close();
    })
  }

}
