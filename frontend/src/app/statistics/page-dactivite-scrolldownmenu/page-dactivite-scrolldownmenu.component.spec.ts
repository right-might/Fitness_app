import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDactiviteScrolldownmenuComponent } from './page-dactivite-scrolldownmenu.component';

describe('PageDactiviteScrolldownmenuComponent', () => {
  let component: PageDactiviteScrolldownmenuComponent;
  let fixture: ComponentFixture<PageDactiviteScrolldownmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageDactiviteScrolldownmenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageDactiviteScrolldownmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
