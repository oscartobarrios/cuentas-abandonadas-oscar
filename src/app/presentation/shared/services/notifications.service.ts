import { Component, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

//App
import { NotificationsComponent } from './../components/notifications/notifications.component';

import { Messages } from './../constants/messages';

//Notification var global
declare var Notification;

export interface ButtonOption {
  text: string;
  value: boolean;
  color: string;            
}

@Injectable()
export class NotificationsService {
  
  private canCreateNativeNotification: boolean;

  constructor(
    private dialog: MatDialog
  ) {}


  /* ======= DIALOGS ======== */
  public showError(message: string, disableClose?: boolean): MatDialogRef<NotificationsComponent> {
    let data = {
      title: 'Error',
      message: message
    };
    return this.generateAlert('error', {data: data, disableClose: disableClose});
  }  

  public showInformation(message: string, disableClose?: boolean): MatDialogRef<NotificationsComponent> {
    let data = {
      title: 'Información',
      message: message
    };
    return this.generateAlert('info', {data: data, disableClose: disableClose});
  }

  public showConfirmation(title?: string, message?: string, disableClose?: boolean): MatDialogRef<NotificationsComponent> {
    let data = {
      title: title ? title : 'Confirmación',
      message: message ? message : 'Esta seguro?',
      buttons: [{
        text: 'Cancelar',
        value: false,
        color: 'primary'        
      }, {
        text: 'Confirmar',
        value: true,
        color: 'accent'        
      }]      
    };
    return this.generateAlert('confirm', {data: data, disableClose: disableClose});
  }

  public showPreloader(theme?: string): MatDialogRef<NotificationsComponent> { 
    let data = {
      theme: theme ? theme : 'primary'
    };  
    return this.generateAlert('preloader', {data: data, disableClose: true});
  }

  private generateAlert(
    type: string, 
    {
      data,
      disableClose
    }): MatDialogRef<NotificationsComponent> { 
      let configDialog = {
        data: {
          type: type,
          data: data
        },
        disableClose: disableClose
      };    
    return this.dialog.open(NotificationsComponent, configDialog);
  }
  
}
