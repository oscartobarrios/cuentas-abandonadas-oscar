import { RecursoHumano } from './../../../domain/models/entidad-financiera/recurso-humano';
import { EntidadFinanciera } from './../../../domain/models/entidad-financiera/entidad-financiera';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class entidadService {

  constructor(private http: HttpClient) { }
  
  private apiURL = environment.rest.endpoint+ 'Entidad';

  public obtenerEntidades(): Observable<EntidadFinanciera[]>{
    //return [{ id_tipo_cargue : 1, tipo_cargue : "Valoración", descripcion : "Archivo de cargue de Valoración cuentas abandonadas", programa_validador : "VALIDAR_CARGUE_VALORACION", tabla_encabezado : "CAB_CARGUE_VALORACION", tabla_detalle : "CAB_CARGUE_VALORACION_DETALLE" }];
    return this.http.get<EntidadFinanciera[]>(this.apiURL);
  }
    
  public crearEntidad(entidad:EntidadFinanciera): Observable<EntidadFinanciera>
  {  
    return this.http.post<EntidadFinanciera>(this.apiURL, entidad);
  }

  public crearRecursoHumano(recursoHumano:RecursoHumano): Observable<RecursoHumano>
  {  
    return this.http.post<RecursoHumano>(this.apiURL + "/RecursoHumano", recursoHumano);
  }
}
