import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecursoHumano } from 'src/app/domain/models/entidad-financiera/recurso-humano';
import { GetAdministrativoService } from 'src/app/domain/usecases/administrativo/administrativo.service';
import { GetEntidadUseCaseService } from 'src/app/domain/usecases/entidad/get-entidad-use-case.service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';
import { ModalDireccionComponent } from 'src/app/presentation/shared/modal-direccion/modal-direccion.component';
import { StorageService } from 'src/app/presentation/shared/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-actualizar-funcionario-entidad',
  templateUrl: './registrar-actualizar-funcionario-entidad.component.html',
  styleUrls: ['./registrar-actualizar-funcionario-entidad.component.css']
})
export class RegistrarActualizarFuncionarioEntidadComponent implements OnInit {

  recursoHumanoForm: FormGroup;
  recursoHumanoFormFiscalLegal: FormGroup;
  recursoHumano: RecursoHumano;
  entidades:any;
  archivo: File;
  public title: string;
  public identidad: number;
  idOrganizacion: any;
  usuario:any;
  public tipo: string;
  public rutaArchivo: string;

  tipoDocumento: any = [
    { codigo: "CC", nombre: "Cédula"},
    { codigo: "CE", nombre: "Cédula extranjería"},
    { codigo: "PAS", nombre: "Pasaporte"},
    { codigo: "NIT", nombre: "NIT"}
  ]
  
  constructor(private alarma: SweetAlertService,
              private _servicioAdministrativo: GetAdministrativoService,
              private _router : Router,
              private route: ActivatedRoute,
              private _storageservice: StorageService,
              private _modalService: NgbModal) {

  this.formInit();
  }

  ngOnInit(): void {
  this.cargardatos();
  }

  get file() {
    return this.recursoHumanoFormFiscalLegal.get('file');
  }

  fileChange(e) {
    
    const fileList = e.target.files;

    if(fileList[0].type != "application/pdf")
    {
      this.alarma.showWarning("El archivo debe ser en  formato pdf");
      return;
    }

    if (fileList.length > 0) {

      this.archivo = fileList[0];
    }
  }

