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
      text: 'Cargar archivos'
    },
  /*{
      icon: 'paid',
      text: 'Pagos'
    },
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
