import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MaterialModule } from './../../shared/modules/material.module';
import { NotificationsService } from './notifications.service';
import { NotificationsComponent } from './../components/notifications/notifications.component';

describe('NotificationsService', () => {
  let service: NotificationsService;
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    	imports: [
    		MaterialModule
    	],
    	providers: [ 
    		{
	        provide: MatDialogRef,
	        useValue: {}
	      },
	      { 
	        provide: MAT_DIALOG_DATA, 
	        useValue: {} 
	      },
    		NotificationsService 
    	],
    	declarations: [ NotificationsComponent ],    
    });
    service = TestBed.inject(NotificationsService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
