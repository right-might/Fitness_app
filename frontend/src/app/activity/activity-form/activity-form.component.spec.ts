/*import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { ActivityService } from "../activity.service";
import { ActivityFormComponent } from "./activity-form.component";

describe('ActivityFormComponent', () => {
    let component: ActivityFormComponent;
    let fixture: ComponentFixture<ActivityFormComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [],
        imports: [FormsModule, HttpClientTestingModule],
        providers: [ActivityService]
      }).compileComponents();
  
      fixture = TestBed.createComponent(ActivityFormComponent);
      component = fixture.componentInstance;
  
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit new activity when form is valid', () => {
    spyOn(component.newActivity, 'emit');
    const form = { valid: true, value: {
        id_activity: 1,
        id_client: 1,
        type_activity: 'course',
        date: new Date(2024, 12, 6),
        distance_km: 2,
        duration_min: 120,
        pace: 55,
        heart_beat_min: 60,
        temperature_c: 30,
        description_activity: 'Activity 1',
        comment: 'comments'
    }, resetForm: jasmine.createSpy('resetForm') };
    component.onSubmit(form as any);
    expect(component.newActivity.emit).toHaveBeenCalledWith(form.value);
    expect(form.resetForm).toHaveBeenCalled();
    });

    it('should not emit new activity when form is invalid', () => {
        spyOn(component.newActivity, 'emit');
        const form = { valid: false, value: {}, resetForm: jasmine.createSpy('resetForm') };
        component.onSubmit(form as any);
        expect(component.newActivity.emit).not.toHaveBeenCalled();
        expect(form.resetForm).not.toHaveBeenCalled();
      });
    
      it('should not emit new activity when name is empty', () => {
        spyOn(component.newActivity, 'emit');
        const form = { valid: true, value: {
          id_client: 1,
          type: 'course',
          date: new Date(2024, 12, 6),
          distance: 2,
          duration: 120,
          pace: 55,
          heartRate: 60,
          temperature: 30,
          description: '',
          comments: 'comments'
        }, resetForm: jasmine.createSpy('resetForm') };
        component.onSubmit(form as any);
        expect(component.newActivity.emit).not.toHaveBeenCalled();
        expect(form.resetForm).not.toHaveBeenCalled();
      });
 
});
*/
