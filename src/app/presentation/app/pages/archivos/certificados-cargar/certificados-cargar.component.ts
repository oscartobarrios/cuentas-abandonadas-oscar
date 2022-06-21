import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetArchivoUseCaseService } from 'src/app/domain/usecases/archivo/get-archivo-use-case.service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';
import { NotificationsService } from 'src/app/presentation/shared/services/notifications.service';
import { StorageService } from 'src/app/presentation/shared/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-certificados-cargar',
  templateUrl: './certificados-cargar.component.html',
  styleUrls: ['./certificados-cargar.component.css']
})
export class CertificadosCargarComponent implements OnInit {

  @ViewChild("modalInfo", {static: false}) myModalInfo: TemplateRef<any> | undefined;
  usuario : any;
  public files: File;
  certificacionesForm: FormGroup;
  typesCertificacion = ['Certificación representante legal','Certificación revisor fiscal', 'Otra'];
  public idCargue: number;
  displayedColumns: string[] = ['Fecha', 'Nombre', 'Estado', 'Observacion', 'Acciones', 'Descargar'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  rechazoForm!: FormGroup;
  certificacion: any;

  constructor( private alarma: SweetAlertService,
               private route: ActivatedRoute,
               private _getarchivousecase: GetArchivoUseCaseService,
               private _storageservice: StorageService,
               private modalService: NgbModal,
               private formBuilder: FormBuilder,
               private _notifications: NotificationsService) { }

  ngOnInit(): void {
    this.usuario = this._storageservice.getItem('payload').infoUsuario;

    this.idCargue = this.route.snapshot.params['id'];
    this.certificacionesForm = new FormGroup({
      nombre: new FormControl('',[Validators.required] ),
      file: new FormControl('',[Validators.required]),
    });

   this.getCertificaciones();

   this.rechazoForm = this.formBuilder.group({
    observacion: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(200)]]
    })

  }

  getCertificaciones(){
    this._getarchivousecase.ListarCertificaciones(this.idCargue).subscribe((ResultData) => {
      this.dataSource.data = ResultData.result;
      this.dataSource.paginator = this.paginator;
    });
  }


  onSubmit(){

    if(this.certificacionesForm.valid)
    {

      const {nombre, file} = this.certificacionesForm.value;

      var repetida = false;
      this.dataSource.data.forEach(element => {
        if(element.nombre == nombre && element.estado!="RECHAZADO")
        {
          this.alarma.showWarning("La certificación ya se encuentra cargada");
          repetida = true;
        }
      });

      if(!repetida){
        const data = {
          idCargue: this.idCargue,
          nombre: nombre,
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
          this.certificacionesForm.setValue({nombre: "  ", file: null});
          this._getarchivousecase.ListarCertificaciones(this.idCargue).subscribe((ResultData) => {
            this.dataSource.data = ResultData.result;
            this.dataSource.paginator = this.paginator;
          });

        },  (error: any)  => {
          console.log(error.error);
          Swal.close();
          this.alarma.showError(error.error.mensaje)
        });
      }

    }
    else{
      this.alarma.showWarning("Información incompleta, por favor verifique");
    }
  }

  onFileChange(event: any) {
    const fileList = event.target.files;
    if(fileList[0].size > 3000000)
    {
      event.srcElement.value = null;
      this.alarma.showWarning("El archivo debe pesar máximo 3000kb");
      return;
    }
    else{
      this.files = event.target.files[0];
    }
  }

  vobueno(element:any){
    var vobo = 1;
    if(element.vbnotesoreria == 1)
    {
      vobo = 0;
    }
    const data = {
      idCargueCertificacion: element.idCargueCertificacion,
      vbnotesoreria: vobo,
      estado: element.estado
    };

    this._getarchivousecase.ActualizarCertificacion(data)
      .subscribe((ResulData) =>{
      this.alarma.showSuccess("Transacción realizada con éxito");
      this.getCertificaciones();
    });

  }

  aproparCertificacion(element:any){
    const preloader = this._notifications.showPreloader();

    const data = {
      idCargueCertificacion: element.idCargueCertificacion,
      vbnotesoreria: element.vbnotesoreria,
      estado: "AUTORIZADO",
      observacion: element.observacion
    };

    this._getarchivousecase.ActualizarCertificacion(data)
      .subscribe((ResulData) =>{
      this.alarma.showSuccess("Certificado aprobado correctamente");
      this.getCertificaciones();
      this.modalService.dismissAll();
      preloader.close();
    });

  }

  rechazarCertificacion(form:any){
    const preloader = this._notifications.showPreloader();
    const {observacion} = form;

    const data = {
      idCargueCertificacion: this.certificacion.idCargueCertificacion,
      vbnotesoreria: this.certificacion.vbnotesoreria,
      estado: "RECHAZADO",
      observacion: observacion
    };
    this.modalService.dismissAll();
    this._getarchivousecase.ActualizarCertificacion(data)
      .subscribe((ResulData) =>{
      this.alarma.showSuccess("Certificado rechazado correctamente");
      this.getCertificaciones();
      preloader.close();

    });

  }

  openModal(element:any){
    this.certificacion = element;
    this.modalService.open(this.myModalInfo);
  }

}
