import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePrincipaleEnteteComponent } from './page-principale-entete.component';

describe('PagePrincipaleEnteteComponent', () => {
  let component: PagePrincipaleEnteteComponent;
  let fixture: ComponentFixture<PagePrincipaleEnteteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagePrincipaleEnteteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagePrincipaleEnteteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
