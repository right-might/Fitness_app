import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainersRequestComponent } from './trainers-request.component';
import { AdminService } from '../admin.service'; 
import { HttpClientModule } from '@angular/common/http'; 

describe('TrainersRequestComponent', () => {
  let component: TrainersRequestComponent;
  let fixture: ComponentFixture<TrainersRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [AdminService], 
      imports: [HttpClientModule,TrainersRequestComponent
      ] 
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainersRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
