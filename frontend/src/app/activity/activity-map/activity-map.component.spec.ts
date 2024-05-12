import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ActivityMapComponent } from './activity-map.component'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'

describe('ActivityMapComponent', () => {
    let component: ActivityMapComponent
    let fixture: ComponentFixture<ActivityMapComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ActivityMapComponent, HttpClientTestingModule],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({ id: 123 }),
                    },
                },
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(ActivityMapComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
