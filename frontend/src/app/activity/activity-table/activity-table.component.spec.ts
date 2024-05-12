import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ActivityService } from '../activity.service'
import { ActivityTableComponent } from './activity-table.component'
import { ChangeDetectorRef } from '@angular/core'
import { MatTableModule } from '@angular/material/table'
import { Activity } from '../model/activity'

describe('ActivityTableComponent', () => {
    let component: ActivityTableComponent
    let fixture: ComponentFixture<ActivityTableComponent>
    let activityService: ActivityService
    let mockActivityService: jasmine.SpyObj<ActivityService>
    let mockChangeDetectorRef: jasmine.SpyObj<ChangeDetectorRef>

    beforeEach(async () => {
        mockActivityService = jasmine.createSpyObj('ActivityService', ['clear', 'getActivities', 'fetchActivities'])
        mockChangeDetectorRef = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges'])

        await TestBed.configureTestingModule({
            declarations: [],
            imports: [FormsModule, HttpClientTestingModule, MatTableModule, ReactiveFormsModule],
            providers: [
                { provide: ActivityService, useValue: mockActivityService },
                { provide: ChangeDetectorRef, useValue: mockChangeDetectorRef },
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(ActivityTableComponent)
        component = fixture.componentInstance
        activityService = TestBed.inject(ActivityService)
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    /*it('should emit correct form group when onDeleteActivity is called', () => {
        const activity: Activity = {
            id_activity: 1,
            id_user: 1,
            description_activity: 'Test Activity',
            type_activity: 'Test Type',
            date: new Date(),
            distance_km: 10,
            duration_min: 60,
            pace: 6,
            heart_beat_min: 80,
            temperature_c: 25,
            gpx_file: '',
            comment: 'Test Comment',
        }

        spyOn(component.activityEvent, 'emit').and.callThrough()

        component.onDeleteActivity(activity)

        expect(component.activityEvent.emit).toHaveBeenCalled()
        expect(component.activityEvent.emit).toHaveBeenCalledWith(
            jasmine.objectContaining({
                id_activity: activity.id_activity,
                indent: 'remove',
            })
        )
    })*/

    /*it('should load activities on ngOnInit', () => {
        spyOn(component, 'loadActivities').and.callThrough()
        spyOn(component['cdr'], 'detectChanges')

        component.ngOnInit()

        expect(component.loadActivities).toHaveBeenCalled()
        expect(mockActivityService.getActivities).toHaveBeenCalled()
        expect(component['cdr'].detectChanges).toHaveBeenCalled()
        expect(component.activities.length).toBeGreaterThan(0)
    })*/
})
