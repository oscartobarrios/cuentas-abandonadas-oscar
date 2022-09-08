import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
  })
  export class SubastaApiService {

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

    generarvalorsubasta(dataQuery: any): Observable<any> {
        debugger;
        const url = `${environment.rest.endpoint}/Subasta/GenerarValorSubasta`;
        return this.http.post<any>(url, dataQuery);
    }

    ListarSubastas(): Observable<any[]> {
      const url = `${environment.rest.endpoint}/Subasta/GetValoresSubastas`;
      return this.http.get<any[]>(url);
    }

    
  }