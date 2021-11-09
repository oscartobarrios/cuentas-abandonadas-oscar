import { InterfazContableList } from './../../../../../domain/models/interfaz-contable/interfaz-contable-list';
import { NotificationsService } from './../../../../shared/services/notifications.service';
import { GetInterfazContableUseCaseService } from './../../../../../domain/usecases/interfaz-contable/get-interfaz-contable-use-case-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarInterfazContableComponent implements OnInit {
  /*
  mock: InterfazContableList = {
    tipoInterfase: "prueba",
    anoproceso: "2021",
    mesproceso: "06",
    fechageneracionborrador: "2020-01-01",
    fechageneracionapo: "2020-01-10",
    monto: "123455677",
    estado: "TestEstado"
  }
  */
  interfazContableList: InterfazContableList[] = [];
  constructor(private _getInterfazContableUseCaseService: GetInterfazContableUseCaseService,
              private _notifications: NotificationsService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const preloader = this._notifications.showPreloader();
    this._getInterfazContableUseCaseService.ListarInterfazContable().subscribe((res) => {
      this.interfazContableList = res;
      preloader.close();
    },  (error: any)  => {
      //this.interfazContableList = [this.mock];
      console.error("Error trayendo las interfaces", error);
      preloader.close();
    });
  }
}
