/*import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ActivityConfirmComponent } from './activity-confirm.component';

describe('ActivityConfirmComponent', () => {
  let component: ActivityConfirmComponent;
  let fixture: ComponentFixture<ActivityConfirmComponent>;
  let mockRouter: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      queryParams: of({ description: 'Test Activity', action: 'add' })
    };

    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set activityName and action correctly on ngOnInit', () => {
    expect(component.activityName).toBe('Test Activity');
    expect(component.action).toBe('ajoutée');
  });

  it('should navigate to "/activities" when goToList is called', () => {
    component.goToList();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/activities']);
  });
});
*/
