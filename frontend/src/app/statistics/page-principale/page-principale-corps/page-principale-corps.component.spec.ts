import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagePrincipaleCorpsComponent } from './page-principale-corps.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PagePrincipaleCorpsComponent', () => {
  let component: PagePrincipaleCorpsComponent;
  let fixture: ComponentFixture<PagePrincipaleCorpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagePrincipaleCorpsComponent,HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagePrincipaleCorpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
