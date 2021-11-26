import { StorageService } from './../../../shared/services/storage.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CardItem } from '../../atoms/card-atom/card-atom.component';

@Component({
  selector: 'app-sub-menu-organism',
  templateUrl: './sub-menu-organism.component.html',
  styleUrls: ['./sub-menu-organism.component.css']
})
export class SubMenuOrganismComponent implements OnInit {
  usuario = this._storageservice.getItem('payload').infoUsuario;
  tramites: CardItem[] = [
    {
      title: "Fichas entidades",
      url: "entidad-financiera",
      rols: [1,4]
    },
    {
      title: "Autorización cargues",
      url: "autorizacion-cargues",
      rols: [4]
    },
    {
      title: "Configuración calendario",
      url: "#",
      rols: [4]
    },
    {
      title: "Interfaz contable",
      url: "interfaz-contable-listar",
      rols: [4]
    },
    {
      title: "Configurar dominios",
      url: "#",
      rols: [4]
    },
  ]
  reportes: CardItem[] = [
    {
      title: "Estados cargues",
      url: "#",
      rols: [1,4]
    },
    {
      title: "Gestión cuentas",
      url: "#",
      rols: [1,4]
    },{
      title: "Cargues rechazados",
      url: "#",
      rols: [1,4]
    }
  ]

  consolidados: CardItem[] = [
    {
      title: "Administradas",
      url: "#",
      rols: [1,4]
    },
    {
      title: "Valoración",
      url: "#",
      rols: [1,4]
    },{
      title: "Reintegro",
      url: "#",
      rols: [1,4]
    },{
      title: "Cesión",
      url: "#",
      rols: [1,4]
    },
  ]

  detallados: CardItem[] = [
    {
      title: "Administradas",
      url: "#",
      rols: [1,4]
    },
    {
      title: "Valoración",
      url: "#",
      rols: [1,4]
    },{
      title: "Reintegro",
      url: "#",
      rols: [1,4]
    },{
      title: "Cesión",
      url: "#",
      rols: [1,4]
    },
  ]

  subastas: CardItem[] = [
    {
      title: "Notificación subastas",
      url: "#",
      rols: [1,4]
    },
    {
      title: "Generar valor de subastas",
      url: "#",
      rols: [1,4]
    },
    {
      title: "Histórico subastas",
      url: "#",
      rols: [1,4]
    }
  ]

  public menuType = [];

  constructor(private _route : ActivatedRoute,
              private _storageservice: StorageService,) {
    this._route.params.subscribe(params => {
      this.buildSubMenu(params.type)
    });
   }

  ngOnInit(): void {
  }

  buildSubMenu(type:string)
  {
    switch(type) {
      case 'tramites' : 
        this.menuType = [];
        this.menuType = this.tramites;
        break;
      case 'reportes' :
        this.menuType = [];
        this.menuType = this.reportes;
        break;
      case 'consolidados' :
        this.menuType = [];
        this.menuType = this.consolidados;
        break;
      case 'detallados' :
        this.menuType = [];
        this.menuType = this.detallados;
        break;
      case 'subastas' :
        this.menuType = [];
        this.menuType = this.subastas;
        break;
    }
  }
}
