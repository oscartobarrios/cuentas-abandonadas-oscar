import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Itipocargue } from 'src/app/domain/models/archivo/itipocargue';
import { GetArchivoUseCaseService } from 'src/app/domain/usecases/archivo/get-archivo-use-case.service';
import { GetEntidadUseCaseService } from 'src/app/domain/usecases/entidad/get-entidad-use-case.service';
import { GetReporteService } from 'src/app/domain/usecases/reportes/get-reporte.service';
import { ConsoleLoggerService } from 'src/app/presentation/shared/services/console-logger.service';
import { IEstado } from 'src/app/domain/models/reporte/iestado';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estado-cargues',
  templateUrl: './estado-cargues.component.html',
  styleUrls: ['./estado-cargues.component.css']
})
export class EstadoCarguesComponent implements OnInit {
  entidades:any;
  type: string;
  tipos: Itipocargue[] = [];
  estados: IEstado[];
  public consultaexcelForm: FormGroup;
  
  constructor(private _route: ActivatedRoute,
              private alarma: SweetAlertService,
              private fb: FormBuilder,
              private _entidadUseCase: GetEntidadUseCaseService,
              private _getarchivousecase: GetArchivoUseCaseService,
              private _getreportecase: GetReporteService) { 
    
    this._entidadUseCase.ListadoEntidades().subscribe(res => {
      this.entidades = res;

    });

    this._getarchivousecase.TipoCargue().subscribe((ResulData) => {
      this.tipos = ResulData;
     
    });

    this.llenarEstados();
   
  }

  ngOnInit(): void {
    this.cargarformulario();
  }

  cargarformulario(){
    this.consultaexcelForm = this.fb.group({
      entidad: ['', Validators.required],
      tipoArchivo: ['', Validators.required],
      fechaCargue: ['', Validators.required],
      nombre: ['', Validators.required],
      estado: ['', Validators.required],

    })
  }

  llenarEstados(){
    this.estados = [
      {
        nombre:"CARGA_PROCESADA"
      },
      {
        nombre: "VALIDACION_EXITOSA",
      },{
        nombre: "AUTORIZACION_APROBADA",
      },{
        nombre: "AUTORIZACION_RECHAZADA",
      },{
        nombre: "CARGANDO",
      },{
        nombre: "GUARDANDO",
      },{
        nombre: "VALIDANDO",
      },{
        nombre: "VALIDACION_FALLIDA",
      },{
        nombre: "BORRADOR",
      },{
        nombre: "PENDIENTE_AUTORIZACION",
      }
    ]
  }

  descargarExcel(){

    if(this.consultaexcelForm.valid)
    {
     
      Swal.fire({
        title: 'Espere por favor, Guardando Datos',
        allowOutsideClick:false,
        didOpen: () => {
            Swal.showLoading()
          }
        });

    this._getreportecase.getReporteEstadoCargaexcel(this.consultaexcelForm.value).subscribe(response => {
      const blob = new Blob([response], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      window.open(url);
      Swal.close();
    })

    }else{
      this.alarma.showWarning("Información incompleta, por favor verifique");
    }
  }

}
