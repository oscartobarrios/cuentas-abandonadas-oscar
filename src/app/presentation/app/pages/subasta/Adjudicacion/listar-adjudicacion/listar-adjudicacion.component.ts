import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listar-adjudicacion',
  templateUrl: './listar-adjudicacion.component.html',
  styleUrls: ['./listar-adjudicacion.component.css']
})
export class ListarAdjudicacionComponent implements OnInit {

  displayedColumns: string[] = ['FechaSubasta','TipoSubasta','Entidad','ValorAdjudicacion'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor() { }

  ngOnInit(): void {
  }

}
