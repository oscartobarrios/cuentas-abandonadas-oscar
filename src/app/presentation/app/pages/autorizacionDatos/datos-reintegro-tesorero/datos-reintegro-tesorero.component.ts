import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GetArchivoUseCaseService } from 'src/app/domain/usecases/archivo/get-archivo-use-case.service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';
import { StorageService } from 'src/app/presentation/shared/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-datos-reintegro-tesorero',
  templateUrl: './datos-reintegro-tesorero.component.html',
  styleUrls: ['./datos-reintegro-tesorero.component.css']
})
export class DatosReintegroTesoreroComponent implements OnInit {

  DatosReintegroForm: FormGroup;
  public idcargo: string;
  usuario : any;

  constructor(private alarma: SweetAlertService,
              private _getarchivousecase: GetArchivoUseCaseService,
              private route: ActivatedRoute,
              private _storageservice: StorageService,
              private _router : Router,) { 
    this.formInit();
  }

  ngOnInit(): void {
    this.cargardatos();
    this.usuario = this._storageservice.getItem('payload').infoUsuario;
  }

  
  formInit(){

    this.DatosReintegroForm = new FormGroup({
      nroperacioncud: new FormControl('', [Validators.required]),
      observacion: new FormControl(''),
      
      });
  }


  cargardatos(){

    Swal.fire({
      title: 'Espere por favor, Consultando Datos',
      allowOutsideClick:false,
      didOpen: () => {
        Swal.showLoading()
      }
    });

    this.idcargo = this.route.snapshot.params['id'];
    this._getarchivousecase.GetObtenerOrdenCumplimientoIdCargue(this.idcargo).subscribe((ResultData) => {
      console.log(ResultData);

      if(ResultData.nroOperacionCud != 0)
      {
        this.DatosReintegroForm.controls["nroperacioncud"].setValue(ResultData.nroOperacionCud);
      }

      this.DatosReintegroForm.controls["observacion"].setValue(ResultData.observacionReintegro);

      Swal.close()
      
    });
  }

  onSubmit(){
    if (!this.DatosReintegroForm.invalid) {

      const{nroperacioncud,observacion} = this.DatosReintegroForm.value;

      var observacionreintegro = observacion;
      
      if(observacion == '')
      {
        observacionreintegro = 'undefined';
      }

      Swal.fire({
        title: 'Espere por favor, Guardando Datos',
        allowOutsideClick:false,
        didOpen: () => {
            Swal.showLoading()
          }
        });


        this._getarchivousecase.RegistrarActualizarDatosOrdenTesorero(this.idcargo,this.usuario.idPerfil,this.usuario.idUsuario,nroperacioncud,observacionreintegro,'0','0','undefined','undefined','REINTEGRO').subscribe((ResponseData) => {
          Swal.close()
          this.alarma.showSuccess("Guardado exitosamente");
          this._router.navigate([`/autorizacion-cargues`]);
        },  (error: any)  => {
          console.log(error.error.mensaje);
          Swal.close();
          this.alarma.showError(error.error.mensaje)
        });


        
    }
    else{
      this.alarma.showWarning("Información incompleta, por favor verifique");
    }
  }


}
