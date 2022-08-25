import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listar-valor',
  templateUrl: './listar-valor.component.html',
  styleUrls: ['./listar-valor.component.css']
})
export class ListarValorComponent implements OnInit {

  displayedColumns: string[] = ['Entidad', 'FechaSubasta','TipoSubasta','ValorSubasta'];
  dataSource = new MatTableDataSource<any>();
  
  constructor() { }

  ngOnInit(): void {
  }

}
