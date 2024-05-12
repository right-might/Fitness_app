/*import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityListComponent } from './activity-list.component';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivityService } from '../activity.service';
import { MatDialog } from '@angular/material/dialog';

describe('ActivityListComponent', () => {
  let component: ActivityListComponent;
  let fixture: ComponentFixture<ActivityListComponent>;
  let activityService: jasmine.SpyObj<ActivityService>;
  let router: jasmine.SpyObj<Router>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    activityService = jasmine.createSpyObj('ActivityService', ['getActivityById', 'removeActivity']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    dialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [ActivityListComponent, HttpClientTestingModule],
      providers: [
        { provide: ActivityService, useValue: activityService },
        { provide: Router, useValue: router },
        { provide: MatDialog, useValue: dialog }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/
