import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GetArchivoUseCaseService } from 'src/app/domain/usecases/archivo/get-archivo-use-case.service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-certificados-cargar',
  templateUrl: './certificados-cargar.component.html',
  styleUrls: ['./certificados-cargar.component.css']
})
export class CertificadosCargarComponent implements OnInit {

  public files: File;
  funcionarioForm: FormGroup;
  public idCargue: number;


  constructor( private alarma: SweetAlertService,
               private route: ActivatedRoute,
               private _getarchivousecase: GetArchivoUseCaseService) { }

  ngOnInit(): void {
    this.idCargue = this.route.snapshot.params['id'];
  }

  formInit(){

    this.funcionarioForm = new FormGroup({
      tipo: new FormControl('', [Validators.required]),
      archivo: new FormControl('',[Validators.required]), 

      
    });

  }

  onSubmit(){
    if(this.funcionarioForm.valid)
    {
      
      const {Usuario, Cargo,foto} = this.funcionarioForm.value;
     
      if(foto != "")
      {

        if(this.files.size > 20000)
        {
          this.alarma.showWarning("El archivo debe pesar máximo 20kb");
          return;
        }
        
        if(this.files.type === "image/png")
        {
        }else{
          if(this.files.type === "image/jpeg")
          {
          }else{
            this.alarma.showWarning("El archivo debe ser de extensión png ó jpeg");
            return;
          }
        }
      }

      const data = {
        idCargue: this.idCargue,
        file: this.files
      };

      Swal.fire({
        title: 'Espere por favor, Guardando Datos',
        allowOutsideClick:false,
        didOpen: () => {
            Swal.showLoading()
          }
        });
        
      this._getarchivousecase.CargarCertificado(data).subscribe((ResponseData) => {
        Swal.close()
        this.alarma.showSuccess("Guardado exitosamente");
        
      },  (error: any)  => {
        console.log(error.error);
        Swal.close();
        this.alarma.showError(error.error)
      });



    }
    else{
      this.alarma.showWarning("Información incompleta, por favor verifique");

    }
  }

}
