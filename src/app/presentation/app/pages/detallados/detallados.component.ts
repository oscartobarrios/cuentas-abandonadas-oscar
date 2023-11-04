import { NotificationsService } from './../../../shared/services/notifications.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GetArchivoUseCaseService } from './../../../../domain/usecases/archivo/get-archivo-use-case.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { IDetallado } from 'src/app/domain/models/archivo/idetallado';
import { GetEntidadUseCaseService } from 'src/app/domain/usecases/entidad/get-entidad-use-case.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Page } from '../../interfaces/page';
import { FormGroup } from '@angular/forms';
import { GetReporteService } from 'src/app/domain/usecases/reportes/get-reporte.service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';


@Component({
  selector: 'app-detallados',
  templateUrl: './detallados.component.html',
  styleUrls: ['./detallados.component.css']
})
export class DetalladosComponent implements OnInit {

  @ViewChild('numberTemplate', { static: true }) numberTemplate: TemplateRef<any>;
  @ViewChild('monedaTemplate', { static: true }) monedaTemplate: TemplateRef<any>;
  @ViewChild('estadoTemplate', { static: true }) estadoTemplate: TemplateRef<any>;

  tipoDetallado = "";
  detalladosDataSource = new MatTableDataSource<IDetallado>();
  displayedColumns: string[] = [];
  urlReporteDetallado: string;
  entidades:any;
  entidad: string;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
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
  public nombreArchivo = 'Detallado.xlsx';


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

    if(this.type == "valoracion")
    {
      this.columns = [
        { prop: 'nombre', name: 'Entidad financiera' },
        { prop: 'fechaCargue', name: 'Fecha cargue' },
        { prop: 'nroCuenta', name: 'Número cuenta' },
        { prop: 'totalSaldoInicial', name: 'Saldo inicial', cellTemplate: this.monedaTemplate },
        { prop: 'remuneracion', name: 'Remuneración periodo', cellTemplate: this.monedaTemplate },
        { prop: 'totalRemuneracionAcumulada', name: 'Remuneración acumulada', cellTemplate: this.monedaTemplate },
        { prop: 'tasaPonderada', name: 'Tasa ponderada', cellTemplate: this.numberTemplate},
        { prop: 'fechaInicial', name: 'Fecha inicial' },
        { prop: 'fechaFinal', name: 'Fecha final' }

      ];
    }

    if(this.type == "reintegro")
    {
      this.columns = [
        { prop: 'nombre', name: 'Entidad financiera' },
        { prop: 'fechaCargue', name: 'Fecha cargue' },
        { prop: 'nroCuenta', name: 'Número cuenta' },
        { prop: 'totalSaldoInicial', name: 'Saldo inicial', cellTemplate: this.monedaTemplate },
        { prop: 'remuneracion', name: 'Remuneración', cellTemplate: this.monedaTemplate },
        { prop: 'fechaTraslado', name: 'Fecha traslado' },
        { prop: 'fechaFinal', name: 'Fecha final' }

      ];
    }

    if(this.type == "administradas")
    {
      this.columns = [
        { prop: 'nombre', name: 'Entidad financiera' },
        { prop: 'fechaCargue', name: 'Fecha cargue' },
        { prop: 'nroCuenta', name: 'Número cuenta' },
        { prop: 'totalSaldoInicial', name: 'Saldo inicial', cellTemplate: this.monedaTemplate },
        { prop: 'tasaPonderada', name: 'Tasa ponderada', cellTemplate: this.numberTemplate},
        { prop: 'fechaInicial', name: 'Fecha inicial' },
        { prop: 'fechaTraslado', name: 'Fecha traslado' },
        { prop: 'estado_Cargue', name: 'Estado' , cellTemplate: this.estadoTemplate}


      ];
    }

    if(this.type == "traslado")
    {
      this.columns = [
        { prop: 'nombre', name: 'Entidad financiera' },
        { prop: 'fechaCargue', name: 'Fecha cargue' },
        { prop: 'nroCuenta', name: 'Número cuenta' },
        { prop: 'totalSaldoInicial', name: 'Saldo inicial', cellTemplate: this.monedaTemplate },
        { prop: 'tasa', name: 'Tasa ponderada'},
        { prop: 'fechaInicial', name: 'Fecha inicial' },
        { prop: 'fechaTraslado', name: 'Fecha traslado' }

      ];
    }

    if(this.type == "cesion")
    {
      this.columns = [
        { prop: 'nombre', name: 'Entidad financiera' },
        { prop: 'fechaCesion', name: 'Fecha cesión' },
        { prop: 'nroCuenta', name: 'Número cuenta' },
        { prop: 'totalSaldoInicial', name: 'Saldo inicial', cellTemplate: this.monedaTemplate },
        { prop: 'totalRemuneracionAcumulada', name: 'Remuneración acumulada', cellTemplate: this.monedaTemplate },
        { prop: 'tipoEntidadRecibe', name: 'Tipo Entidad Recibe' },
        { prop: 'codigoEntidadRecibe', name: 'Codigo Entidad Recibe' },
        { prop: 'tipoEntidadCede', name: 'Tipo Entidad Cede' },
        { prop: 'codigoEntidadCede', name: 'Codigo Entidad Cede' },

      ];
    }


