import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { ICargue } from './../../../../domain/models/archivo/icargue';
import { NotificationsService } from './../../../shared/services/notifications.service';
import { StorageService } from './../../../shared/services/storage.service';
import { GetArchivoUseCaseService } from './../../../../domain/usecases/archivo/get-archivo-use-case.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConsoleLoggerService } from 'src/app/presentation/shared/services/console-logger.service';
import { SweetAlertService } from 'src/app/infraestructure/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-autorizacion-cargues',
  templateUrl: './autorizacion-cargues.component.html',
  styleUrls: ['./autorizacion-cargues.component.css']
})
export class AutorizacionCarguesComponent implements OnInit {
  displayedColumns: string[] = ['Entidad', 'NombreArchivo', 'FechaCargue', 'TipoArchivo', 'Saldoinicial', 'Estado', 'Acciones'];
  idOrganizacion: any;
  usuario : any;
  cargues = new MatTableDataSource<ICargue>();
  carguesPendienteAutorizacion: ICargue[];
  carguesCargaProcesada: ICargue[];
  ip: any;


  @ViewChild(MatPaginator) paginator:  MatPaginator;

  constructor(private _getarchivousecase: GetArchivoUseCaseService,
              private _storageservice: StorageService,
              private _notifications: NotificationsService,
              private _http: HttpClient,
              private _router : Router,
              private alarma: SweetAlertService,) { }

  ngOnInit(): void {

    this._http.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
     this.ip = res.ip;
    });

    this.usuario = this._storageservice.getItem('payload').infoUsuario;
    this.idOrganizacion = this.usuario.idOrganizacion;
    const preloader = this._notifications.showPreloader();

   if(this.usuario.idPerfil == "10")
   {
    this._getarchivousecase.CarguesSebra().subscribe((ResultData) => {
      ResultData.map((resultado) =>{
        console.log(resultado);
        this.cargues.data.push(resultado)
        this.cargues.paginator = this.paginator;
        preloader.close();
      })
    });

   }else{
    this._getarchivousecase.CarguesXEstado("PENDIENTE_AUTORIZACION").subscribe((ResultData) => {
      this.carguesPendienteAutorizacion = ResultData;
      this.cargues.data = this.carguesPendienteAutorizacion.concat(this.carguesCargaProcesada);
      this.cargues.data = ResultData;

         this._getarchivousecase.CarguesXEstado("CARGA_PROCESADA").subscribe((ResultData) => {
          ResultData.map((resultado) =>{
            console.log(resultado);
            this.cargues.data.push(resultado)
            this.cargues.paginator = this.paginator;
            preloader.close();
          })

         
      });
    });
   }
    
  }

  cambiarestado(idCargue:any, tipoestado:string,vbnotesoreria: number, vbnocontador: number,tipoArchivo: string): void{

    debugger;
    //validar si tiene el vbno tanto de tesoreria como de contabilidad cuando es tipo archivo valoracion
    if(tipoArchivo === "VALORACION")
    {
      if(vbnocontador == 0 || vbnotesoreria == 0)
      {

        this.alarma.showWarning("No se puede Aprobar porque debe tener el visto bueno de tesoreria y de contabilidad");
        return;
      }
    }

    //validar si tiene el vbno de tesoreria cuando es tipo archivo traslado o reintegro

    if(tipoArchivo === "TRASLADO" || tipoArchivo === "REINTEGRO")
    {
      if(vbnotesoreria == 0)
      {

        this.alarma.showWarning("No se puede Aprobar porque debe tener el visto bueno de tesoreria");
        return;
      }
    }
      

    var mensajeestado = '';
    switch(tipoestado){
      case 'confirmar_entidad':
        mensajeestado = '¿ Esta seguro que desea aprobar el cargue ?';
        break;
      case 'rechazar_entidad':
        mensajeestado = '¿ Esta seguro que desea rechazar el cargue ?';
        break;
      case 'confirmar_icetex':
        mensajeestado = '¿ Esta seguro que desea aprobar el cargue ?';
        break;
      case 'rechazar_icetex':
        mensajeestado = '¿ Esta seguro que desea rechazar el cargue ?';
        break;
    }
    const validar = confirm(mensajeestado);
    if(validar){
      this._getarchivousecase.CambiarEstadoCargue({idCargue,
                                                      usuario: this.usuario.usuario,
                                                      ip: this.ip || '193.168.1.1',
                                                      operacion: tipoestado})
                              .subscribe((ResulData) =>{
                                alert(ResulData?.mensaje);
                                window.location.reload();
                              });
    }
  }

  llevarpdf(id: number,tipo: string,vbnotesorero: number,vbnosebra: number,vbnoadmin:number,vbnoaut:number)
  {
    debugger

    if(tipo === 'TRASLADO')
    {
      this._router.navigate([`/autorizacion-traslado-pdf/${id}/${vbnotesorero}/${vbnosebra}/${vbnoadmin}/${vbnoaut}`]);
    }else{
      this._router.navigate([`/autorizacion-reintegro-pdf/${id}/${vbnotesorero}/${vbnosebra}/${vbnoadmin}/${vbnoaut}`]);
    }


  }

  vobueno(idCargue:any,tipousuario){

    this._getarchivousecase.ActualizarVbno(idCargue,tipousuario)
      .subscribe((ResulData) =>{
      alert(ResulData?.mensaje);
      window.location.reload();
    });

  }

  vobuenoorden(idCargue:any,voboadministrador:number)
  {

    debugger;
    if(this.usuario.idPerfil == 7)
    {
      if(voboadministrador == 0)
      {
        this.alarma.showWarning("No se puede dar el visto bueno del autorizador porque debe tener el visto bueno del administrador");
        return;
      }
  
    }
    
    this._getarchivousecase.ActualizarVbnoOrden(idCargue,this.usuario.idPerfil,this.usuario.idUsuario).subscribe((ResponseData) => {
      Swal.close()
      alert(ResponseData?.mensaje);
      window.location.reload();
    },  (error: any)  => {
      console.log(error.error.mensaje);
      Swal.close();
      this.alarma.showError(error.error.mensaje)
    });
  }

  vobuenoordenTodos()
  {

    Swal.fire({
      title: 'Espere por favor',
      allowOutsideClick:false,
      didOpen: () => {
        Swal.showLoading()
      }
    });
    
    this._getarchivousecase.ActualizarVbnoOrdenTodos(this.usuario.idUsuario).subscribe((ResponseData) => {
      Swal.close()
      alert(ResponseData?.mensaje);
      window.location.reload();
    },  (error: any)  => {
      console.log(error.error.mensaje);
      Swal.close();
      this.alarma.showError(error.error.mensaje)
    });
  }



  rechazar(id:number){
    this._router.navigate([`/autorizacion-rechazo/${id}`]);

  }

  ingresoDatos(id:number,tipoArchivo: string){

    if(tipoArchivo == "REINTEGRO")
    {
      this._router.navigate([`/datos-reintegro-tesorero/${id}`]);

    }

    if(tipoArchivo == "TRASLADO")
    {
      this._router.navigate([`/datos-traslados-tesorero/${id}`]);

    }

  }

  modificarDatos(id:number){
    this._router.navigate([`/datos-modificacion-reintegro-tesorero/${id}`]);
  }

  ingresoDatosSebra(id:number){

    this._router.navigate([`/datos-sebra/${id}`]);

  }

  visualizarOrdenesSebra(){
    this._router.navigate([`/autorizacion-ordenes-sebra`]);
  }



}
