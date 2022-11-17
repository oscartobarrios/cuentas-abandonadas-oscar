import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { FuncionarioModelo } from "src/app/domain/models/administrativo/funcionario";
import { ICargo } from "src/app/domain/models/administrativo/icargo";
import { IEntidad } from "src/app/domain/models/administrativo/ientidad";
import { IFuncionario } from "src/app/domain/models/administrativo/iFuncionario";
import { IUsuario } from "src/app/domain/models/administrativo/iusuario";
import { EntidadFinanciera } from "src/app/domain/models/entidad-financiera/entidad-financiera";
import { IRequestLogin } from "src/app/domain/models/login/ilogin";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class AministrativoApiService {

    private _httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            Accept: '*/*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Content-Disposition': 'multipart/form-data'
          },
        )
    };

    constructor(private http: HttpClient) {
    }

    insertarCargo(dataQuery: ICargo): Observable<any> {
        const url = `${environment.rest.endpoint}/Administrativo/InsertarCargo`;
        return this.http.post<ICargo>(url, dataQuery);
    }

    insertarEntidad(dataQuery: EntidadFinanciera): Observable<any> {
      const url = `${environment.rest.endpoint}/Administrativo/InsertarEntidad`;
      return this.http.post<EntidadFinanciera>(url, dataQuery);
    }

    actualizarEntidad(dataQuery: EntidadFinanciera): Observable<any> {
      const url = `${environment.rest.endpoint}/Administrativo/ActualizarEntidad`;
      return this.http.post<EntidadFinanciera>(url, dataQuery);
    }

    ListarCargos(): Observable<ICargo[]> {
      const url = `${environment.rest.endpoint}/Administrativo/GetCargos`;
      return this.http.get<ICargo[]>(url);
    }

    consultarCargo(idCargo:number): Observable<ICargo> {
      const url = `${environment.rest.endpoint}/Administrativo/GetCargo/${idCargo}`;
      return this.http.get<ICargo>(url);
    }

    consultarEntidad(idEntidad:number): Observable<IEntidad> {
      const url = `${environment.rest.endpoint}/Administrativo/GetEntidad/${idEntidad}`;
      return this.http.get<IEntidad>(url);
    }

    ListarUsuarios(): Observable<IUsuario[]> {
      const url = `${environment.rest.endpoint}/Administrativo/GetUsuarios`;
      return this.http.get<IUsuario[]>(url);
    }

    ListarFuncionarios(): Observable<IFuncionario[]> {
      const url = `${environment.rest.endpoint}/Administrativo/GetFuncionarios`;
      return this.http.get<IFuncionario[]>(url);
    }

    insertarFuncionario(data: FuncionarioModelo): Observable<any> {

      const url = `${environment.rest.endpoint}/Administrativo/InsertarFuncionario?idFuncionario=${data.idFuncionario}&idUsuario=${data.idUsuario}&idCargo=${data.idCargo}`;
      const archivo: FormData = new FormData();
      archivo.append('file', data.file, data.file.name);
      return this.http.post<any>(url, archivo);
    }

    consultarFuncionario(idFuncionario:number): Observable<any> {
      const url = `${environment.rest.endpoint}/Administrativo/GetFuncionario/${idFuncionario}`;
      return this.http.get<any>(url);
    }

    consultarUsuario(idUsuario:number): Observable<any> {
      const url = `${environment.rest.endpoint}/Administrativo/GetUsuario/${idUsuario}`;
      return this.http.get<any>(url);
    }

    ListarEntidades(): Observable<IEntidad[]> {
      const url = `${environment.rest.endpoint}/Administrativo/GetEntidades`;
      return this.http.get<IEntidad[]>(url);
    }

    Notificaciones(): Observable<any> {
      const url = `${environment.rest.endpoint}/Notificacion/Inicio`;
      return this.http.get<any>(url);
    }

    NotificacionInicioValoracion(): Observable<any> {
      const url = `${environment.rest.endpoint}/Notificacion/InicioValoracion`;
      return this.http.get<any>(url);
    }

    NotificacionInicioTraslado(): Observable<any> {
      const url = `${environment.rest.endpoint}/Notificacion/InicioTraslado`;
      return this.http.get<any>(url);
    }

    NotificacionInicioReintegro(): Observable<any> {
      const url = `${environment.rest.endpoint}/Notificacion/InicioReintegro`;
      return this.http.get<any>(url);
    }

    verificarLogin(data: IRequestLogin): Observable<any> {
      const url = `${environment.rest.endpoint}/Administrativo/VerificarLogin`;
      return this.http.post<EntidadFinanciera>(url, data);
    }
    ActualizarClave(data: any): Observable<any>{
      const url = `${environment.rest.endpoint}/Administrativo/ActualizarClaveUsuario`;
      return this.http.post<any>(url,data);
    }

    enviarcodigoverificacion(usuario:number): Observable<any> {
      const url = `${environment.rest.endpoint}/Administrativo/enviarcodigoverificacion/${usuario}`;
      return this.http.get<any>(url);
    }

    ConsultarUsuarioPorNombre(usuario:number): Observable<any> {
      const url = `${environment.rest.endpoint}/Administrativo/GetUsuarioByUsername/${usuario}`;
      return this.http.get<any>(url);
    }

    insertarActualizarFuncionarioEntidad(data: any): Observable<any> {
      const url = `${environment.rest.endpoint}/Administrativo/InsertarActualizarFuncionarioEntidad`;
      return this.http.post<any>(url, data);
    }

    insertarActualizarFuncionarioEntidadFiscalLegal(data: any): Observable<any> {
      console.log(data);
      const url = `${environment.rest.endpoint}/Administrativo/InsertarActualizarFuncionarioFiscalLegal?IdFuncionario=${data.idFuncionario}&TipoIdentificacion=${data.tipoIdentificacion}&Identificacion=${data.identificacion}
      &PrimerNombre=${data.primerNombre}&SegundoNombre=${data.segundoNombre}&PrimerApellido=${data.primerApellido}&SegundoApellido=${data.segundoApellido}&Area=${data.area}&TelefonoArea=${data.telefonoArea}&TelefonoNumero=${data.telefonoNumero}&TelefonoExtension=${data.telefonoExtension}&Celular=${data.celular}&Email=${data.email}&IdOrganizacion=${data.idOrganizacion}&TipoFuncionario=${data.tipoFuncionario}&Estado=${data.estado}&Direccion=${data.direccionCorrespondencia}`;
      const archivo: FormData = new FormData();
      archivo.append('file', data.file, data.file.name);
      return this.http.post<any>(url, archivo);
    }


    ListarFuncionarioEntidadPorTipo(tipo:string): Observable<any[]> {
      const url = `${environment.rest.endpoint}/Administrativo/GetFuncionarioEntidadPorTipo/${tipo}`;
      return this.http.get<any[]>(url);
    }

    ListarFuncionarioEntidadPorId(id:number): Observable<any[]> {
      const url = `${environment.rest.endpoint}/Administrativo/GetFuncionarioEntidadPorId/${id}`;
      return this.http.get<any[]>(url);
    }

    EnvioCorreoLiderEntidad(data: any): Observable<any>{
      const url = `${environment.rest.endpoint}/Administrativo/EnviarCorreoLiderEntidad?usuario=${data.usuario}&nombreEntidad=${data.nombreEntidad}&idOrganizacion=${data.idOrganizacion}`;
      const archivo: FormData = new FormData();
      archivo.append('file', data.file, data.file.name);
      archivo.append('file2', data.file2, data.file2.name);      
      return this.http.post<any>(url, archivo);
    }

    ConsultarNotificacionesLiderPorIdOrganizacion(idOrganizacion: string,estado:string): Observable<any[]> {
      const url = `${environment.rest.endpoint}/Administrativo/GetNotificacionesLiderIdOrganizacion/${idOrganizacion}/${estado}`;
      return this.http.get<any[]>(url);
    }

    ListarNotificacionesLiderEntidad(): Observable<any[]> {
      const url = `${environment.rest.endpoint}/Administrativo/GetNotificacionesLider`;
      return this.http.get<any[]>(url);
    }

    ActualizarEstadoNotificacionLider(data:any): Observable<any> {
      const url = `${environment.rest.endpoint}/Administrativo/ActualizarEstadoNotificacionLider`;
      return this.http.post<any>(url,data);
    }


}

