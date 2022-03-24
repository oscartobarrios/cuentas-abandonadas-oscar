import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICargo } from 'src/app/domain/models/administrativo/icargo';
import { GetAdministrativoService } from 'src/app/domain/usecases/administrativo/administrativo.service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cargo-registro',
  templateUrl: './cargo-registro.component.html',
  styleUrls: ['./cargo-registro.component.css']
})
export class CargoRegistroComponent implements OnInit {

  cargoForm: FormGroup;
  cargo: ICargo;
  public idcargo: number;
  public title: string;

  constructor(private alarma: SweetAlertService,
              private _servicioAdministrativo: GetAdministrativoService,
              private _router : Router,
              private route: ActivatedRoute) { 
    this.formInit();
  }

  ngOnInit(): void {
    this.cargardatos();
  }

  cargardatos(){
    this.idcargo = this.route.snapshot.params['id'];
    this.title="Registrar Cargo";
    if(this.idcargo !=0){
      this.title="Actualizar Cargo";

      Swal.fire({
        title: 'Espere por favor, Consultando Datos del Cargo',
        allowOutsideClick:false,
        didOpen: () => {
          Swal.showLoading()
        }
      });

      this._servicioAdministrativo.consultarCargo(this.idcargo).subscribe((ResponseData) => {

        this.cargoForm.controls["nombre"].setValue(ResponseData.nombre);

        Swal.close()
      },  (error: any)  => {
        console.log(error);
        Swal.close();
        this.alarma.showError(error);
        
      });

    }

  }

  formInit(){

    this.cargoForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      });
  }

  onSubmit(){

    
    if (!this.cargoForm.invalid) {

      const{nombre} = this.cargoForm.value;
      const data:ICargo = {
        idCargo: this.idcargo,
        nombre: nombre
      };

      Swal.fire({
        title: 'Espere por favor, Guardando Datos',
        allowOutsideClick:false,
        didOpen: () => {
            Swal.showLoading()
          }
        });
        
      this._servicioAdministrativo.insertarCargo(data).subscribe((ResponseData) => {
        Swal.close()
        this.alarma.showSuccess("Guardado exitosamente");
        this._router.navigate([`/cargo`]);
        
      },  (error: any)  => {
        console.log(error);
        Swal.close();
        this.alarma.showError(error);
        
      });

    }
    else{
      this.alarma.showWarning("Información incompleta, por favor verifique");
    }

  }

}
