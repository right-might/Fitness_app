import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePrincipaleBasPageComponent } from './page-principale-bas-page.component';

describe('PagePrincipaleBasPageComponent', () => {
  let component: PagePrincipaleBasPageComponent;
  let fixture: ComponentFixture<PagePrincipaleBasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagePrincipaleBasPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagePrincipaleBasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
