import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetEntidadUseCaseService } from 'src/app/domain/usecases/entidad/get-entidad-use-case.service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';

@Component({
  selector: 'app-registrar-adjudicacion',
  templateUrl: './registrar-adjudicacion.component.html',
  styleUrls: ['./registrar-adjudicacion.component.css']
})
export class RegistrarAdjudicacionComponent implements OnInit {

  adjudicacionForm: FormGroup;
  entidades:any;
  tipos:any;

  constructor(private _entidadUseCase: GetEntidadUseCaseService,
              private alarma: SweetAlertService,) { 

    this._entidadUseCase.ListadoEntidades().subscribe(ResulData => {
      this.entidades = ResulData;
    });

    this.llenartipo();

    this.formInit();
  }

  ngOnInit(): void {
  }

  formInit(){

    this.adjudicacionForm = new FormGroup({
      fechainicial: new FormControl('', [Validators.required]),
      fechafinal: new FormControl('', [Validators.required]),
      entidad: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required]),
      valor: new FormControl('', [Validators.required]),
      });
  }

  llenartipo(){
    this.tipos = [
      {
        nombre:"Liquidez (3 meses)",
        id: 1
      },
      {
        nombre:"Largo Plazo (1 año)",
        id: 2
      }
    ]
  }

  onSubmit(){
    if (!this.adjudicacionForm.invalid) {

      console.log(this.adjudicacionForm.value);

    }
    else{
      this.alarma.showWarning("Información incompleta, por favor verifique");
    }

  }

}
