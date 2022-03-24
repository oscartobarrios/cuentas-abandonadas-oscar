import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { ICargo } from "src/app/domain/models/administrativo/icargo";
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


}

