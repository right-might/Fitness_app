import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ActivityService } from '../activity.service'
import { ActivityPageComponent } from './activity-page.component'
import { ActivatedRoute, Router } from '@angular/router'
import { of } from 'rxjs'

describe('ActivityPageComponent', () => {
    let component: ActivityPageComponent
    let fixture: ComponentFixture<ActivityPageComponent>
    let activityService: ActivityService
    let router: jasmine.SpyObj<Router>
    //let route: jasmine.SpyObj<ActivatedRoute>;
    let route: any

    beforeEach(async () => {
        activityService = jasmine.createSpyObj('ActivityService', ['postActivity', 'updateActivity'])
        router = jasmine.createSpyObj('Router', ['navigate'])
        route = jasmine.createSpyObj('ActivatedRoute', [], { queryParams: of({ form: '{}' }) })

        await TestBed.configureTestingModule({
            declarations: [],
            imports: [FormsModule, HttpClientTestingModule, ReactiveFormsModule],
            providers: [
                { provide: ActivityService, useValue: activityService },
                { provide: Router, useValue: router },
                { provide: ActivatedRoute, useValue: route },
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(ActivityPageComponent)
        component = fixture.componentInstance
        activityService = TestBed.inject(ActivityService)

        component.activities = [
            {
                id_activity: 1,
                id_user: 1,
                type_activity: 'course',
                date: new Date(2024, 12, 6),
                distance_km: 2,
                duration_min: 120,
                pace: 55,
                heart_beat_min: 60,
                temperature_c: 30,
                gpx_file: '',
                description_activity: 'Activity 1',
                comment: 'comments',
            },
            {
                id_activity: 2,
                id_user: 1,
                type_activity: 'velo',
                date: new Date(2024, 12, 6),
                distance_km: 2,
                duration_min: 120,
                pace: 55,
                heart_beat_min: 60,
                temperature_c: 30,
                gpx_file: '',
                description_activity: 'Activity 2',
                comment: 'comments',
            },
        ]
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
