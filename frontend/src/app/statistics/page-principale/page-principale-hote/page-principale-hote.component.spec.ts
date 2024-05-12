import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagePrincipaleHoteComponent } from './page-principale-hote.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PagePrincipaleHoteComponent', () => {
  let component: PagePrincipaleHoteComponent;
  let fixture: ComponentFixture<PagePrincipaleHoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagePrincipaleHoteComponent,HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagePrincipaleHoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display dx-scheduler', () => {
    const calendarElement: HTMLElement = fixture.nativeElement;
    const calendar = calendarElement.querySelector('.dx-scheduler');
    expect(calendar).toBeTruthy();
  });

});
