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
      rols: [4,5,9]
    },
    {
      title: "Registro de Funcionarios",
      url: "funcionario",
      rols: [4]
    },
    {
      title: "Autorización cargues",
      url: "autorizacion-cargues",
      rols: [4,5,6,7,10]
    },
    {
      title: "Configuración calendario",
      url: "calendario",
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
      url: "reporteestadocargue",
      rols: [4]
    },
    {
      title: "Gestión cuentas",
      url: "#",
      rols: [4]
    },{
      title: "Cargues rechazados",
      url: "reportecarguerechazados",
      rols: [4]
    },{
      title: "Certificación de Saldos",
      url: "reportecertifiacionsaldos",
      rols: [1,9]
    },{
      title: "Consolidado",
      url: "consolidadoentidad",
      rols: [1,9]
    },{
      title: "Adjudicacion de Subasta",
      url: "reporteadjudicacionsubasta",
      rols: [4,5,10,11]
    }
  ]

  consolidados: CardItem[] = [
    {
      title: "Traslado",
      url: "consolidado/administradas",
      rols: [4,5,11]
    },
    {
      title: "Valoración",
      url: "consolidado/valoracion",
      rols: [4,5,11]
    },{
      title: "Reintegro",
      url: "consolidado/reintegro",
      rols: [4,5,11]
    },{
      title: "Cesión",
      url: "consolidado/cesion",
      rols: [4,5,11]
    },
  ]

  detallados: CardItem[] = [
    {
      title: "Valoración",
      url: "detallado/valoracion",
      rols: [4,5,11]
    },
    {
      title: "Traslado",
      url: "detallado/traslado",
      rols: [4,5,11]
    },
    {
      title: "Administradas",
      url: "detallado/administradas",
      rols: [4,5,11]
    },
    {
      title: "Reintegro",
      url: "detallado/reintegro",
      rols: [4,5,11]
    },{
      title: "Cesión",
      url: "detallado/cesion",
      rols: [4,5,11]
    },
  ]

  subastas: CardItem[] = [
    {
      title: "Notificación subastas",
      url: "#",
      rols: [5]
    },
    {
      title: "Generar valor de subastas",
      url: "listarvalorsubasta",
      rols: [5]
    },
    {
      title: "Registro de adjudicación de subastas",
      url: "listarsubasta",
      rols: [5]
    },
    // {
    //   title: "Histórico subastas",
    //   url: "#",
    //   rols: [4,5,11]
    // }
  ]

  certificaciones: CardItem[] = [
    {
      title: "Certificaciones cargadas",
      url: "certificados",
      rols: [1,4,5]
    },
    {
      title: "Certificaciones aprobadas",
      url: "certificados-aprobados",
      rols: [4,5]
    },

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
      case 'certificaciones' :
        this.menuType = [];
        this.menuType = this.certificaciones;
        break;
    }
  }
}