  cargardatos(){

    this.usuario = this._storageservice.getItem('payload').infoUsuario;
    this.idOrganizacion = this.usuario.idOrganizacion;

    this.identidad = this.route.snapshot.params['id'];
    this.tipo = this.route.snapshot.params['tipo'];

    if(this.tipo === "SUBASTA")
    {
      this.title="Cuentas abandonadas - Registrar Funcionarios Autorizados Para Información de Subastas";
    }

    if(this.tipo === "TECNOLOGICO")
    {
      this.title="Cuentas abandonadas - Registrar Funcionarios Autorizados para Soporte Operativo y Tecnológico";
    }

    if(this.tipo === "APLICATIVO")
    {
      this.title="Cuentas abandonadas - Registrar Funcionarios Autorizados Para Acceso Al Aplicativo";
    }

    if(this.tipo === "FINANCIERO")
    {
      // this.title="Cuentas abandonadas - Registrar Funcionarios Autorizados Para Confirmar Operaciones de Cumplimiento Financiero";
      this.title="Cuentas abandonadas - Registrar Funcionarios Autorizados Para Cuentas Abandonadas";
    }

    if(this.tipo === "FISCAL")
    {
      this.title="Cuentas abandonadas - Registrar Revisor Fiscal";
    }

    if(this.tipo === "LEGAL")
    {
      this.title="Cuentas abandonadas - Registrar Representante legal";
    }



    if(this.identidad !=0){

      if(this.tipo === "SUBASTA")
      {
        this.title="Cuentas abandonadas - Actualizar Funcionarios Autorizados Para Información de Subastas";
      }

      if(this.tipo === "TECNOLOGICO")
      {
        this.title="Cuentas abandonadas - Actualizar Funcionarios Autorizados para Soporte Operativo y Tecnológico";
      }

      if(this.tipo === "APLICATIVO")
      {
        this.title="Cuentas abandonadas - Actualizar Funcionarios Autorizados Para Acceso Al Aplicativo";
      }

      if(this.tipo === "FINANCIERO")
      {
        // this.title="Cuentas abandonadas - Actualizar Funcionarios Autorizados Para Confirmar Operaciones de Cumplimiento Financiero";
        this.title="Cuentas abandonadas - Actualizar Funcionarios Autorizados Para Cuentas Abandonadas";
      }

      if(this.tipo === "FISCAL")
      {
        this.title="Cuentas abandonadas - Actualizar Revisor Fiscal";
      }

      if(this.tipo === "LEGAL")
      {
        this.title="Cuentas abandonadas - Actualizar Representante legal";
      }


      Swal.fire({
        title: 'Espere por favor, Consultando Datos del funcionario',
        allowOutsideClick:false,
        didOpen: () => {
          Swal.showLoading()
        }
      });

      this._servicioAdministrativo.ListarFuncionarioEntidadPorId(this.identidad).subscribe((ResponseData) => {

        console.log(ResponseData);
        this.rutaArchivo = "";

          this.recursoHumanoFormFiscalLegal.controls["PrimerNombre"].setValue(ResponseData.primerNombre);
          this.recursoHumanoFormFiscalLegal.controls["SegundoNombre"].setValue(ResponseData.segundoNombre);
          this.recursoHumanoFormFiscalLegal.controls["TipoIdentificacion"].setValue(ResponseData.tipoIdentificacion);
          this.recursoHumanoFormFiscalLegal.controls["Identificacion"].setValue(ResponseData.identificacion);
          this.recursoHumanoFormFiscalLegal.controls["PrimerApellido"].setValue(ResponseData.primerApellido);
          this.recursoHumanoFormFiscalLegal.controls["SegundoApellido"].setValue(ResponseData.segundoApellido);
          this.recursoHumanoFormFiscalLegal.controls["Area"].setValue(ResponseData.area);
          this.recursoHumanoFormFiscalLegal.controls["DireccionCorrespondencia"].setValue(ResponseData.direccionCorrespondencia);
          this.recursoHumanoFormFiscalLegal.controls["TelefonoArea"].setValue(ResponseData.telefonoArea);
          this.recursoHumanoFormFiscalLegal.controls["TelefonoNumero"].setValue(ResponseData.telefonoNumero);
          this.recursoHumanoFormFiscalLegal.controls["TelefonoExtension"].setValue(ResponseData.telefonoExtension);
          this.recursoHumanoFormFiscalLegal.controls["Celular"].setValue(ResponseData.celular);
          this.recursoHumanoFormFiscalLegal.controls["Email"].setValue(ResponseData.email);
          this.rutaArchivo = ResponseData.archivo;
  
          if(ResponseData.estado == 1)
          {
            this.recursoHumanoFormFiscalLegal.controls["Estado"].setValue(true);
          }else{
            this.recursoHumanoFormFiscalLegal.controls["Estado"].setValue(false);
          }
          
       
          this.recursoHumanoForm.controls["PrimerNombre"].setValue(ResponseData.primerNombre);
          this.recursoHumanoForm.controls["SegundoNombre"].setValue(ResponseData.segundoNombre);
          this.recursoHumanoForm.controls["TipoIdentificacion"].setValue(ResponseData.tipoIdentificacion);
          this.recursoHumanoForm.controls["Identificacion"].setValue(ResponseData.identificacion);
          this.recursoHumanoForm.controls["PrimerApellido"].setValue(ResponseData.primerApellido);
          this.recursoHumanoForm.controls["SegundoApellido"].setValue(ResponseData.segundoApellido);
          this.recursoHumanoForm.controls["Area"].setValue(ResponseData.area);
          this.recursoHumanoForm.controls["DireccionCorrespondencia"].setValue(ResponseData.direccionCorrespondencia);
          this.recursoHumanoForm.controls["TelefonoArea"].setValue(ResponseData.telefonoArea);
          this.recursoHumanoForm.controls["TelefonoNumero"].setValue(ResponseData.telefonoNumero);
          this.recursoHumanoForm.controls["TelefonoExtension"].setValue(ResponseData.telefonoExtension);
          this.recursoHumanoForm.controls["Celular"].setValue(ResponseData.celular);
          this.recursoHumanoForm.controls["Email"].setValue(ResponseData.email);
  
          if(ResponseData.estado == 1)
          {
            this.recursoHumanoForm.controls["Estado"].setValue(true);
          }else{
            this.recursoHumanoForm.controls["Estado"].setValue(false);
          }
          
        
        Swal.close()
      },  (error: any)  => {
        console.log(error);
        Swal.close();
        this.alarma.showError(error);
        
      });

    }

  }

