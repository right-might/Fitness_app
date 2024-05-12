import { Injectable } from '@angular/core'
import { Activity } from './model/activity'
import { environment } from '../../environments/environment'
import { BehaviorSubject, Observable, Subscription, first, firstValueFrom, last, lastValueFrom, take } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
import { AuthenticationService } from '../user/authentification.service'
@Injectable({
    providedIn: 'root',
})
export class ActivityService {
    private activities = new BehaviorSubject<Activity[]>([])
    private userId: number | null = null

    ACTIVITIES_PATH = '/activity'
    ACTIVITIES_PATH_SLASH = '/activity/'
    ACTIVITIES_USER_PATH_SLASH = '/activity/user/'

    constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
        this.authService.getId().subscribe((userId) => {
            this.userId = userId
        })
    }

    async postActivity(activity: Activity): Promise<Activity> {
        return firstValueFrom(
            this.httpClient.post<Activity>(`${environment.backendUrl}${this.ACTIVITIES_PATH}`, activity, {
                withCredentials: true,
            })
        )
    }

    async updateActivity(activity: Activity): Promise<Activity> {
        if (!this.hasIdNotNull(activity.id_activity)) {
            const partialActivity: Partial<Activity> = {
                id_activity: activity.id_activity,
                id_user: activity.id_user,
                type_activity: activity.type_activity,
                date: activity.date,
                distance_km: activity.distance_km,
                duration_min: activity.duration_min,
                pace: activity.pace,
                heart_beat_min: activity.heart_beat_min,
                temperature_c: activity.temperature_c,
                gpx_file: activity.gpx_file,
                description_activity: activity.description_activity,
                comment: activity.comment,
            }
            return this.patchActivity(activity, partialActivity)
        } else {
            return this.putActivity(activity)
        }
    }

    async putActivity(activity: Activity): Promise<Activity> {
        if (typeof activity.id_activity !== 'number') {
            throw new Error('ID is not a number')
        }
        return firstValueFrom(
            this.httpClient.put<Activity>(`${environment.backendUrl}${this.ACTIVITIES_PATH}`, activity, {
                withCredentials: true,
            })
        )
    }

    async patchActivity(existingActivity: Activity, partialActivity: Partial<Activity>): Promise<Activity> {
        if (typeof existingActivity.id_activity !== 'number') {
            throw new Error('ID is not a number')
        }
        const mergedActivity: Activity = { ...existingActivity, ...partialActivity } as Activity
        return firstValueFrom(
            this.httpClient.patch<Activity>(
                `${environment.backendUrl}${this.ACTIVITIES_PATH_SLASH}${mergedActivity.id_activity}`,
                mergedActivity,
                {
                    withCredentials: true,
                }
            )
        )
    }

    async removeActivity(id_activity: number): Promise<void> {
        if (typeof id_activity !== 'number') {
            throw new Error('ID is not a number')
        }
        this.httpClient
            .delete<void>(`${environment.backendUrl}${this.ACTIVITIES_PATH_SLASH}${id_activity}`, {
                withCredentials: true,
            })
            .toPromise()
    }

    getActivities(): Observable<Activity[]> {
        return this.activities.asObservable()
    }

    async getActivityById(id_activity: number): Promise<Activity> {
        if (typeof id_activity !== 'number') {
            throw new Error('ID is not a number')
        }
        return firstValueFrom(
            this.httpClient.get<Activity>(`${environment.backendUrl}${this.ACTIVITIES_PATH_SLASH}${id_activity}`, {
                withCredentials: true,
            })
        )
    }

    async fetchActivities() {
        const lastActivityId =
            this.activities.value.length > 0
                ? this.activities.value[this.activities.value.length - 1].id_activity
                : null
        const isIncrementalFetch = lastActivityId != null
        
        let queryParameters = isIncrementalFetch ? new HttpParams().set('fromId', lastActivityId) : new HttpParams()
        const activities = await firstValueFrom(
            this.httpClient.get<Activity[]>(
                `${environment.backendUrl}${this.ACTIVITIES_USER_PATH_SLASH}${this.userId}`,
                {
                    params: queryParameters,
                    withCredentials: true,
                }
            )
        )
        this.activities.next(isIncrementalFetch ? [...this.activities.value, ...activities] : activities)
    }

    async filterActivitiesByNeed(searchText: string) {
        const lastActivityId =
            this.activities.value.length > 0
                ? this.activities.value[this.activities.value.length - 1].id_activity
                : null
        const isIncrementalFetch = lastActivityId != null
        let queryParameters = isIncrementalFetch ? new HttpParams().set('fromId', lastActivityId) : new HttpParams()
        const activities = await firstValueFrom(
            this.httpClient.get<Activity[]>(`${environment.backendUrl}${this.ACTIVITIES_USER_PATH_SLASH}${this.userId}/${searchText}`, {
                params: queryParameters,
                withCredentials: true,
            })
        )
        this.activities.next(isIncrementalFetch ? [...this.activities.value, ...activities] : activities)
    }

    async filterActivitiesByDate(startDate: string, endDate: string) {
        const lastActivityId =
            this.activities.value.length > 0
                ? this.activities.value[this.activities.value.length - 1].id_activity
                : null
        const isIncrementalFetch = lastActivityId != null
        let queryParameters = isIncrementalFetch ? new HttpParams().set('fromId', lastActivityId) : new HttpParams()
        const activities = await firstValueFrom(
            this.httpClient.get<Activity[]>(`${environment.backendUrl}/activity/${startDate}/${endDate}`, {
                params: queryParameters,
                withCredentials: true,
            })
        )
        this.activities.next(isIncrementalFetch ? [...this.activities.value, ...activities] : activities)
    }

    clear() {
        this.activities.next([])
    }

    private hasIdNotNull(activity: any): boolean {
        return activity.id !== null
    }
}
