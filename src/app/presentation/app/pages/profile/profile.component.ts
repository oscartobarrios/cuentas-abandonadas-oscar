import { Component, OnInit } from '@angular/core';
import {StorageService} from '../../../shared/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 info:any;
  constructor(private _storageservice: StorageService) { }

  ngOnInit(): void {
    this.info = this._storageservice.getItem('payload')?.infoUsuario;
    console.log(this.info);
  }

}
