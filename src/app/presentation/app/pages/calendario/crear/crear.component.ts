import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ICalendario } from 'src/app/domain/models/calendario/calendario';
import { InterfazContable } from 'src/app/domain/models/interfaz-contable/interfaz-contable';
import { InterfazContableList } from 'src/app/domain/models/interfaz-contable/interfaz-contable-list';
import { GetCalendarioUseCaseService } from 'src/app/domain/usecases/calendario/get-calendario-use-case-service';
import { GetInterfazContableUseCaseService } from 'src/app/domain/usecases/interfaz-contable/get-interfaz-contable-use-case-service';
import { NotificationsService } from 'src/app/presentation/shared/services/notifications.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearCalendarioComponent implements OnInit {
  interfazContableForm: FormGroup;
  tipoCalendarioForm: FormGroup;
  tipoArchivo: any = [
    // { codigo:"CESION", nombre: "Cesión"},
    // { codigo:"REINTEGRO", nombre: "Reintegro"},
    // { codigo:"AUTORIZADA", nombre: "Traslado - autorizada"},
    // { codigo:"VERIFICADO", nombre: "Traslado - verificado"},
    // { codigo:"RECHAZADA", nombre: "Traslado - rechazada"},
    { codigo:"2045", nombre: "Valoración"}
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
  
  calendario: ICalendario;
  constructor(private _getCalendarioUseCaseService: GetCalendarioUseCaseService,
              private _notifications: NotificationsService,
              private _router: Router) {
    this.formInit();
   }

  formInit(){


    this.tipoCalendarioForm = new FormGroup({
      "idCargue": new FormControl(this.calendario?.idTipoCargue, Validators.required),
      "fechaDesde": new FormControl(this.calendario?.fechaDesde, Validators.required),
      "fechaHasta": new FormControl(this.calendario?.fechaHasta, Validators.required),
      "fechaInicial": new FormControl(this.calendario?.fechaInicial, Validators.required),
      "fechaFinal": new FormControl(this.calendario?.fechaFinal,Validators.required),
      "uvr":  new FormControl(0),
      "fechaTrasMon": new FormControl("")
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if(!this.tipoCalendarioForm.invalid) {
      const preloader = this._notifications.showPreloader();
      this._getCalendarioUseCaseService.GenerarCalendario(this.tipoCalendarioForm.value).subscribe((res) => {
        console.log(res);
        if(res==0){
          this._notifications.showError("Por favor Valide la fecha Desde");
          
        }else{
          this._router.navigate(['calendario']);
        }
        
        preloader.close();
      },  (error: any)  => {
        console.log(error);
        preloader.close();
      });
    }
    else{
      this.tipoCalendarioForm.markAllAsTouched();
      console.log(this.tipoCalendarioForm);
    }
  }
}
