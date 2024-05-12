import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomePageComponent } from './welcome-page.component'; 
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('WelcomePageComponent', () => { 
  let component: WelcomePageComponent;
  let fixture: ComponentFixture<WelcomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        // Fournir un ActivatedRoute factice avec des valeurs fictives
        { 
          provide: ActivatedRoute, 
          useValue: { 
            snapshot: { paramMap: new Map().set('id', '1') },
            params: of({ id: '1' }) // ou tout autre valeur fictive nécessaire
          } 
        }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(WelcomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { WelcomePageComponent } from './welcome-page.component'; // Importez la composante WelcomePageComponent ici
// import { HttpClientTestingModule } from '@angular/common/http/testing';

// describe('WelcomePageComponent', () => { // Assurez-vous de changer le nom de la composante ici
//   let component: WelcomePageComponent; // Assurez-vous de changer le nom de la composante ici
//   let fixture: ComponentFixture<WelcomePageComponent>; // Assurez-vous de changer le nom de la composante ici

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule]
//     })
//     .compileComponents();
    
//     fixture = TestBed.createComponent(WelcomePageComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { WelcomePageComponent } from './welcome-page.component';

// describe('WelcomePageComponent', () => {
//   let component: WelcomePageComponent;
//   let fixture: ComponentFixture<WelcomePageComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ WelcomePageComponent ],
//       imports: [ WelcomePageComponent ] // Ajoutez le module approprié ici
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(WelcomePageComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should render welcome message', () => {
//     const compiled = fixture.nativeElement;
//     expect(compiled.querySelector('h1').textContent).toContain('GymGenius');
//     expect(compiled.querySelector('p').textContent).toContain('Entraînez-vous intelligemment, Suivez plus intelligemment.');
//     expect(compiled.querySelector('.btn:nth-child(1)').textContent).toContain('Connecter');
//     expect(compiled.querySelector('.btn:nth-child(2)').textContent).toContain('Créer un compte');
//   });
// });
