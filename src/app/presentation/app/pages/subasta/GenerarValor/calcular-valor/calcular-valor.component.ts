import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calcular-valor',
  templateUrl: './calcular-valor.component.html',
  styleUrls: ['./calcular-valor.component.css']
})
export class CalcularValorComponent implements OnInit {

  tipos: any[];

  constructor() { }

  ngOnInit(): void {
    this.llenarTipo();
  }

  llenarTipo(){
    this.tipos = [
      {
        nombre:"Anual"
      },
      {
        nombre: "Trimestral",
      },{
        nombre: "Inversión",
      }
    ]
  }


}
