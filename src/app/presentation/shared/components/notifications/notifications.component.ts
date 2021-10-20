import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationsComponent implements OnInit {

  constructor(
  	public dialogRef: MatDialogRef<NotificationsComponent>,
  	@Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {}

  public confirmResponse(item:any){
    this.dialogRef.close(item.value);
  }

}
