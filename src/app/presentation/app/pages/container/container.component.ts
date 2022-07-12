import { Component, OnInit } from '@angular/core';

import { MediaChange, MediaObserver } from "@angular/flex-layout";


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  public openedSidenav: boolean = true;
	public title: string = "Consulta de tickets en proceso de cargue soportes en el repositorio de actos administrativos de expedientes DIAN";
  public itemsSidenav = [
    {
      icon: 'description',
      text: 'Cargar archivos',
      url : 'listar',
      rols: [1,9]
    },
    {
      icon: 'description',
      text: 'Trámites',
      url : 'submenu/tramites',
      rols: [4,5,6,7,9]
    },
    {
      icon: 'description',
      text: 'Certificaciones',
      url : 'certificados',
      rols: [1,4,5,9]
    },
    {
      icon: 'description',
      text: 'Reportes',
      url : 'submenu/reportes',
      rols: [1,4,9]
    },
    {
      icon: 'description',
      text: 'Consolidados',
      url : 'submenu/consolidados',
      rols: [4,5]
    },
    {
      icon: 'description',
      text: 'Detallados',
      url : 'submenu/detallados',
      rols: [4,5]
    },
    {
      icon: 'description',
      text: 'Subastas',
      url : 'submenu/subastas',
      rols: [4,5]
    }/*,
    {
      icon: 'account_balance',
      text: 'Actualización cuenta bancaria'
    }*/
  ];

  constructor(
    private mediaObserver: MediaObserver
  ) {
    this.mediaObserver.media$.subscribe((change: MediaChange) => this.openedSidenav = !(change.mqAlias == 'xs'));
  }

  ngOnInit(): void {
  }

  itemSeleccionado(event) {
  	console.log("ddsdsd"+event.icon);
  }

}
