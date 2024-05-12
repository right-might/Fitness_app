import { CommonModule } from '@angular/common'
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core'
import { MatPaginator, MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { Activity } from '../model/activity'
import { MatIconModule } from '@angular/material/icon'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ActivityService } from '../activity.service'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AuthenticationService } from '../../user/authentification.service'
import { UserServiceService } from '../../user/profil/service/user-service.service'
import { SelectionModel } from '@angular/cdk/collections'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { TranslateModule } from '@ngx-translate/core'
import { ActivityConfirmComponent } from '../activity-view/activity-view.component'

@Component({
    selector: 'app-emitter',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatIconModule,
        FormsModule,
        MatPaginatorModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        TranslateModule,
    ],
    templateUrl: './activity-table.component.html',
    styleUrl: './activity-table.component.scss',
})
export class ActivityTableComponent implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator
    @ViewChild(MatSort) sort!: MatSort

    @Output()
    activityEvent = new EventEmitter<FormGroup>()

    activities: Activity[] = []
    activitiesSearch: Activity[] = []
    intentForm!: FormGroup

    searchText!: string

    displayedColumns: string[] = [
        'select',
        'date',
        'type_activity',
        'description_activity',
        'duration_min',
        'distance_km',
        'comment',
        'action',
    ]

    dataSource = new MatTableDataSource<Activity>([])

    username$ = this.authenticationService.getUsername()

    username: string | null = null
    usernameSubscription!: Subscription
    userId!: number

    selection = new SelectionModel<any>(true, [])
    dataToRetrieve: number[] = []

    constructor(
        private authenticationService: AuthenticationService,
        private fb: FormBuilder,
        private activityService: ActivityService,
        private cdr: ChangeDetectorRef,
        private dialog: MatDialog,
        private router: Router,
        private userService: UserServiceService,
        private fbs: FormBuilder,
        public _MatPaginatorIntl: MatPaginatorIntl
    ) {
        this.usernameSubscription = this.username$.subscribe((u) => {
            this.username = u
        })
    }

    ngOnInit(): void {
        if (this.username) {
            this.userService.getUserByUsername(this.username).subscribe(
                () => {
                    this.loadActivities('')
                },
                (error) => {
                    console.error('Failed to get user profile:', error)
                }
            )

            this._MatPaginatorIntl.itemsPerPageLabel = 'items par page'
            this._MatPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
                if (length === 0 || pageSize === 0) {
                    return '0 de ' + length
                }
                length = Math.max(length, 0)
                const startIndex = page * pageSize
                // If the start index exceeds the list length, do not try and fix the end index to the end.
                const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize
                return startIndex + 1 + ' - ' + endIndex + ' de ' + length
            }
        }
    }

    ngOnDestroy(): void {
        if (this.usernameSubscription) {
            this.usernameSubscription.unsubscribe()
        }
    }

    loadActivities(filterValue: string): void {
        this.activityService.clear()
        this.loadActivitiesFromService()
        if (filterValue.length === 0) {
            this.activityService.fetchActivities()
        } else {
            this.activityService.filterActivitiesByNeed(filterValue)
        }
    }

    loadActivitiesFromService(): void {
        this.activityService.getActivities().subscribe((activities) => {
            if (activities.length !== 0) {
                this.activities = activities
                this.dataSource.data = this.sortData(this.activities)
                this.updateTable()
            } else {
                this.activities = []
                this.dataSource.data = []
                this.updateTable()
            }
        })
    }

    updateTable(): void {
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
        this.cdr.detectChanges()
    }

    sortData(data: Activity[]): Activity[] {
        return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }

    onModifyActivity(activity: Activity) {
        const selectedActivity = this.activities.find((a) => a.id_activity === activity.id_activity)
        if (selectedActivity) {
            this.intentForm = this.createIntent(selectedActivity, 'edit')
            this.activityEvent.emit(this.intentForm.value)
        }
    }

    onShowActivity(activity: Activity) {
        const activityJson = JSON.stringify(activity)
        this.dialog.open(ActivityConfirmComponent, {
            data: {
                activityString: activityJson,
            },
        })
    }

    onDeleteActivity(activity: Activity): void {
        const selectedActivity = this.activities.find((a) => a.id_activity === activity.id_activity)
        if (selectedActivity) {
            this.intentForm = this.createIntent(selectedActivity, 'remove')
            this.activityEvent.emit(this.intentForm.value)
        }
    }

    private createIntent(selectedActivity: Activity, intent: string): FormGroup {
        return this.fb.group({
            id_activity: [selectedActivity.id_activity],
            indent: intent,
        })
    }

    onOpenMap(activity: Activity) {
        this.router.navigate(['/map/' + activity.id_activity])
    }

    // Méthode pour vérifier si toutes les lignes sont sélectionnées
    isAllSelected() {
        const numSelected = this.selection.selected.length
        const numRows = this.dataSource.data.length
        return numSelected === numRows
    }

    // Méthode pour sélectionner toutes les lignes
    masterToggle() {
        this.isAllSelected()
            ? this.selection.clear()
            : this.dataSource.data.forEach((row) => this.selection.select(row))
    }

    getDataToRetrieve() {
        const selectedActivities = this.selection.selected
        this.dataToRetrieve = selectedActivities.map((activity) => activity.id_activity)
        return this.dataToRetrieve
    }

    clearSelection() {
        this.selection.clear()
    }

    capitalizeFirstLetter(word: String): String {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }
}
