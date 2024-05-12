import { TestBed } from '@angular/core/testing'

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { ActivityService } from './activity.service'
import { environment } from '../../environments/environment'
import { Activity } from './model/activity'

describe('ActivityService', () => {
    let service: ActivityService
    let httpMock: HttpTestingController

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ActivityService],
        })
        service = TestBed.inject(ActivityService)
        httpMock = TestBed.inject(HttpTestingController)
    })

    afterEach(() => {
        httpMock.verify()
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    it('should post an activity', async () => {
        const activity: Activity = {
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
        }

        const promise = service.postActivity(activity)
        const req = httpMock.expectOne(`${environment.backendUrl}${service.ACTIVITIES_PATH}`)
        expect(req.request.method).toBe('POST')
        req.flush(activity)

        const result = await promise
        expect(result).toEqual(activity)
    })

    it('should update activity totally', async () => {
        const activity: Activity = {
            id_activity: 0,
            id_user: 1,
            type_activity: 'velo',
            date: new Date(2024, 12, 6),
            distance_km: 2,
            duration_min: 120,
            pace: 55,
            heart_beat_min: 60,
            temperature_c: 30,
            gpx_file: '',
            description_activity: 'Activity 1',
            comment: 'comments',
        }

        const promise = service.putActivity(activity)
        const req = httpMock.expectOne(`${environment.backendUrl}${service.ACTIVITIES_PATH}`)
        expect(req.request.method).toBe('PUT')
        req.flush(activity)

        const result = await promise
        expect(result).toEqual(activity)
    })

    it('should update activity partially', (done) => {
        const existingActivity: Activity = {
            id_activity: 1,
            id_user: 1,
            type_activity: 'marche',
            date: new Date(2024, 12, 6),
            distance_km: 2,
            duration_min: 120,
            pace: 55,
            heart_beat_min: 60,
            temperature_c: 30,
            gpx_file: '',
            description_activity: 'Activity 1',
            comment: 'comments',
        }

        const partialActivity: Partial<Activity> = { description_activity: 'Updated Activity' }
        const mergedActivity: Activity = { ...existingActivity, ...partialActivity } as Activity
        service.patchActivity(existingActivity, partialActivity).then((result: Activity) => {
            expect(result).toEqual(mergedActivity)
            done()
        })
        const req = httpMock.expectOne(
            `${environment.backendUrl}${service.ACTIVITIES_PATH_SLASH}${existingActivity.id_activity}`
        )
        expect(req.request.method).toBe('PATCH')
        req.flush(mergedActivity)
    })

    it('should remove an activity', async () => {
        const id = 1

        const promise = service.removeActivity(id)
        const req = httpMock.expectOne(`${environment.backendUrl}${service.ACTIVITIES_PATH_SLASH}${id}`)
        expect(req.request.method).toBe('DELETE')
        req.flush(null)

        await promise
        expect(true).toBeTruthy()
    })
})
