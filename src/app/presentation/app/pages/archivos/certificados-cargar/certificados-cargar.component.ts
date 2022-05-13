import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { GetArchivoUseCaseService } from 'src/app/domain/usecases/archivo/get-archivo-use-case.service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';
import { StorageService } from 'src/app/presentation/shared/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-certificados-cargar',
  templateUrl: './certificados-cargar.component.html',
  styleUrls: ['./certificados-cargar.component.css']
})
export class CertificadosCargarComponent implements OnInit {

  usuario : any;
  public files: File;
  certificacionesForm: FormGroup;
  public idCargue: number;
  displayedColumns: string[] = ['Id','Fecha', 'Nombre', 'Actions'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;



  constructor( private alarma: SweetAlertService,
               private route: ActivatedRoute,
               private _getarchivousecase: GetArchivoUseCaseService,
               private _storageservice: StorageService) { }

  ngOnInit(): void {
    this.usuario = this._storageservice.getItem('payload').infoUsuario;

    this.idCargue = this.route.snapshot.params['id'];
    this.certificacionesForm = new FormGroup({
      nombre: new FormControl('',[Validators.required]),
      file: new FormControl('',[Validators.required]),
    });

    this._getarchivousecase.ListarCertificaciones(this.idCargue).subscribe((ResultData) => {
      this.dataSource.data = ResultData.result;
      this.dataSource.paginator = this.paginator;
    });

  }


  onSubmit(){

    if(this.certificacionesForm.valid)
    {

      const {nombre, file} = this.certificacionesForm.value;

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
        this.alarma.showError(error.error)
      });



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




}
