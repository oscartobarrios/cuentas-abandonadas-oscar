import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetEntidadUseCaseService } from 'src/app/domain/usecases/entidad/get-entidad-use-case.service';
import { GetReporteService } from 'src/app/domain/usecases/reportes/get-reporte.service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';
import { StorageService } from 'src/app/presentation/shared/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-certificacion-saldos',
  templateUrl: './certificacion-saldos.component.html',
  styleUrls: ['./certificacion-saldos.component.css']
})
export class CertificacionSaldosComponent implements OnInit {

  public certificadoForm: FormGroup;
  public swimpresion: boolean = false;
  usuario:any;
  idOrganizacion: any;
  datos: any[] = [];
  numerocuentas: number = 0;
  saldocapitalintereses: number;
  public fechahoy: String;
  public fechafiltro: String;
  public fecha: Date;
  public fechaahora: string;
  entidades:any;
  entidad: string;
  fechafinal: string;

  constructor(private fb: FormBuilder,
              private alarma: SweetAlertService,
              private _storageservice: StorageService,
              private _getreportecase: GetReporteService,
              private _entidadUseCase: GetEntidadUseCaseService,) { 

                this._entidadUseCase.ListadoEntidades().subscribe(ResulData => {
                  this.entidades = ResulData;
                });

              }

  ngOnInit(): void {
    this.usuario = this._storageservice.getItem('payload').infoUsuario;
    this.idOrganizacion = this.usuario.idOrganizacion;
    console.log(this.usuario);
    // this.cargarformulario();

  }

  // cargarformulario(){
  //   this.certificadoForm = this.fb.group({ 
  //     fecha: ['', Validators.required],      
  //   });
  // }

  buscar(){

    // if(this.certificadoForm.valid)
    // {

    var fechafinal = this.fechafinal;
    var identidad ="";

    if(this.usuario.idPerfil == 4 || this.usuario.idPerfil == 5)
    {
      if(this.entidad === undefined || this.entidad === "undefined" || this.entidad === "")
      {
        this.alarma.showWarning("Información incompleta, por favor ingrese la entidad para poder consultar");
        return;
      }

      identidad = this.entidad

    }else{
      identidad = this.idOrganizacion
    }

    if(fechafinal === undefined || fechafinal === "undefined" || fechafinal === "")
    {
      this.alarma.showWarning("Información incompleta, por favor ingrese la fecha para poder consultar");
      return;
    }


      this.swimpresion = false;
        // const{fecha} = this.certificadoForm.value;
        const fechaActual = new Date();

        const año = fechaActual.getFullYear();
        const mes = ('0' + (fechaActual.getMonth() + 1)).slice(-2);
        const dia = ('0' + fechaActual.getDate()).slice(-2);

        const fechaFormateada = `${año}-${mes}-${dia}`;

        // if (this.fecha.getMonth() + 1 >= 1 && this.fecha.getMonth() + 1 <= 9)
        // {
        //   this.fechaahora = this.fecha.getFullYear() + "-" + "0" + (this.fecha.getMonth() + 1) + "-" + this.fecha.getDate();
        // } else{
        //   // this.fechaahora = this.fecha.getDate() + "-" + (this.fecha.getMonth() + 1) + "-" + this.fecha.getFullYear();
        //   this.fechaahora = this.fecha.getFullYear() + "-" + (this.fecha.getMonth() + 1) + "-" + this.fecha.getDate();
        // }

        if(fechafinal > fechaFormateada)
        {
          this.alarma.showWarning("La fecha de corte no puede ser mayor a la fecha actual");
          return;
        }

        Swal.fire({
          title: 'Espere por favor, Consultando Datos',
          allowOutsideClick:false,
          didOpen: () => {
              Swal.showLoading()
            }
          });
        
      this.fechahoy = Date();
      this.fechafiltro = fechafinal;

      this._getreportecase.getReporteCertificacionSaldos(identidad,fechafinal).subscribe(response => {
       
        this.datos = response;
        
        this.numerocuentas = response['numeroTraslados'] - response['numeroReintegros'];
        this.saldocapitalintereses = (response['saldoTraslados'] + response['totalRemuneracionAcumulada']) - (response['saldoReintegros'] + response['totalRemuneracion'])
        
        
        this.swimpresion = true;
        Swal.close();
      },  (error: any)  => {
        console.log(error.error);
        Swal.close();
        this.alarma.showError(error.error);
        
      });

      // this.swimpresion = true;
    }
    // else{
    //   this.alarma.showWarning("Información incompleta, por favor ingrese la fecha para poder consultar");
    // }

}
