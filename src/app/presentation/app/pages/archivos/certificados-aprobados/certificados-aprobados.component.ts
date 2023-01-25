import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ICargue } from 'src/app/domain/models/archivo/icargue';
import { GetArchivoUseCaseService } from 'src/app/domain/usecases/archivo/get-archivo-use-case.service';
import { GetEntidadUseCaseService } from 'src/app/domain/usecases/entidad/get-entidad-use-case.service';
import { NotificationsService } from 'src/app/presentation/shared/services/notifications.service';
import { StorageService } from 'src/app/presentation/shared/services/storage.service';
import { Page } from '../../../interfaces/page';

@Component({
  selector: 'app-certificados-aprobados',
  templateUrl: './certificados-aprobados.component.html',
  styleUrls: ['./certificados-aprobados.component.css']
})
export class CertificadosAprobadosComponent implements OnInit {

  @ViewChild('accionesTemplate', { static: true }) accionesTemplate: TemplateRef<any>;
  @ViewChild('monedaTemplate', { static: true }) monedaTemplate: TemplateRef<any>;
  @ViewChild('fechaTemplate', { static: true }) fehcaTemplate: TemplateRef<any>;

  usuario:any;
  // Variables NgxTable
  public pagination = [10, 20, 30, 40, 50, 60];
  public page = new Page();
  public rows = new Array<any>();
  public columnMode = ColumnMode;
  public dataQuery: ICargue[] = [];
  public resultSearch = false;
  public columns = [];
  public resultadosBusqueda: any[] = [];
  public titulo = 'Certificaciones aprobadas';
  public boton = 'Seleccionar';
  entidades:any;
  entidad: string;
  fechaInicio: string;
  fechaFin: string;
  tipo: string;

  constructor(private _notifications: NotificationsService,
              private _getarchivousecase: GetArchivoUseCaseService,
              private _storageservice: StorageService,
              private _entidadUseCase: GetEntidadUseCaseService)
              {
                this.setDefaultValues();
              }

  ngOnInit(): void {

    this.columns = [
      { prop: 'usuario', name: 'Entidad' },
      { prop: 'nombreArchivo', name: 'Nombre' },
      { prop: 'tipoArchivo', name: 'Tipo' },
      { prop: 'fecCargue', name: 'Fecha', cellTemplate: this.fehcaTemplate},
      { prop: 'idCargue', name: 'Acciones', cellTemplate: this.accionesTemplate }
    ];

    // Establecer la página de inicio de la tabla en 1
    this.setPage({ offset: 0 });
    this.usuario = this._storageservice.getItem('payload').infoUsuario;
    this.page.data = {
      "entidad": this.usuario.idOrganizacion
    };
    if(this.usuario.idPerfil != 1){
      this.page.data = {
        "entidad": ""
      };
      this.titulo = "Certificaciones aprobadas";
      this.boton = "Ver certificaciones";

    }
    this.consultarRegistros()
  }

  setDefaultValues() {

    this.page.pageNumber = 1;
    this.page.size = 10;
    this.page.totalElements = 0;

    this._entidadUseCase.ListadoEntidades().subscribe(res => {
      this.entidades = res;
    });
  }

  // Conulta de registros
  consultarRegistros(): void {
      const preloader = this._notifications.showPreloader();
      this.page.data = {
        "entidad": this.entidad,
        "tipoArchivo": this.tipo,
        "fechaInicial": this.fechaInicio,
        "fechaFinal": this.fechaFin
      };
      this._getarchivousecase.GetCargueCertificadosFilter(this.page)
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

  public setPage(pageInfo: any, fromPagination?: boolean) {
    this.page.pageNumber = pageInfo.offset;
    if (this.page.data && fromPagination) this.consultarRegistros();
  }

  buscar() {
    this.setPage({ offset: 0 });
    this.consultarRegistros()
  }

}
