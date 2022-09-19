import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { GetSubastaService } from 'src/app/domain/usecases/subasta/subasta.service';
import { NotificationsService } from 'src/app/presentation/shared/services/notifications.service';

@Component({
  selector: 'app-listar-adjudicacion',
  templateUrl: './listar-adjudicacion.component.html',
  styleUrls: ['./listar-adjudicacion.component.css']
})
export class ListarAdjudicacionComponent implements OnInit {

  displayedColumns: string[] = ['Entidad','FechaAdjudicacion','Tipo','Porcentaje','Valor','Actions'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public idvalor: number;
  public valorsubasta: number;
  public liquidez: number;
  public largoPlazo: number;


  constructor(private route: ActivatedRoute,
              private _router : Router,
              private _servicioSubasta: GetSubastaService,
              private _notifications: NotificationsService) { }

  ngOnInit(): void {

    this.idvalor = this.route.snapshot.params['id'];
    this.valorsubasta = this.route.snapshot.params['valorsubasta'];

    this.liquidez = this.valorsubasta * 0.20;
    this.largoPlazo = this.valorsubasta * 0.80;


    const preloader = this._notifications.showPreloader();
    this._servicioSubasta.ListarAdjudicacionesIdValor(this.idvalor).subscribe((ResultData) => {

      console.log(ResultData);
      this.dataSource.data = ResultData;
      this.dataSource.paginator = this.paginator;
      preloader.close();
    });

    
  }

  registraradjudicacion(idAdjudicacion:number){
    this._router.navigate([`/registraradjudicacionsubasta/${idAdjudicacion}/${this.idvalor}/${this.valorsubasta}`]);
  }

  regresar(){
    this._router.navigate([`/listarsubasta`]);
  }

}
