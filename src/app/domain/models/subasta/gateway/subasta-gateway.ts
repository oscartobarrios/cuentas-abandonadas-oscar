import { Observable } from "rxjs";


export abstract class SubastaGateway {

    abstract generarvalorsubasta(Ivalor: any): Observable<any>;
    abstract ListarSubastas(): Observable<any[]>;
    abstract InsertarActualizarAdjudicacion(Ivalor: any): Observable<any>;
    abstract ListarAdjudicacionesIdValor(idValor:number): Observable<any[]>;
    abstract ListarAdjudicacionesIdAdjudicacion(idAdjudicacion:number): Observable<any>;
}
