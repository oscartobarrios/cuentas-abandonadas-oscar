import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder,
              private alarma: SweetAlertService,
              private _storageservice: StorageService,
              private _getreportecase: GetReporteService,) { }

  ngOnInit(): void {
    this.usuario = this._storageservice.getItem('payload').infoUsuario;
    this.idOrganizacion = this.usuario.idOrganizacion;
    console.log(this.usuario);
    this.cargarformulario();

  }

  cargarformulario(){
    this.certificadoForm = this.fb.group({ 
      fecha: ['', Validators.required],      
    });
  }

  buscar(){
    if(this.certificadoForm.valid)
    {

      this.swimpresion = false;

        const{fecha} = this.certificadoForm.value;
        this.fecha = new Date();
    
        if (this.fecha.getMonth() + 1 >= 1 && this.fecha.getMonth() + 1 <= 9)
        {
          this.fechaahora = this.fecha.getFullYear() + "-" + "0" + (this.fecha.getMonth() + 1) + "-" + this.fecha.getDate();
        } else{
          this.fechaahora = this.fecha.getDate() + "/" + (this.fecha.getMonth() + 1) + "/" + this.fecha.getFullYear();
        }

        if(fecha > this.fechaahora)
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
      this.fechafiltro = fecha;

      this._getreportecase.getReporteCertificacionSaldos(this.idOrganizacion,fecha).subscribe(response => {
       
        this.datos = response;
        
        this.numerocuentas = response['numeroTraslados'] - response['numeroReintegros'];
        this.saldocapitalintereses = (response['saldoTraslados'] + response['totalRemuneracionAcumulada']) - (response['saldoReintegros'] + response['totalRemuneracion'])
        
        
        this.swimpresion = true;
        Swal.close();
      })

      // this.swimpresion = true;
    }
    else{
      this.alarma.showWarning("Información incompleta, por favor ingrese la fecha para poder consultar");
    }
  }
}
