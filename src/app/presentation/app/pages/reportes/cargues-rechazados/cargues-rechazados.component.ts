import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Itipocargue } from 'src/app/domain/models/archivo/itipocargue';
import { ICargueRechazado } from 'src/app/domain/models/reporte/icarguerechazado';
import { IEstadoCargue } from 'src/app/domain/models/reporte/iestadocargue';
import { GetArchivoUseCaseService } from 'src/app/domain/usecases/archivo/get-archivo-use-case.service';
import { GetEntidadUseCaseService } from 'src/app/domain/usecases/entidad/get-entidad-use-case.service';
import { GetReporteService } from 'src/app/domain/usecases/reportes/get-reporte.service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';
import { NotificationsService } from 'src/app/presentation/shared/services/notifications.service';
import Swal from 'sweetalert2';
import { Page } from '../../../interfaces/page';

@Component({
  selector: 'app-cargues-rechazados',
  templateUrl: './cargues-rechazados.component.html',
  styleUrls: ['./cargues-rechazados.component.css']
})
export class CarguesRechazadosComponent implements OnInit {

  @ViewChild('numberTemplate', { static: true }) numberTemplate: TemplateRef<any>;
  @ViewChild('monedaTemplate', { static: true }) monedaTemplate: TemplateRef<any>;
  @ViewChild('fecha', { static: true }) fecha: TemplateRef<any>;

  entidad: string;
  tipoArchivo: string;
  fechaInicial: string;
  fechaFinal: string;
  entidades:any;
  tipos: Itipocargue[] = [];
  type: string;
  dato: ICargueRechazado;
  public nombreArchivo = 'Reporte Cargues Rechazados.xlsx';

  public pagination = [10, 20, 30, 40, 50, 60];
  public page = new Page();
  public rows = new Array<any>();
  public columnMode = ColumnMode;
  public dataQuery: IEstadoCargue[] = [];
  public resultSearch = false;
  public columns = [];
  

  constructor(private _route: ActivatedRoute,
    private alarma: SweetAlertService,
    private _entidadUseCase: GetEntidadUseCaseService,
    private _getarchivousecase: GetArchivoUseCaseService,
    private _getreportecase: GetReporteService,
    private _notifications: NotificationsService) { 

      this._entidadUseCase.ListadoEntidades().subscribe(ResulData => {
        this.entidades = ResulData;
      });
  
      this._getarchivousecase.TipoCargue().subscribe((ResulData) => {
        this.tipos = ResulData;
       
      });
  
     
      this._route.params.subscribe(params => {
        this.type = params.type;
        this.setDefaultValues();
      })

    }

    setDefaultValues() {
      this._entidadUseCase.ListadoEntidades().subscribe(res => {
        this.entidades = res;
      });
      
      this.page.pageNumber = 1;
      this.page.size = 10;
      this.page.totalElements = 0;
    }

  ngOnInit(): void {
    this.columns = [
      { prop: 'entidad', name: 'Entidad Financiera' },
      { prop: 'tipoArchivo', name: 'TipoArchivo' },
      { prop: 'idCargue', name: 'idCargue' },
      // { prop: 'nombreArchivo', name: 'Nombre' },
      { prop: 'fecCargue', name: 'Fecha Rechazo', cellTemplate: this.fecha },
      // { prop: 'nroCuentas', name: 'Numero Cuentas' },
      // { prop: 'monto', name: 'Monto' , cellTemplate: this.monedaTemplate},
      // { prop: 'tasaPonderada', name: 'TasaPonderada' , cellTemplate: this.numberTemplate},
      // { prop: 'totalRemuneracionPeriodo', name: 'Remuneracion', cellTemplate: this.monedaTemplate },
      { prop: 'usuario', name: 'Usuario' },
      { prop: 'observacionesRechazo', name: 'Observaciones' },
      ];

      this.setPage({ offset: 0 });

  }

  public setPage(pageInfo: any, fromPagination?: boolean) {
    this.page.pageNumber = pageInfo.offset;
    if (this.page.data && fromPagination) this.consultarRegistros();
  }

 // Conulta de registros
 consultarRegistros(): void {
  const preloader = this._notifications.showPreloader();
  
  this._getreportecase.GetCargueRechazadoFilter(this.page)
    .subscribe(res => {
      this.configurarTablaConRespuesta(res);
      preloader.close();
    });
    
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

  buscar(){
    var tipoarchivo = this.tipoArchivo;
    var entidad = this.entidad;
    var fechainicial = this.fechaInicial;
    var fechafinal = this.fechaFinal;
  
    if(tipoarchivo === undefined || tipoarchivo === "undefined" || tipoarchivo === "")
    {
      tipoarchivo = 'undefined';
    }

    if(entidad === undefined || entidad === "undefined" || entidad === "")
    {
      entidad = 'undefined';
    }

    if(fechainicial === undefined || fechainicial === "undefined" || fechainicial === "")
    {
      fechainicial = 'undefined';
    }

    if(fechafinal === undefined || fechafinal === "undefined" || fechafinal === "")
    {
      fechafinal = 'undefined';
    }

    this.setPage({ offset: 0 });
      this.page.data = {
        "entidad": entidad,
        "tipoArchivo": tipoarchivo,
        "fechaInicial": fechainicial,
        "fechaFinal": fechafinal
      };

          this.consultarRegistros()
  }

  descargarExcel(){

    debugger;

    var tipoarchivo = this.tipoArchivo;
    var entidad = this.entidad;
    var fechainicial = this.fechaInicial;
    var fechafinal = this.fechaFinal;

    if(tipoarchivo === undefined || tipoarchivo === "undefined" || tipoarchivo === "")
    {
      tipoarchivo = 'undefined';
    }

    if(entidad === undefined || entidad === "undefined" || entidad === "")
    {
      entidad = 'undefined';
    }

    if(fechainicial === undefined || fechainicial === "undefined" || fechainicial === "")
    {
      fechainicial = 'undefined';
    }

    if(fechafinal === undefined || fechafinal === "undefined" || fechafinal === "")
    {
      fechafinal = 'undefined';
    }

   
    this.setPage({ offset: 0 });
      this.dato = {
        "entidad": entidad,
        "tipoArchivo": tipoarchivo,
        "fechaInicial": fechainicial,
        "fechaFinal": fechafinal
      };

      Swal.fire({
        title: 'Espere por favor, Guardando Datos',
        allowOutsideClick:false,
        didOpen: () => {
            Swal.showLoading()
          }
        });

    this._getreportecase.getReporteCargaRechazadoexcel(this.dato).subscribe(response => {
      // const blob = new Blob([response], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      // const url = window.URL.createObjectURL(blob);
      // window.open(url);

      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(response);
      downloadLink.setAttribute('download', this.nombreArchivo);
      document.body.appendChild(downloadLink);
      downloadLink.click();

      Swal.close();
    })
   
  }

}
