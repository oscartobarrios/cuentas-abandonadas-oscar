import { Observable } from "rxjs";


export abstract class SubastaGateway {

    abstract generarvalorsubasta(Ivalor: any): Observable<any>;
    abstract ListarSubastas(): Observable<any[]>;
}
