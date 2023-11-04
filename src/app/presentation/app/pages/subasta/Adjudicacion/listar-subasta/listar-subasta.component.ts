import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GetSubastaService } from 'src/app/domain/usecases/subasta/subasta.service';
import { NotificationsService } from 'src/app/presentation/shared/services/notifications.service';

@Component({
  selector: 'app-listar-subasta',
  templateUrl: './listar-subasta.component.html',
  styleUrls: ['./listar-subasta.component.css']
})
export class ListarSubastaComponent implements OnInit {

  displayedColumns: string[] = ['FechaSubasta','ValorSubasta','Actions'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  id:number;
  valorSubasta: number;
  
  constructor(private _servicioSubasta: GetSubastaService,
              private _notifications: NotificationsService,
              private _router : Router,) { }

  ngOnInit(): void {
    const preloader = this._notifications.showPreloader();
    this._servicioSubasta.ListarSubastas().subscribe((ResultData) => {

      console.log(ResultData);
      this.dataSource.data = ResultData;
      this.dataSource.paginator = this.paginator;
      preloader.close();
    });
  }

  listaradjudicacion(id:number,valorsubasta: number){

    this._router.navigate([`/listaradjudicacionsubasta/${id}/${valorsubasta}`]);
  }

}