  formInit() {
    this.recursoHumanoForm = new FormGroup({
      
      TipoIdentificacion : new FormControl(this.recursoHumano?.TipoIdentificacion, Validators.required),
      Identificacion : new FormControl(this.recursoHumano?.Identificacion,[Validators.required]),
      PrimerNombre : new FormControl(this.recursoHumano?.PrimerNombre, [Validators.required, Validators.maxLength(15)]),
      SegundoNombre : new FormControl('', Validators.maxLength(15)),
      PrimerApellido : new FormControl(this.recursoHumano?.PrimerApellido, [Validators.required, Validators.maxLength(15)]),
      SegundoApellido : new FormControl('', Validators.maxLength(15)),
      Area : new FormControl(''),
      DireccionCorrespondencia : new FormControl(this.recursoHumano?.DireccionCorrespondencia, Validators.required),
      TelefonoArea : new FormControl(''),
      TelefonoNumero : new FormControl(this.recursoHumano?.TelefonoNumero, [Validators.required]),
      TelefonoExtension : new FormControl(''),
      Celular : new FormControl(this.recursoHumano?.Celular, [Validators.required]),
      Email : new FormControl(this.recursoHumano?.Email, [Validators.required]),
      Estado : new FormControl(true),
      
    });

    this.recursoHumanoFormFiscalLegal = new FormGroup({
      
      TipoIdentificacion : new FormControl(this.recursoHumano?.TipoIdentificacion, Validators.required),
      Identificacion : new FormControl(this.recursoHumano?.Identificacion, Validators.required),
      PrimerNombre : new FormControl(this.recursoHumano?.PrimerNombre, [Validators.required, Validators.maxLength(15)]),
      SegundoNombre : new FormControl('', Validators.maxLength(15)),
      PrimerApellido : new FormControl(this.recursoHumano?.PrimerApellido, [Validators.required, Validators.maxLength(15)]),
      SegundoApellido : new FormControl('', Validators.maxLength(15)),
      Area : new FormControl(''),
      DireccionCorrespondencia : new FormControl(this.recursoHumano?.DireccionCorrespondencia, Validators.required),
      TelefonoArea : new FormControl(''),
      TelefonoNumero : new FormControl(this.recursoHumano?.TelefonoNumero, [Validators.required]),
      TelefonoExtension : new FormControl(''),
      Celular : new FormControl(this.recursoHumano?.Celular, [Validators.required]),
      Email : new FormControl(this.recursoHumano?.Email, [Validators.required]),
      Estado : new FormControl(true),
      file: new FormControl('', [Validators.required]),
    });

  }

