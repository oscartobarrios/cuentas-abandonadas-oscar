import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { FuncionarioModelo } from "src/app/domain/models/administrativo/funcionario";
import { ICargo } from "src/app/domain/models/administrativo/icargo";
import { IFuncionario } from "src/app/domain/models/administrativo/iFuncionario";
import { IUsuario } from "src/app/domain/models/administrativo/iusuario";
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

    ListarCargos(): Observable<ICargo[]> {
      const url = `${environment.rest.endpoint}/Administrativo/GetCargos`;
      return this.http.get<ICargo[]>(url);
    }

    consultarCargo(idCargo:number): Observable<ICargo> {
      const url = `${environment.rest.endpoint}/Administrativo/GetCargo/${idCargo}`;
      return this.http.get<ICargo>(url);
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

}