    // Establecer la página de inicio de la tabla en 1
    this.setPage({ offset: 0 });
  }


  setDefaultValues() {
    if(this.type == "valoracion")
    {
      this.tipoDetallado = "valoración";
    }

    if(this.type == "reintegro")
    {
      this.tipoDetallado = "reintegro";
    }

    if(this.type == "administradas")
    {
      this.tipoDetallado = "administradas";
    }

    if(this.type == "traslado")
    {
      this.tipoDetallado = "traslado";
    }

    if(this.type == "cesion")
    {
      this.tipoDetallado = "cesion";
    }

    this._entidadUseCase.ListadoEntidades().subscribe(res => {
      this.entidades = res;
    });

    this.page.pageNumber = 1;
    this.page.size = 10;
    this.page.totalElements = 0;
  }

  // Conulta de registros
  consultarRegistros(): void {

    if(!this.fechaInicio || !this.fechaFin){
      this.alarma.showWarning("Debe seleccionar un rango de fechas para realizar la consulta");
      return;
    }

    if(!this.entidad){
      this.alarma.showWarning("Debe seleccionar una entidad para realizar la descarga", "Atención");
      return;
    }

      const preloader = this._notifications.showPreloader();
      this._getarchivousecase.GetDetalladoFilter(this.page)
        .subscribe(res => {
          this.configurarTablaConRespuesta(res);
          preloader.close();
        });
    
  }

  buscar() {
    if(this.type == "valoracion")
    {
      this.tipoDetallado = "valoración";

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
      this.tipoDetallado = "reintegro";

      this.setPage({ offset: 0 });
      this.page.data = {
        "entidad": this.entidad,
        "tipoArchivo": "REINTEGRO",
        "fechaInicial": this.fechaInicio,
        "fechaFinal": this.fechaFin
      };
      this.consultarRegistros()
    }

    if(this.type === "administradas")
    {
          this.setPage({ offset: 0 });
          this.page.data = {
            "entidad": this.entidad,
            "tipoArchivo": "ADMINISTRADAS",
            "estado":this.estado,
            "fechaInicial": this.fechaInicio,
            "fechaFinal": this.fechaFin
          };
          this.consultarRegistros()
    }

    if(this.type === "traslado")
    {
          this.setPage({ offset: 0 });
          this.page.data = {
            "entidad": this.entidad,
            "tipoArchivo": "TRASLADO",
            "fechaInicial": this.fechaInicio,
            "fechaFinal": this.fechaFin
          };
          this.consultarRegistros()
    }

    if(this.type == "cesion")
    {
      this.tipoDetallado = "cesion";

      this.setPage({ offset: 0 });
      this.page.data = {
        "entidad": this.entidad,
        "tipoArchivo": "CESION",
        "fechaInicial": this.fechaInicio,
        "fechaFinal": this.fechaFin
      };
      this.consultarRegistros()
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

    if(!this.fechaInicio || !this.fechaFin){
      this.alarma.showWarning("Debe seleccionar un rango de fechas para realizar la descarga", "Atención");
    }else{
      if(!this.entidad){
        this.alarma.showWarning("Debe seleccionar una entidad para realizar la descarga", "Atención");
      }else{


      const preloader = this._notifications.showPreloader();

      if(this.type == "valoracion")
      {
        this.page.data = {
          "entidad": this.entidad,
          "tipoArchivo": "VALORACION",
          "fechaInicial": this.fechaInicio,
          "fechaFinal": this.fechaFin,
          "estado": this.estado
        };
      }

      if(this.type == "reintegro")
      {
        this.page.data = {
          "entidad": this.entidad,
          "tipoArchivo": "REINTEGRO",
          "fechaInicial": this.fechaInicio,
          "fechaFinal": this.fechaFin,
          "estado": this.estado
        };
      }

      if(this.type == "administradas")
      {
        this.page.data = {
          "entidad": this.entidad,
          "tipoArchivo": "ADMINISTRADAS",
          "fechaInicial": this.fechaInicio,
          "fechaFinal": this.fechaFin,
          "estado": this.estado
        };
      }

      if(this.type == "traslado")
      {
        this.page.data = {
          "entidad": this.entidad,
          "tipoArchivo": "TRASLADO",
          "fechaInicial": this.fechaInicio,
          "fechaFinal": this.fechaFin,
          "estado": this.estado
        };
      }

      this._getreportecase.getReporteDetalladoExcel(this.page.data).subscribe(response => {

        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(response);
        downloadLink.setAttribute('download', this.nombreArchivo);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        preloader.close();
      })

      }
    }

  }

}
