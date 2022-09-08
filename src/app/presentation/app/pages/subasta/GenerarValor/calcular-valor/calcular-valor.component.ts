import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetSubastaService } from 'src/app/domain/usecases/subasta/subasta.service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calcular-valor',
  templateUrl: './calcular-valor.component.html',
  styleUrls: ['./calcular-valor.component.css']
})
export class CalcularValorComponent implements OnInit {

  valorForm: FormGroup;
  constructor(private alarma: SweetAlertService,
              private _servicioSubasta: GetSubastaService,
              private _router : Router,) {
    this.formInit();
   }

  ngOnInit(): void {
  }

  formInit(){

    this.valorForm = new FormGroup({
      fecha: new FormControl('', [Validators.required]),
      });
  }

  onSubmit(){
    if (!this.valorForm.invalid) {

      const{fecha} = this.valorForm.value;
      
      const data:any = {
        fecha: fecha      
      };

      Swal.fire({
        title: 'Espere por favor, Generando valor subasta',
        allowOutsideClick:false,
        didOpen: () => {
            Swal.showLoading()
          }
        });

      this._servicioSubasta.generarvalorsubasta(data).subscribe((ResponseData) => {
        Swal.close()
        this.alarma.showSuccess("Generado el valor de subasta exitosamente");
        this._router.navigate([`/listarvalorsubasta`]);
        
      },  (error: any)  => {
        console.log(error);
        Swal.close();
        this.alarma.showError(error.error.mensaje);
        
      });

    }
    else{
      this.alarma.showWarning("Información incompleta, por favor verifique");
    }

  }
  
}