  onSubmit(){

    debugger;

    if(this.recursoHumanoForm.valid)
    {

      const{TipoIdentificacion,Identificacion,PrimerNombre,SegundoNombre,PrimerApellido,SegundoApellido,Area,DireccionCorrespondencia,
        TelefonoArea,TelefonoNumero,TelefonoExtension,Celular,Email,Estado} = this.recursoHumanoForm.value;

      var telextension = 0;
      var estadocheck = 0;

      if(TelefonoExtension != '')
      {
        telextension = TelefonoExtension;
      }

      if (TipoIdentificacion === 'Cédula')
      {
        if(Identificacion.toString().length > 11)
        {
          this.alarma.showInfo("El campo Identificación no debe ser mayor a 11 caracteres y es requerido");
          return;
        }
        
      }
      else if (TipoIdentificacion === 'Cédula extranjería')
      {
        if(Identificacion.toString().length > 6)
        {
          this.alarma.showInfo("El campo Identificación no debe ser mayor a 6 caracteres y es requerido");
          return;
        }
  
      }
      else
      {
        if(Identificacion.toString().length > 9)
        {
          this.alarma.showInfo("El campo Identificación no debe ser mayor a 9 caracteres y es requerido");
          return;
        }
  
        
      }

        if(Celular.toString().length > 10)
        {
          this.alarma.showInfo("El campo Celular no debe ser mayor a 10 caracteres");
          return;
        }

        //VALIDAR EMAIL
        var EMAIL_REGEX = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var rpt = EMAIL_REGEX.test(Email);

        if(rpt == false){
          this.alarma.showInfo("Correo Electrónico no valido");
          return;
        }


      Swal.fire({
        title: 'Espere por favor, Guardando Datos',
        allowOutsideClick:false,
        didOpen: () => {
            Swal.showLoading()
          }
        });

        if(Estado === true)
        {
          estadocheck = 1;
        }else{
          estadocheck = 0;
        }


        const data:any = {
          idFuncionario: this.identidad,
          idOrganizacion: this.idOrganizacion,
          tipoIdentificacion: TipoIdentificacion,
          identificacion: Identificacion,
          primerNombre:PrimerNombre,
          segundoNombre:SegundoNombre,
          primerApellido:PrimerApellido,
          segundoApellido:SegundoApellido,
          area:Area,
          direccionCorrespondencia:DireccionCorrespondencia,
          telefonoArea:TelefonoArea,
          telefonoNumero:TelefonoNumero,
          telefonoExtension:telextension,
          celular:Celular,
          email:Email,
          tipoFuncionario:this.tipo,
          estado : estadocheck,
          archivo: this.rutaArchivo
        };

        console.log(data);

        this._servicioAdministrativo.insertarActualizarFuncionarioEntidad(data).subscribe((ResponseData) => {
          Swal.close();

          if(this.identidad ==0){
          this.alarma.showSuccess("Guardado exitosamente");
          }
          else{
            this.alarma.showSuccess("Actualizado exitosamente");
          }

          this._router.navigate([`/entidad-financiera`]);
          
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


  onSubmit2(){

    debugger;

    const{TipoIdentificacion,Identificacion,PrimerNombre,SegundoNombre,PrimerApellido,SegundoApellido,Area,DireccionCorrespondencia,
      TelefonoArea,TelefonoNumero,TelefonoExtension,Celular,Email,Estado} = this.recursoHumanoFormFiscalLegal.value;

    if(Celular != null && TipoIdentificacion != null && Identificacion != null && PrimerNombre != null && PrimerApellido != null && TelefonoNumero != null && DireccionCorrespondencia != null && Email != "")
    {
      var telextension = 0;
      var estadocheck = 0;

      if(TelefonoExtension != '')
      {
        telextension = TelefonoExtension;
      }

      if (TipoIdentificacion === 'Cédula')
      {
        if(Identificacion.toString().length > 11)
        {
          this.alarma.showInfo("El campo Identificación no debe ser mayor a 11 caracteres y es requerido");
          return;
        }
        
      }
      else if (TipoIdentificacion === 'Cédula extranjería')
      {
        if(Identificacion.toString().length > 6)
        {
          this.alarma.showInfo("El campo Identificación no debe ser mayor a 6 caracteres y es requerido");
          return;
        }
  
      }
      else
      {
        if(Identificacion.toString().length > 9)
        {
          this.alarma.showInfo("El campo Identificación no debe ser mayor a 9 caracteres y es requerido");
          return;
        }
  
        
      }

        if(Celular.toString().length > 10)
        {
          this.alarma.showInfo("El campo Celular no debe ser mayor a 10 caracteres");
          return;
        }

        //VALIDAR EMAIL
        var EMAIL_REGEX = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var rpt = EMAIL_REGEX.test(Email);

        if(rpt == false){
          this.alarma.showInfo("Correo Electrónico no valido");
          return;
        }


      Swal.fire({
        title: 'Espere por favor, Guardando Datos',
        allowOutsideClick:false,
        didOpen: () => {
            Swal.showLoading()
          }
        });

        if(Estado === true)
        {
          estadocheck = 1;
        }else{
          estadocheck = 0;
        }


        const data:any = {
          idFuncionario: this.identidad,
          idOrganizacion: this.idOrganizacion,
          tipoIdentificacion: TipoIdentificacion,
          identificacion: Identificacion,
          primerNombre:PrimerNombre,
          segundoNombre:SegundoNombre,
          primerApellido:PrimerApellido,
          segundoApellido:SegundoApellido,
          area:Area,
          direccionCorrespondencia:DireccionCorrespondencia,
          telefonoArea:TelefonoArea,
          telefonoNumero:TelefonoNumero,
          telefonoExtension:telextension,
          celular:Celular,
          email:Email,
          tipoFuncionario:this.tipo,
          estado : estadocheck,
          archivo: this.rutaArchivo
        };

        console.log(data);

        this._servicioAdministrativo.insertarActualizarFuncionarioEntidad(data).subscribe((ResponseData) => {
          Swal.close();

          if(this.identidad ==0){
          this.alarma.showSuccess("Guardado exitosamente");
          }
          else{
            this.alarma.showSuccess("Actualizado exitosamente");
          }

          this._router.navigate([`/entidad-financiera`]);
          
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

  onSubmitFiscalLegal(){

    if(this.archivo === undefined)
    {
      if(this.rutaArchivo != null)
      {
        this.onSubmit2();
        return;
      }
    }
    
    if(this.recursoHumanoFormFiscalLegal.valid)
    {

      const{TipoIdentificacion,Identificacion,PrimerNombre,SegundoNombre,PrimerApellido,SegundoApellido,Area,DireccionCorrespondencia,
        TelefonoArea,TelefonoNumero,TelefonoExtension,Celular,Email,Estado} = this.recursoHumanoFormFiscalLegal.value;

      var telextension = 0;
      var estadocheck = 0;

      if(TelefonoExtension != '')
      {
        telextension = TelefonoExtension;
      }

      if (TipoIdentificacion === 'Cédula')
      {
        if(Identificacion.toString().length > 11)
        {
          this.alarma.showInfo("El campo Identificación no debe ser mayor a 11 caracteres y es requerido");
          return;
        }
        
      }
      else if (TipoIdentificacion === 'Cédula extranjería')
      {
        if(Identificacion.toString().length > 6)
        {
          this.alarma.showInfo("El campo Identificación no debe ser mayor a 6 caracteres y es requerido");
          return;
        }
  
      }
      else
      {
        if(Identificacion.toString().length > 9)
        {
          this.alarma.showInfo("El campo Identificación no debe ser mayor a 9 caracteres y es requerido");
          return;
        }
  
        
      }

      if(Celular.toString().length > 10)
        {
          this.alarma.showInfo("El campo Celular no debe ser mayor a 10 caracteres");
          return;
        }

        //VALIDAR EMAIL
        var EMAIL_REGEX = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var rpt = EMAIL_REGEX.test(Email);

        if(rpt == false){
          this.alarma.showInfo("Correo Electrónico no valido");
          return;
        }


      Swal.fire({
        title: 'Espere por favor, Guardando Datos',
        allowOutsideClick:false,
        didOpen: () => {
            Swal.showLoading()
          }
        });

        if(Estado === true)
        {
          estadocheck = 1;
        }else{
          estadocheck = 0;
        }


        const data:any = {
          idFuncionario: this.identidad,
          idOrganizacion: this.idOrganizacion,
          tipoIdentificacion: TipoIdentificacion,
          identificacion: Identificacion,
          primerNombre:PrimerNombre,
          segundoNombre:SegundoNombre,
          primerApellido:PrimerApellido,
          segundoApellido:SegundoApellido,
          area:Area,
          direccionCorrespondencia:DireccionCorrespondencia,
          telefonoArea:TelefonoArea,
          telefonoNumero:TelefonoNumero,
          telefonoExtension:telextension,
          celular:Celular,
          email:Email,
          tipoFuncionario:this.tipo,
          estado : estadocheck,
          file: this.archivo
        };

        console.log(data);

        this._servicioAdministrativo.insertarActualizarFuncionarioEntidadFiscalLegal(data).subscribe((ResponseData) => {
          Swal.close();

          if(this.identidad ==0){
          this.alarma.showSuccess("Guardado exitosamente");
          }
          else{
            this.alarma.showSuccess("Actualizado exitosamente");
          }

          this._router.navigate([`/entidad-financiera`]);
          
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

  enviarDatos(){
    
  }
  openModal(content:any) {
    const modalRef = this._modalService.open(ModalDireccionComponent);
    modalRef.result.then((result) => {
      if (result) {
        this.recursoHumanoForm.controls['DireccionCorrespondencia'].setValue(result);
      }
    });
  }
  openModalFiscalLegal(content:any) {
    const modalRef = this._modalService.open(ModalDireccionComponent);
    modalRef.result.then((result) => {
      if (result) {
        this.recursoHumanoFormFiscalLegal.controls['DireccionCorrespondencia'].setValue(result);
      }
    });
  }

}
