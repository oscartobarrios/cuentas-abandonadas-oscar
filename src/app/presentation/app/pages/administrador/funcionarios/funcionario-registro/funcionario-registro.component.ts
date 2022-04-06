import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FuncionarioModelo } from 'src/app/domain/models/administrativo/funcionario';
import { ICargo } from 'src/app/domain/models/administrativo/icargo';
import { IUsuario } from 'src/app/domain/models/administrativo/iusuario';
import { GetAdministrativoService } from 'src/app/domain/usecases/administrativo/administrativo.service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-funcionario-registro',
  templateUrl: './funcionario-registro.component.html',
  styleUrls: ['./funcionario-registro.component.css']
})
export class FuncionarioRegistroComponent implements OnInit {

  cargos:ICargo[];
  usuarios: IUsuario[];
  public files: File;
  funcionarioForm: FormGroup;
  funcionario: FuncionarioModelo;
  public title: string;
  public idfuncionario: number;
  public rutafoto = "";

  constructor(private _servicioAdministrativo: GetAdministrativoService,
              private alarma: SweetAlertService,
              private _router : Router,
              private route: ActivatedRoute) { 
    this.formInit();

    this._servicioAdministrativo.ListarCargos().subscribe(ResulData => {
      this.cargos = ResulData;
    });

    this._servicioAdministrativo.ListarUsuarios().subscribe(ResulData => {
      this.usuarios = ResulData;
    });

  }

  ngOnInit(): void {
    this.cargardatos();
  }

  cargardatos(){
    this.idfuncionario = this.route.snapshot.params['id'];
    this.title="Cuentas abandonadas - Registrar funcionario";
    this.rutafoto="";
    if(this.idfuncionario !=0){
      this.title="Cuentas abandonadas - Actualizar Funcionario";

      Swal.fire({
        title: 'Espere por favor, Consultando Datos del Cargo',
        allowOutsideClick:false,
        didOpen: () => {
          Swal.showLoading()
        }
      });

      this._servicioAdministrativo.consultarFuncionario(this.idfuncionario).subscribe((ResponseData) => {

        console.log(ResponseData);
        this.funcionarioForm.controls["Usuario"].setValue(ResponseData.idUsuario);
        this.funcionarioForm.controls["Cargo"].setValue(ResponseData.idCargo);
        this.rutafoto = ResponseData.foto;
        
        

        Swal.close()
      },  (error: any)  => {
        console.log(error);
        Swal.close();
        this.alarma.showError(error);
        
      });

    }
  }

  formInit(){

    this.funcionarioForm = new FormGroup({
      Usuario: new FormControl('', [Validators.required]),
      Cargo: new FormControl('', [Validators.required]),
      foto: new FormControl('',[Validators.required]), 

      
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
        idFuncionario: this.idfuncionario,
        idCargo: Cargo,
        idUsuario: Usuario,
        file: this.files
      };

      Swal.fire({
        title: 'Espere por favor, Guardando Datos',
        allowOutsideClick:false,
        didOpen: () => {
            Swal.showLoading()
          }
        });
        
      this._servicioAdministrativo.insertarFuncionario(data).subscribe((ResponseData) => {
        Swal.close()
        this.alarma.showSuccess("Guardado exitosamente");
        this._router.navigate([`/funcionario`]);
        
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

  onFileChange(event: any) {

    debugger;
    this.files = event.target.files[0];

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
      }
    }
  }

}
