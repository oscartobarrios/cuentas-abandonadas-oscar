import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICalendario } from 'src/app/domain/models/calendario/calendario';
import { GetAdministrativoService } from 'src/app/domain/usecases/administrativo/administrativo.service';
import { GetCalendarioUseCaseService } from 'src/app/domain/usecases/calendario/get-calendario-use-case-service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';
import { NotificationsService } from 'src/app/presentation/shared/services/notifications.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarCalendarioComponent implements OnInit {

  public idCalendario: number;
  public fechaDesde: string;
  tipoCalendarioForm: FormGroup;
  tipoCalendario: any = [
    { codigo: 2, nombre: "Cesión"},
    { codigo: 13560023, nombre: "Reintegro"},
    { codigo: 1, nombre: "Traslado"},
    { codigo: 2045, nombre: "Valoración"},
  ]
  calendario: ICalendario;
  private regex: RegExp = new RegExp(/^\d{0,6}(\.\d{0,4})?$/);
  constructor(private _getCalendarioUseCaseService: GetCalendarioUseCaseService,
              private _notifications: NotificationsService,
              private _router: Router,
              private route: ActivatedRoute,
              private _servicioAdministrativo: GetAdministrativoService,
              private alarma: SweetAlertService) {
    this.formInit();
   }

  formInit(){
    this.tipoCalendarioForm = new FormGroup({
      "idTipoCargue": new FormControl(this.calendario?.idTipoCargue, Validators.required),
      "fechaDesde": new FormControl(this.calendario?.fechaDesde, Validators.required),
      "fechaHasta": new FormControl(this.calendario?.fechaHasta, Validators.required),
      "uvr":  new FormControl(this.calendario?.uvr),
      "fechaTrasMon": new FormControl(this.calendario?.fechaTrasMon),
      "fechaInicial": new FormControl(this.calendario?.fechaInicial),
      "fechaFinal": new FormControl(this.calendario?.fechaFinal),
      "fechaCorteCertificaciones": new FormControl(this.calendario?.fechaCorteCertificaciones),
      "fechaCorte": new FormControl(this.calendario?.fechaCorte ),
    })
  }

  setExtraValidation(){
    switch(this.tipoCalendarioForm.controls['idTipoCargue'].value)
    {
      case '2045': this.tipoCalendarioForm.controls["fechaInicial"].setValidators(Validators.required);
                  this.tipoCalendarioForm.controls["fechaFinal"].setValidators(Validators.required);
                  this.tipoCalendarioForm.controls["fechaCorteCertificaciones"].setValidators(Validators.required);
                  break;
      case '1': this.tipoCalendarioForm.controls["uvr"].setValidators([Validators.required, Validators.pattern(this.regex)]);
                this.tipoCalendarioForm.controls["fechaTrasMon"].setValidators(Validators.required);
                this.tipoCalendarioForm.controls["fechaCorteCertificaciones"].setValidators(Validators.required);
                this.tipoCalendarioForm.controls["fechaCorte"].setValidators(Validators.required);
                break;
      case '13560023': this.tipoCalendarioForm.controls["fechaCorteCertificaciones"].setValidators(Validators.required);
                       this.tipoCalendarioForm.controls["fechaCorte"].setValidators(Validators.required);
                       break;
      default:  this.tipoCalendarioForm.controls["fechaInicial"].clearValidators();
                this.tipoCalendarioForm.controls["fechaInicial"].updateValueAndValidity();
                this.tipoCalendarioForm.controls["fechaFinal"].clearValidators();
                this.tipoCalendarioForm.controls["fechaFinal"].updateValueAndValidity();
                this.tipoCalendarioForm.controls["uvr"].clearValidators();
                this.tipoCalendarioForm.controls["uvr"].updateValueAndValidity();
                this.tipoCalendarioForm.controls["fechaTrasMon"].clearValidators();
                this.tipoCalendarioForm.controls["fechaTrasMon"].updateValueAndValidity();
                this.tipoCalendarioForm.controls["fechaCorteCertificaciones"].clearValidators();
                this.tipoCalendarioForm.controls["fechaCorteCertificaciones"].updateValueAndValidity();
                this.tipoCalendarioForm.controls["fechaCorte"].clearValidators();
                this.tipoCalendarioForm.controls["fechaCorte"].updateValueAndValidity();
                break;
    }
  }

  ngOnInit(): void {
    this.idCalendario = this.route.snapshot.params['id'];
    this.tipoCalendarioForm.controls['idTipoCargue'].setValue(this.idCalendario);
    this.setExtraValidation()

    this.fechaDesde = this.route.snapshot.params['fechaDesde'];

    this._getCalendarioUseCaseService.GetCalendario(this.idCalendario, this.fechaDesde).subscribe((ResponseData) => {

      console.log(ResponseData);
      this.tipoCalendarioForm.controls['fechaDesde'].setValue(formatDate(ResponseData.fechaDesde,'yyyy-MM-dd',"en-US"));
      this.tipoCalendarioForm.controls['fechaHasta'].setValue(formatDate(ResponseData.fechaHasta,'yyyy-MM-dd',"en-US"));
      this.tipoCalendarioForm.controls['fechaInicial'].setValue(formatDate(ResponseData.fechaInicial,'yyyy-MM-dd',"en-US"));
      this.tipoCalendarioForm.controls['fechaFinal'].setValue(formatDate(ResponseData.fechaFinal,'yyyy-MM-dd',"en-US"));
      this.tipoCalendarioForm.controls['fechaCorte'].setValue(formatDate(ResponseData.fechaCorte,'yyyy-MM-dd',"en-US"));
      this.tipoCalendarioForm.controls['fechaCorteCertificaciones'].setValue(formatDate(ResponseData.fechaCorteCertificaciones,'yyyy-MM-dd',"en-US"));
      this.tipoCalendarioForm.controls['fechaTrasMon'].setValue(formatDate(ResponseData.fechaTrasMon,'yyyy-MM-dd',"en-US"));
      this.tipoCalendarioForm.controls['uvr'].setValue(ResponseData.uvr);
    },  (error: any)  => {
        console.log(error);
    });
  }

  validateDates() {
    if(this.tipoCalendarioForm.controls["fechaDesde"].value !==  undefined &&
       this.tipoCalendarioForm.controls["fechaHasta"].value !== undefined)
    {
      let existError = this.dateRangeValidator(this.tipoCalendarioForm.controls["fechaDesde"].value,
                                                  this.tipoCalendarioForm.controls["fechaHasta"].value)
      if(existError)
      {
        this.tipoCalendarioForm.controls['fechaDesde'].setErrors({'incorrect': true});
        this.tipoCalendarioForm.controls['fechaHasta'].setErrors({'incorrect': true});
      }
      else
      {
        this.tipoCalendarioForm.controls["fechaDesde"].clearValidators();
        this.tipoCalendarioForm.controls["fechaDesde"].updateValueAndValidity();
        this.tipoCalendarioForm.controls["fechaHasta"].clearValidators();
        this.tipoCalendarioForm.controls["fechaHasta"].updateValueAndValidity();
      }
    }
  }

  validateDatesIF() {
    if(this.tipoCalendarioForm.controls["fechaInicial"].value !==  undefined &&
       this.tipoCalendarioForm.controls["fechaFinal"].value !== undefined)
    {
      let existError = this.dateRangeValidator(this.tipoCalendarioForm.controls["fechaInicial"].value,
                                                  this.tipoCalendarioForm.controls["fechaFinal"].value)
      if(existError)
      {
        this.tipoCalendarioForm.controls['fechaInicial'].setErrors({'incorrect': true});
        this.tipoCalendarioForm.controls['fechaFinal'].setErrors({'incorrect': true});
      }
      else
      {
        this.tipoCalendarioForm.controls["fechaInicial"].clearValidators();
        this.tipoCalendarioForm.controls["fechaInicial"].updateValueAndValidity();
        this.tipoCalendarioForm.controls["fechaFinal"].clearValidators();
        this.tipoCalendarioForm.controls["fechaFinal"].updateValueAndValidity();
      }
    }
  }

  validateDatesTM() {
    if(this.tipoCalendarioForm.controls["fechaHasta"].value !==  undefined &&
    this.tipoCalendarioForm.controls["fechaTrasMon"].value !== undefined && this.tipoCalendarioForm.controls["fechaTrasMon"].value !== null)
    {
      let existError = this.dateRangeValidator(this.tipoCalendarioForm.controls["fechaHasta"].value,
                                                  this.tipoCalendarioForm.controls["fechaTrasMon"].value)
      if(existError)
      {
        this.tipoCalendarioForm.controls['fechaHasta'].setErrors({'incorrect': true});
        this.tipoCalendarioForm.controls['fechaTrasMon'].setErrors({'incorrect': true});
      }
      else
      {
        this.tipoCalendarioForm.controls["fechaHasta"].clearValidators();
        this.tipoCalendarioForm.controls["fechaHasta"].updateValueAndValidity();
        this.tipoCalendarioForm.controls["fechaTrasMon"].clearValidators();
        this.tipoCalendarioForm.controls["fechaTrasMon"].updateValueAndValidity();
      }
    }
    if(this.tipoCalendarioForm.controls["fechaCorte"].value !==  undefined &&
    this.tipoCalendarioForm.controls["fechaDesde"].value !== undefined)
    {
      let existError = this.dateRangeValidator(this.tipoCalendarioForm.controls["fechaCorte"].value,
                                                  this.tipoCalendarioForm.controls["fechaDesde"].value)
      if(existError)
      {
        this.tipoCalendarioForm.controls['fechaCorte'].setErrors({'incorrect': true});
        this.tipoCalendarioForm.controls['fechaDesde'].setErrors({'incorrect': true});
      }
      else
      {
        this.tipoCalendarioForm.controls["fechaCorte"].clearValidators();
        this.tipoCalendarioForm.controls["fechaCorte"].updateValueAndValidity();
        this.tipoCalendarioForm.controls["fechaDesde"].clearValidators();
        this.tipoCalendarioForm.controls["fechaDesde"].updateValueAndValidity();
      }
    }
  }

  dateRangeValidator(min: Date, max: Date) {
    if(min === undefined || max === undefined || max === null)
      return true;
    if(max <= min)
      return true;
    else
      return false;
  }

  onSubmit(){
    console.log(this.tipoCalendarioForm.value);
    if(!this.tipoCalendarioForm.invalid) {
      const preloader = this._notifications.showPreloader();
      console.log(this.tipoCalendarioForm.value);
      this._getCalendarioUseCaseService.EditarCalendario(this.tipoCalendarioForm.value).subscribe((res) => {
        console.log(res);
        if(res==0){
          this._notifications.showError("Por favor Valide los campos");
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

  enviarNotificacion() {
    const preloader = this._notifications.showPreloader();
    switch(this.tipoCalendarioForm.controls['idTipoCargue'].value)
    {
      case '2045': this._servicioAdministrativo.NotificacionInicioValoracion().subscribe((res) => {
                    console.log(res);
                    this.alarma.showSuccess("Notificación enviada exitosamente");
                    preloader.close();
                  },  (error: any)  => {
                    console.log(error);
                    preloader.close();
                  });
                  break;
      case '1': this._servicioAdministrativo.NotificacionInicioTraslado().subscribe((res) => {
                  console.log(res);
                  this.alarma.showSuccess("Notificación enviada exitosamente");
                  preloader.close();
                },  (error: any)  => {
                  console.log(error);
                  preloader.close();
                });
                break;
      case '13560023': this._servicioAdministrativo.NotificacionInicioReintegro().subscribe((res) => {
                          console.log(res);
                          this.alarma.showSuccess("Notificación enviada exitosamente");
                          preloader.close();
                        },  (error: any)  => {
                          console.log(error);
                          preloader.close();
                        });
                       break;
      default:  break;
    }
  }
}
