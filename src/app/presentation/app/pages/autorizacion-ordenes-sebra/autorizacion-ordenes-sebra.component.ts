import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { GetArchivoUseCaseService } from 'src/app/domain/usecases/archivo/get-archivo-use-case.service';
import { GetEntidadUseCaseService } from 'src/app/domain/usecases/entidad/get-entidad-use-case.service';
import { NotificationsService } from 'src/app/presentation/shared/services/notifications.service';
import { Page } from '../../interfaces/page';

@Component({
  selector: 'app-autorizacion-ordenes-sebra',
  templateUrl: './autorizacion-ordenes-sebra.component.html',
  styleUrls: ['./autorizacion-ordenes-sebra.component.css']
})
export class AutorizacionOrdenesSebraComponent implements OnInit {

  @ViewChild('numberTemplate', { static: true }) numberTemplate: TemplateRef<any>;
  @ViewChild('monedaTemplate', { static: true }) monedaTemplate: TemplateRef<any>;
  @ViewChild('fecha', { static: true }) fecha: TemplateRef<any>;
  @ViewChild('accionesTemplate', { static: true }) accionesTemplate: TemplateRef<any>;
  
  public pagination = [10, 20, 30, 40, 50, 60];
  public page = new Page();
  public columnMode = ColumnMode;
  public rows = new Array<any>();
  public dataQuery: any[] = [];
  public resultSearch = false;
  type: string;
  entidad: string;
  fechaInicial: string;
  fechaFinal: string;
  entidades:any;
  public columns = [];

  constructor( private _entidadUseCase: GetEntidadUseCaseService,
               private _notifications: NotificationsService,
               private _getarchivousecase: GetArchivoUseCaseService,
               private _route: ActivatedRoute,) { 

    this._entidadUseCase.ListadoEntidades().subscribe(ResulData => {
      this.entidades = ResulData;
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
      { prop: 'entidad', name: 'Entidad' },
      { prop: 'nombreArchivo', name: 'Nombre del archivo'},
      { prop: 'fecCargue', name: 'Fecha de cargue', cellTemplate: this.fecha },
      { prop: 'tipoArchivo', name: 'Tipo de archivo'},
      { prop: 'idCargue', name: 'idCargue' },
      { prop: 'monto', name: 'Saldo inicial/Total' , cellTemplate: this.monedaTemplate},
      { prop: 'idCargue', name: 'Acciones', cellTemplate: this.accionesTemplate }
      // { prop: 'estado', name: 'Estado' },
      ];

  }

  public setPage(pageInfo: any, fromPagination?: boolean) {
    this.page.pageNumber = pageInfo.offset;
    if (this.page.data && fromPagination) this.consultarRegistros();
  }

  consultarRegistros(): void {

    const preloader = this._notifications.showPreloader();
  
    this._getarchivousecase.CarguesSebraFilter(this.page)
      .subscribe(res => {
        this.configurarTablaConRespuesta(res);
        console.log(res);
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

    var entidad = this.entidad;
    var fechainicial = this.fechaInicial;
    var fechafinal = this.fechaFinal;


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
      "fechaInicial": fechainicial,
      "fechaFinal": fechafinal
    };

        this.consultarRegistros();

  }
}
