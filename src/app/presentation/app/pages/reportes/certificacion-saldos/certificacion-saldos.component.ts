import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetReporteService } from 'src/app/domain/usecases/reportes/get-reporte.service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';
import { StorageService } from 'src/app/presentation/shared/services/storage.service';

@Component({
  selector: 'app-certificacion-saldos',
  templateUrl: './certificacion-saldos.component.html',
  styleUrls: ['./certificacion-saldos.component.css']
})
export class CertificacionSaldosComponent implements OnInit {

  public certificadoForm: FormGroup;
  public swimpresion: boolean = true;
  usuario:any;
  idOrganizacion: any;
  datos: any[] = [];
  numerocuentas: number = 0;
  saldocapitalintereses: number;
  public fechahoy: String;
  public fechafiltro: String;

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

      const{fecha} = this.certificadoForm.value;
      this.fechahoy = Date();
      this.fechafiltro = fecha;

      this._getreportecase.getReporteCertificacionSaldos(this.idOrganizacion,fecha).subscribe(response => {
       
        this.datos = response;
        
        console.log(response);

        this.numerocuentas = response['numeroTraslados'] - response['numeroReintegros'];
        this.saldocapitalintereses = (response['saldoTraslados'] - response['totalRemuneracionAcumulada']) - (response['saldoReintegros'] - response['totalRemuneracion'])
  
      })

      // this.swimpresion = true;
    }
    else{
      this.alarma.showWarning("Información incompleta, por favor ingrese la fecha para poder consultar");
    }
  }
}
