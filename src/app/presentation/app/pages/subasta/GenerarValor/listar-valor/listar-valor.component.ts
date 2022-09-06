import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GetSubastaService } from 'src/app/domain/usecases/subasta/subasta.service';
import { NotificationsService } from 'src/app/presentation/shared/services/notifications.service';

@Component({
  selector: 'app-listar-valor',
  templateUrl: './listar-valor.component.html',
  styleUrls: ['./listar-valor.component.css']
})
export class ListarValorComponent implements OnInit {

  displayedColumns: string[] = ['FechaSubasta','ValorSubasta','ValorSubastaAnual','ValorNominal'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private _servicioSubasta: GetSubastaService,
              private _notifications: NotificationsService) { }

  ngOnInit(): void {
    const preloader = this._notifications.showPreloader();
    this._servicioSubasta.ListarSubastas().subscribe((ResultData) => {

      console.log(ResultData);
      this.dataSource.data = ResultData;
      this.dataSource.paginator = this.paginator;
      preloader.close();
    });
  }

}
