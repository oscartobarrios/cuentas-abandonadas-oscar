import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CardItem } from '../../atoms/card-atom/card-atom.component';

@Component({
  selector: 'app-sub-menu-organism',
  templateUrl: './sub-menu-organism.component.html',
  styleUrls: ['./sub-menu-organism.component.css']
})
export class SubMenuOrganismComponent implements OnInit {

  tramites: CardItem[] = [
    {
      title: "Fichas entidades",
      url: "entidad-financiera"
    },
    {
      title: "Autorización cargues",
      url: "#"
    },
    {
      title: "Configuración calendario",
      url: "#"
    },
    {
      title: "Interfaz contable",
      url: "interfaz-contable-listar"
    },
    {
      title: "Configurar dominios",
      url: "#"
    },
  ]
  menuType:any;

  constructor(private _route : ActivatedRoute) {
    this._route.params.subscribe(params => {
      this.buildSubMenu(params.type)
    });
   }

  ngOnInit(): void {
  }

  buildSubMenu(type:string)
  {
    switch(type) {
      case 'tramites' : this.menuType = this.tramites;
    }
  }

}
