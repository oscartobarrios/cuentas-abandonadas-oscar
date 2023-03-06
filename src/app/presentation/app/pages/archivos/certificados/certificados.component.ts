import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ICargue } from 'src/app/domain/models/archivo/icargue';
import { GetArchivoUseCaseService } from 'src/app/domain/usecases/archivo/get-archivo-use-case.service';
import { NotificationsService } from 'src/app/presentation/shared/services/notifications.service';
import { StorageService } from 'src/app/presentation/shared/services/storage.service';
import { Page } from '../../../interfaces/page';

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.css']
})
export class CertificadosComponent implements OnInit {

  @ViewChild('accionesTemplate', { static: true }) accionesTemplate: TemplateRef<any>;
  @ViewChild('acciones2Template', { static: true }) acciones2Template: TemplateRef<any>;
  @ViewChild('monedaTemplate', { static: true }) monedaTemplate: TemplateRef<any>;
  @ViewChild('fechaTemplate', { static: true }) fehcaTemplate: TemplateRef<any>;

  usuario:any;
  // Variables NgxTable
  public pagination = [10, 20, 30, 40, 50, 60];
  public page = new Page();
  public page2 = new Page();
  public rows = new Array<any>();
  public rows2 = new Array<any>();
  public columnMode = ColumnMode;
  public dataQuery: ICargue[] = [];
  public dataQuery2: ICargue[] = [];
  public resultSearch = false;
  public resultSearch2 = false;
  public columns = [];
  public columns2 = [];

  public resultadosBusqueda: any[] = [];
  public titulo = 'Certificaciones con un cargue de archivos';
  public titulo2 = 'Certificaciones sin cargue de archivos';

  public boton = 'Seleccionar';

  constructor(private _notifications: NotificationsService,
              private _getarchivousecase: GetArchivoUseCaseService,
              private _storageservice: StorageService,)
              {
                this.setDefaultValues();
              }

  ngOnInit(): void {

    this.columns = [
      { prop: 'usuario', name: 'Entidad' },
      { prop: 'nombreArchivo', name: 'Nombre' },
      { prop: 'tipoArchivo', name: 'Tipo' },
      { prop: 'nroCuentas', name: 'Número de cuentas' },
      { prop: 'monto', name: 'Saldo inicial', cellTemplate: this.monedaTemplate},
      { prop: 'fecCargue', name: 'Fecha', cellTemplate: this.fehcaTemplate},
      { prop: 'idCargue', name: 'Acciones', cellTemplate: this.accionesTemplate }
    ];

    this.columns2 = [
      { prop: 'usuario', name: 'Entidad' },
      { prop: 'tipoArchivo', name: 'Tipo' },
      { prop: 'idCargue', name: 'Acciones', cellTemplate: this.acciones2Template }
    ];

    // Establecer la página de inicio de la tabla en 1
    this.setPage({ offset: 0 });
    this.setPage2({ offset: 0 });
    this.usuario = this._storageservice.getItem('payload').infoUsuario;
    this.page.data = {
      "entidad": this.usuario.idOrganizacion
    };
    this.page2.data = {
      "entidad": this.usuario.idOrganizacion
    };
    if(this.usuario.idPerfil != 1){
      this.page.data = {
        "entidad": ""
      };
      this.page2.data = {
        "entidad": ""
      };
      this.titulo = "Certificaciones relacionacionadas con un cargue de la entidad";
      this.boton = "Ver certificaciones";

    }
    this.consultarRegistros()
  }

  setDefaultValues() {

    this.page.pageNumber = 1;
    this.page.size = 10;
    this.page.totalElements = 0;

    this.page2.pageNumber = 1;
    this.page2.size = 10;
    this.page2.totalElements = 0;
  }

  // Conulta de registros
  consultarRegistros(): void {

      const preloader = this._notifications.showPreloader();
      this._getarchivousecase.GetCargueFilter(this.page)
        .subscribe(res => {
          this.configurarTablaConRespuesta(res);

          if (res.data === null || res.data.length === 0) {
            this._getarchivousecase.GetTipoArchivosSinCargue(this.page2)
            .subscribe(res2 => {
              this.configurarTabla2ConRespuesta(res2);
              preloader.close();
            });
          }else{
            preloader.close();
          }


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

  // Configuración de la tabla con respuesta
  private configurarTabla2ConRespuesta(modelo: any): void {
    //this.loadingService.loadingOff();
    this.resultSearch2 = true;
    this.dataQuery2 = modelo.data;
    this.rows2 = modelo.data;
    this.definirValoresPagina2(modelo);
    if (this.rows2 === null || this.rows2.length === 0) {
      this.resultSearch2 = false;
    }
  }

  // definicion de valores del paginador
  private definirValoresPagina(values): void {
    this.page.pageNumber = values.pageNumber;
    this.page.size = values.size;
    this.page.totalElements = values.totalElements;
    this.page.totalPages = values.totalPages;
  }

  // definicion de valores del paginador
  private definirValoresPagina2(values): void {
    this.page2.pageNumber = values.pageNumber;
    this.page2.size = values.size;
    this.page2.totalElements = values.totalElements;
    this.page2.totalPages = values.totalPages;
  }

  public setPage(pageInfo: any, fromPagination?: boolean) {
    this.page.pageNumber = pageInfo.offset;
    if (this.page.data && fromPagination) this.consultarRegistros();
  }

  public setPage2(pageInfo: any, fromPagination?: boolean) {
    this.page2.pageNumber = pageInfo.offset;
    if (this.page2.data && fromPagination) this.consultarRegistros();
  }

}
