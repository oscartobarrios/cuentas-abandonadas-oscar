import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {GetArchivoUseCaseService} from '../../../../../domain/usecases/archivo/get-archivo-use-case.service';
import {StorageService} from '../../../../shared/services/storage.service';
import {ICargue} from '../../../../../domain/models/archivo/icargue';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {NotificationsService} from '../../../../shared/services/notifications.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {GetIpService} from '../../../../shared/services/get-ip.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {newArray} from '@angular/compiler/src/util';
import Swal from 'sweetalert2';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  displayedColumns: string[] = ['Usuario', 'Nombre', 'Tipo', 'NroCuentas', 'SaldoInicial', 'Remuneración', 'Fecha', 'Estado', 'Actions'];
  dataSource = new MatTableDataSource<ICargue>();
  idOrganizacion: any;
  usuario:any;
  ip: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _getarchivousecase: GetArchivoUseCaseService,
              private _storageservice: StorageService,
              private _notifications: NotificationsService,
              public dialog: MatDialog,
              private _ipservice: GetIpService,
              private _router: Router,
              private _http: HttpClient,
              private alarma: SweetAlertService,
  ) {
  }

  ngOnInit(): void {

    this._http.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
     this.ip = res.ip;
    });

    this.usuario = this._storageservice.getItem('payload').infoUsuario;
    this.idOrganizacion = this.usuario.idOrganizacion;
    const preloader = this._notifications.showPreloader();
    this._getarchivousecase.Listar(this.idOrganizacion).subscribe((ResultData) => {
      this.dataSource.data = ResultData;
      this.dataSource.paginator = this.paginator;
      preloader.close();
    });
  }


  cambiarestado(idCargue:any, tipoestado:string): void{

    const validar = confirm("¿ Esta seguro que desea confirmar el cargue ?");

    if(validar){
      const preloader = this._notifications.showPreloader();
      this._getarchivousecase.CambiarEstadoCargue({idCargue,
                                                      usuario: this.usuario.usuario,
                                                      ip: this.ip || '193.168.1.1',
                                                      operacion: tipoestado})
                              .subscribe((ResulData) =>{
                                alert(ResulData?.mensaje);
                                window.location.reload();
                              });
      preloader.close();
    }


  }

  openError(id: any): void {
    const dialogRef = this.dialog.open(ErrorArchivoDialogComponent, {
      data: {idCargue: id}
    });
  }

  openErrorPantalla(id: any, archivo: any): void {
    Swal.fire({
      title: 'Espere por favor, Guardando Datos',
      allowOutsideClick:false,
      didOpen: () => {
          Swal.showLoading()
        }
      });

    this._getarchivousecase.LogCargueDescarga(id).subscribe((response) => {
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(response);
      downloadLink.setAttribute('download', "LOG-ERRORES-"+archivo);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      Swal.close();
    }, error =>{
      this.alarma.showError(error);
      Swal.close();
    })

  }


}

export interface DialogData {
  idCargue: number;
}

@Component({
  selector: 'app-errorarchivo-dialog',
  templateUrl: './app-errorarchivo-dialog.html',
  styles: [`
  table {
  width: 100%;
  }
  th.mat-sort-header-sorted {
    color: black;
  }
  .mat-column-id{
    width: 70px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  `]
})



export class ErrorArchivoDialogComponent implements  OnInit {
  displayedColumns: string[] = ['mensaje'];
  dataSource: any[] = new Array();
  longitud : number = 0;
 // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);




  constructor(
    public dialogRef: MatDialogRef<ErrorArchivoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _getarchivousecase: GetArchivoUseCaseService,
    private _notifications: NotificationsService,

  ) {

  }
  // tslint:disable-next-line:typedef
  ngOnInit() {
    const preloader = this._notifications.showPreloader();
    this._getarchivousecase.LogCargue(this.data.idCargue).subscribe((ResultData) => {
      const data: any[] = ResultData;
      this.dataSource = data;
      this.longitud = ResultData.length;
      preloader.close();
    });
  }
  ngAfterViewInit(): void {
    //this.dataSource.paginator = this.paginator;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
