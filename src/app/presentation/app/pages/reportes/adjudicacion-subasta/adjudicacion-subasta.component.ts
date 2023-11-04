import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { GetReporteService } from 'src/app/domain/usecases/reportes/get-reporte.service';
import { NotificationsService } from 'src/app/presentation/shared/services/notifications.service';
import Swal from 'sweetalert2';
import { Page } from '../../../interfaces/page';

@Component({
  selector: 'app-adjudicacion-subasta',
  templateUrl: './adjudicacion-subasta.component.html',
  styleUrls: ['./adjudicacion-subasta.component.css']
})
export class AdjudicacionSubastaComponent implements OnInit {

  @ViewChild('numberTemplate', { static: true }) numberTemplate: TemplateRef<any>;
  @ViewChild('monedaTemplate', { static: true }) monedaTemplate: TemplateRef<any>;
  @ViewChild('fecha', { static: true }) fecha: TemplateRef<any>;
  
  public pagination = [10, 20, 30, 40, 50, 60];
  public page = new Page();
  public rows = new Array<any>();
  public columnMode = ColumnMode;
  public dataQuery: any[] = [];
  public resultSearch = false;
  public columns = [];
  tipos:any;
  tipoSubasta: string;
  fechaInicial: string;
  fechaFinal: string;
  type: string;
  dato: any;
  public nombreArchivo = 'Reporte Adjudicación de subasta.xlsx';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private _notifications: NotificationsService,
              private _getreportecase: GetReporteService,
              private _route: ActivatedRoute,) { 

    this.llenartipo();

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
    this.columns = [
      { prop: 'fechaSubasta', name: 'Fecha de Subasta',cellTemplate: this.fecha},
      { prop: 'fechaAdjudicacion', name: 'Fecha de Adjudicación',cellTemplate: this.fecha},
      { prop: 'nombreEntidad', name: 'Entidad Adjudicada' },
      { prop: 'nitEntidad', name: 'Nit' },
      { prop: 'tipo', name: 'Tipo Subasta' },
      { prop: 'porcentaje', name: 'Porcentaje'},
      { prop: 'tasaInteres', name: 'Tasa Interes' },
      { prop: 'valorAdjudicacion', name: 'Valor' , cellTemplate: this.monedaTemplate},
  
    ];
      this.setPage({ offset: 0 });

}

llenartipo(){
  this.tipos = [
    {
      nombre:"Liquidez (3 meses)",
      id: "Liquidez"
    },
    {
      nombre:"Largo Plazo (1 año)",
      id: "Largo plazo"
    }
  ]
}

public setPage(pageInfo: any, fromPagination?: boolean) {
  this.page.pageNumber = pageInfo.offset;
  if (this.page.data && fromPagination) this.consultarRegistros();
}

consultarRegistros(): void {
  const preloader = this._notifications.showPreloader();
  
  this._getreportecase.GetAdjudicacionSubastaFilter(this.page)
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

buscar(){
  var tiposubasta = this.tipoSubasta;
  var fechainicial = this.fechaInicial;
  var fechafinal = this.fechaFinal;

  if(tiposubasta === undefined || tiposubasta === "undefined" || tiposubasta === "")
    {
      tiposubasta = 'undefined';
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
        "tipoSubasta": tiposubasta,
        "fechaInicial": fechainicial,
        "fechaFinal": fechafinal,
      };

          this.consultarRegistros()

}

descargarExcel(){

  var tiposubasta = this.tipoSubasta;
  var fechainicial = this.fechaInicial;
  var fechafinal = this.fechaFinal;

  if(tiposubasta === undefined || tiposubasta === "undefined" || tiposubasta === "")
  {
      tiposubasta = 'undefined';
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
      "tipoSubasta": tiposubasta,
      "fechaInicial": fechainicial,
      "fechaFinal": fechafinal,
    };

    Swal.fire({
      title: 'Espere por favor, Guardando Datos',
      allowOutsideClick:false,
      didOpen: () => {
          Swal.showLoading()
        }
      });

    this._getreportecase.GetAdjudicacionSubastaExcel(this.dato).subscribe(response => {
    
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(response);
    downloadLink.setAttribute('download', this.nombreArchivo);
    document.body.appendChild(downloadLink);
    downloadLink.click();

    Swal.close();
    })
  }

}
