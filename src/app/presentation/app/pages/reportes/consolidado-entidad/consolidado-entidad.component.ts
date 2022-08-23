import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { GetReporteService } from 'src/app/domain/usecases/reportes/get-reporte.service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';
import { NotificationsService } from 'src/app/presentation/shared/services/notifications.service';
import { StorageService } from 'src/app/presentation/shared/services/storage.service';
import Swal from 'sweetalert2';
import { Page } from '../../../interfaces/page';

@Component({
  selector: 'app-consolidado-entidad',
  templateUrl: './consolidado-entidad.component.html',
  styleUrls: ['./consolidado-entidad.component.css']
})
export class ConsolidadoEntidadComponent implements OnInit {

  @ViewChild('numberTemplate', { static: true }) numberTemplate: TemplateRef<any>;
  @ViewChild('monedaTemplate', { static: true }) monedaTemplate: TemplateRef<any>;
  
  fechaCorte: string;
  public columns = [];
  public pagination = [10, 20, 30, 40, 50, 60];
  public page = new Page();
  public rows = new Array<any>();
  public columnMode = ColumnMode;
  type: string;
  public resultSearch = false;
  public dataQuery: any[] = [];
  usuario:any;
  idOrganizacion: any;
  public nombreArchivo = 'Reporte Consolidado Entidad.xlsx';
  dato: any;
  public fecha: Date;
  public fechaahora: string;

  constructor(private _route: ActivatedRoute,
              private alarma: SweetAlertService,
              private _notifications: NotificationsService,
              private _getreportecase: GetReporteService,
              private _storageservice: StorageService,
              ) { 
    this._route.params.subscribe(params => {
      this.type = params.type;
      this.setDefaultValues();
    })
  }

  setDefaultValues() {
   
    this.page.pageNumber = 1;
    this.page.size = 10;
    this.page.totalElements = 0;
  }

  ngOnInit(): void {

    this.usuario = this._storageservice.getItem('payload').infoUsuario;
    this.idOrganizacion = this.usuario.idOrganizacion;

    this.columns = [
      { prop: 'cargueNombre', name: 'Nombre cargue' },
      { prop: 'fechCargue', name: 'Fecha cargue' },
      { prop: 'numeroCuenta', name: 'Número cuenta' },
      { prop: 'monto', name: 'Monto', cellTemplate: this.monedaTemplate },
      { prop: 'tasa', name: 'Tasa ponderada', cellTemplate: this.numberTemplate},
      { prop: 'remuneracionAcumulada', name: 'Remuneración acumulada', cellTemplate: this.monedaTemplate },

    ];
  }

  public setPage(pageInfo: any, fromPagination?: boolean) {
    this.page.pageNumber = pageInfo.offset;
    if (this.page.data && fromPagination) this.consultarRegistros();
  }

 
  descargarExcel(){

    if(this.fechaCorte === undefined || this.fechaCorte === "undefined" || this.fechaCorte === "")
    {
      this.alarma.showWarning("Información incompleta, por favor ingrese la fecha para poder consultar");
      return;
    }

    if(this.fechaCorte === undefined || this.fechaCorte === "undefined" || this.fechaCorte === "")
    {
      this.alarma.showWarning("Información incompleta, por favor ingrese la fecha para poder consultar");
      return;
    }

    if(this.validarFechaCorte() == 1){
      return;
    }


    this.setPage({ offset: 0 });
      this.dato = {
        "entidad": this.idOrganizacion,
        "fechaFinal": this.fechaCorte
      };

      Swal.fire({
        title: 'Espere por favor, Guardando Datos',
        allowOutsideClick:false,
        didOpen: () => {
            Swal.showLoading()
          }
        });

    this._getreportecase.getReporteConsolidadoEntidadexcel(this.dato).subscribe(response => {

      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(response);
      downloadLink.setAttribute('download', this.nombreArchivo);
      document.body.appendChild(downloadLink);
      downloadLink.click();

      Swal.close();
    },  (error: any)  => {
      console.log(error);
      Swal.close();
      this.alarma.showError(error);
      
    });
  
  }

  buscar(){

    if(this.fechaCorte === undefined || this.fechaCorte === "undefined" || this.fechaCorte === "")
    {
      this.alarma.showWarning("Información incompleta, por favor ingrese la fecha para poder consultar");
      return;
    }

    if(this.validarFechaCorte() == 1){
      return;
    }

    this.setPage({ offset: 0 });
    this.page.data = {
      "entidad": this.idOrganizacion,      
      "fechaFinal": this.fechaCorte
    };
    
    this.consultarRegistros();


  }

  validarFechaCorte(){

    this.fecha = new Date();

    if (this.fecha.getMonth() + 1 >= 1 && this.fecha.getMonth() + 1 <= 9)
    {
     
      if (this.fecha.getDate() + 1 >= 1 && this.fecha.getDate() + 1 <= 9)
      {
        this.fechaahora = this.fecha.getFullYear() + "-" + "0" + (this.fecha.getMonth() + 1) + "-" + "0" + this.fecha.getDate();        
      }else{
        this.fechaahora = this.fecha.getFullYear() + "-" + "0" + (this.fecha.getMonth() + 1) + "-" + this.fecha.getDate();
      }
    } else{
      if (this.fecha.getDate() + 1 >= 1 && this.fecha.getDate() + 1 <= 9)
      {
        this.fechaahora = this.fecha.getFullYear() + "-" + (this.fecha.getMonth() + 1) + "-" + "0" + this.fecha.getDate();        
      }else{
        this.fechaahora = this.fecha.getFullYear() + "-" + (this.fecha.getMonth() + 1) + "-" + this.fecha.getDate();
      }
    }

    if(this.fechaCorte > this.fechaahora)
    {
      this.alarma.showWarning("La fecha de corte no puede ser mayor a la fecha actual");
      return 1;
    }else{
      return 0;
    }
  }


  // Conulta de registros
 consultarRegistros(): void {
  const preloader = this._notifications.showPreloader();
  
  this._getreportecase.GetConsolidadoEntidadFilter(this.page)
    .subscribe(res => {

      console.log(res);

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

}
