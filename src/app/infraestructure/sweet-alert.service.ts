import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class SweetAlertService {

    constructor() { }

    showSuccess(message: string, title?: string) {
        this.showMessage(message, 'success', title);
    }

    showInfo(message: string, title?: string) {
        this.showMessage(message, 'info', title);
    }

    showError(message: string, title?: string) {
        this.showMessage(message, 'error', title);
    }

    showQuestion(message: string, title?: string) {
        this.showMessage(message, 'question', title);
    }

    showWarning(message: string, title?: string) {
        this.showMessage(message, 'question', title);
    }

    showMessage(message: string, type: 'error' | 'success' | 'info' | 'question' | 'warning', title?: string) {
        Swal.fire({
            title: title || this.getTitleMessage(type),
            text: message,
            icon: type
        });
    }

    private getTitleMessage(type: 'error' | 'success' | 'info' | 'question' | 'warning'): string {
        let title;

        switch (type) {
            case 'error':
                title = 'Algo ha salido mal';
                break;

            case 'success':
                title = '!Proceso exitoso!';
                break;

            case 'question':
                title = '¡Atento!';
                break;

            case 'warning':
                title = '!Alerta¡';
                break;

            case 'info':
                title = 'Información';
                break;

            default:
                title = '';
                break;
        }
        return title;
    }
}
