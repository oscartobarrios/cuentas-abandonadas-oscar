import { ICalendario } from './../../../../../domain/models/calendario/calendario';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { GetCalendarioUseCaseService } from 'src/app/domain/usecases/calendario/get-calendario-use-case-service';
import { NotificationsService } from 'src/app/presentation/shared/services/notifications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarCalendarioComponent implements OnInit {
  editarCalendarioForm: FormGroup;
  tipoCalendario: any = [
    { codigo:"2", nombre: "Cesión"},
    { codigo:"13560023", nombre: "Reintegro"},
    { codigo:"2045", nombre: "Valoración"},
    { codigo:"1", nombre: "Traslado"}
  ]
  calendario: ICalendario;
  constructor(private _getCalendarioUseCaseService: GetCalendarioUseCaseService,
              private _notifications: NotificationsService,
              private _router: Router) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.editarCalendarioForm = new FormGroup({
      "idCargue": new FormControl(this.calendario?.idTipoCargue, Validators.required),
      "fechaHasta": new FormControl(this.calendario?.fechaHasta, Validators.required),
      "fechaTrasMon": new FormControl("")
    })
  }

  onSubmit(){
    if(!this.editarCalendarioForm.invalid) {
      const preloader = this._notifications.showPreloader();
      this._getCalendarioUseCaseService.GenerarCalendario(this.editarCalendarioForm.value).subscribe((res) => {
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
      this.editarCalendarioForm.markAllAsTouched();
    }
  }

}
