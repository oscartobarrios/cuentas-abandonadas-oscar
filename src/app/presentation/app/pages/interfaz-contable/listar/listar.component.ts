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
      console.error("Error trayendo las interfaces", error);
      preloader.close();
    });
  }

  transmitir(data: InterfazContableList) {
    const preloader = this._notifications.showPreloader();
    this._getInterfazContableUseCaseService.TrasmitirInterfazContable(data).subscribe((res) => {
      console.log("Resultado", res);
      preloader.close();
      //window.location.reload();
    },  (error: any)  => {
      console.error("Error transmitiendo", error);
      preloader.close();
    });
  }
}
