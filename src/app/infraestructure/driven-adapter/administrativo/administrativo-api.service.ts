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


}

