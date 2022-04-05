import { Router } from '@angular/router';
import { NotificationsService } from './../../../../shared/services/notifications.service';
import { GetInterfazContableUseCaseService } from './../../../../../domain/usecases/interfaz-contable/get-interfaz-contable-use-case-service';
import { InterfazContable } from './../../../../../domain/models/interfaz-contable/interfaz-contable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearInterfazContableComponent implements OnInit {
  interfazContableForm: FormGroup;
  tipoInterfaz: any = [
    { codigo:"CESION", nombre: "Cesión"},
    { codigo:"REINTEGRO", nombre: "Reintegro"},
    { codigo:"AUTORIZADA", nombre: "Traslado - autorizada"},
    { codigo:"VERIFICADO", nombre: "Traslado - verificado"},
    { codigo:"RECHAZADA", nombre: "Traslado - rechazada"},
    { codigo:"VALORACION", nombre: "Valoración"}
  ]
  meses: any = [
    { codigo: 1, nombre: "1 - Enero"},
    { codigo: 2, nombre: "2 - Febrero"},
    { codigo: 3, nombre: "3 - Marzo"},
    { codigo: 4, nombre: "4 - Abril"},
    { codigo: 5, nombre: "5 - Mayo"},
    { codigo: 6, nombre: "6 - Junio"},
    { codigo: 7, nombre: "7 - Julio"},
    { codigo: 8, nombre: "8 - Agosto"},
    { codigo: 9, nombre: "9 - Septiembre"},
    { codigo: 10, nombre: "10 - Octubre"},
    { codigo: 11, nombre: "11 - Noviembre"},
    { codigo: 12, nombre: "12 - Diciembre"},
  ]
  interfazContable: InterfazContable;
  constructor(private _getInterfazContableUseCaseService: GetInterfazContableUseCaseService,
              private _notifications: NotificationsService,
              private _router: Router) {
    this.formInit();
   }

  formInit(){
    this.interfazContableForm  = new FormGroup({
      "nmAnoInt": new FormControl(this.interfazContable?.nmAnoInt, Validators.required),
      "nmMesInt": new FormControl(this.interfazContable?.nmMesInt, Validators.required),
      "vaTipInt": new FormControl(this.interfazContable?.vaTipInt, Validators.required),
      "nmNroPro": new FormControl(0)
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if(!this.interfazContableForm.invalid) {
      const preloader = this._notifications.showPreloader();
      this._getInterfazContableUseCaseService.CrearInterfazContable(this.interfazContableForm.value).subscribe((res) => {
        this._router.navigate(['interfaz-contable-listar']);
        preloader.close();
      },  (error: any)  => {
        preloader.close();
      });
    }
    else{
      this.interfazContableForm.markAllAsTouched();
      console.log(this.interfazContableForm);
    }
  }
}
