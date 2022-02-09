import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iimpresionpdf } from 'src/app/domain/models/archivo/Iimpresionpdf';
import { GetArchivoUseCaseService } from 'src/app/domain/usecases/archivo/get-archivo-use-case.service';

@Component({
  selector: 'app-autorizacion-traslado-pdf',
  templateUrl: './autorizacion-traslado-pdf.component.html',
  styleUrls: ['./autorizacion-traslado-pdf.component.css']
})
export class AutorizacionTrasladoPdfComponent implements OnInit {

  datosImpresion:Iimpresionpdf[] = [];
  private id: any;
  
  constructor(private _getarchivousecase: GetArchivoUseCaseService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];


    this._getarchivousecase.GetPfd(this.id,"TRASLADO").subscribe((ResultData) => {

      this.datosImpresion = ResultData;
      console.log(this.datosImpresion);
      
    });

  }

}
