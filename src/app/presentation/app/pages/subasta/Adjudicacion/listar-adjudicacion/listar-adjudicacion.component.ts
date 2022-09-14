import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listar-adjudicacion',
  templateUrl: './listar-adjudicacion.component.html',
  styleUrls: ['./listar-adjudicacion.component.css']
})
export class ListarAdjudicacionComponent implements OnInit {

  displayedColumns: string[] = ['Entidad','Porcentaje','Valor','Actions'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public id: number;
  public valorsubasta: number;

  constructor(private route: ActivatedRoute,
              private _router : Router) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.valorsubasta = this.route.snapshot.params['valorsubasta'];

    
  }

  listaradjudicacion(){
    this._router.navigate([`/listaradjudicacionsubasta/${this.id}/${this.valorsubasta}`]);
  }

}
