import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iimpresionpdf } from 'src/app/domain/models/archivo/Iimpresionpdf';
import { GetAdministrativoService } from 'src/app/domain/usecases/administrativo/administrativo.service';
import { GetArchivoUseCaseService } from 'src/app/domain/usecases/archivo/get-archivo-use-case.service';

@Component({
  selector: 'app-autorizacion-traslado-pdf',
  templateUrl: './autorizacion-traslado-pdf.component.html',
  styleUrls: ['./autorizacion-traslado-pdf.component.css']
})
export class AutorizacionTrasladoPdfComponent implements OnInit {

  datosImpresion:Iimpresionpdf[] = [];
  private id: any;
  public funcionarioAdmin:any = "";
  public funcionarioAutorizador:any = "";
  public funcionarioTesorero: any = "";
  public datosOrden: any = "";
  public fecha: string;

  constructor(private _getarchivousecase: GetArchivoUseCaseService,
              private _servicioAdministrativo: GetAdministrativoService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
   
    this.fecha = Date();
    this.id = this.route.snapshot.params['id'];

    this._getarchivousecase.GetPfd(this.id,"TRASLADO").subscribe((ResultData) => {

      this.datosImpresion = ResultData;
      
    });

    this._getarchivousecase.GetObtenerOrdenCumplimientoIdCargue(this.id).subscribe((ResultData) => {
      console.log(ResultData);

      this.datosOrden =  ResultData;

      //para el funcionario administrativo
      if(ResultData.idFuncionarioAdmion != 0)
      {
        this._servicioAdministrativo.consultarUsuario(ResultData.idFuncionarioAdmion).subscribe((ResultData) => {

          // console.log(ResultData);
          this.funcionarioAdmin = ResultData;

        });
      }

       //para el funcionario autorizador
      if(ResultData.idFuncionarioAutorizador != 0)
      {
        this._servicioAdministrativo.consultarUsuario(ResultData.idFuncionarioAutorizador).subscribe((ResultData) => {
          // console.log(ResultData);
          this.funcionarioAutorizador = ResultData;

        });
      }

      //para el funcionario tesorero
      if(ResultData.idFuncionarioTesorero != 0)
      {
        this._servicioAdministrativo.consultarUsuario(ResultData.idFuncionarioTesorero).subscribe((ResultData) => {
          console.log(ResultData);
          this.funcionarioTesorero = ResultData;

        });
      }

      
    });


  }

}
