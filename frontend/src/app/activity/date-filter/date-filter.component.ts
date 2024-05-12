import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Output, ViewChild } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter'
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core'
import { MatDateRangePicker, MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { ActivityListComponent } from '../activity-list/activity-list.component'

@Component({
    selector: 'app-date-filter',
    standalone: true,
    imports: [CommonModule, FormsModule, MatFormFieldModule, MatDatepickerModule, ActivityListComponent],
    templateUrl: './date-filter.component.html',
    styleUrl: './date-filter.component.scss',
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-EN' },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ],
})
export class DateFilterComponent {
    selectedDate: { start: string; end: string } | null = null
    @ViewChild(MatDateRangePicker) picker!: MatDateRangePicker<Date>
    startDate: Date | null = null
    endDate: Date | null = null

    @Output() dateSelected = new EventEmitter<{ start: string; end: string }>()

    constructor(private act: ActivityListComponent) {}

    cancelPopup() {
        this.act.toggleDatePicker()
    }

    closeDialog(): void {
        this.act.toggleDatePicker()
    }

    applySelection(): void {
        const startified = JSON.stringify(this.startDate)
        const endified = JSON.stringify(this.endDate)

        const startDateString = startified.substring(1, 11)
        const endDateString = endified.substring(1, 11)

        if (startDateString && endDateString) {
            this.selectedDate = { start: startDateString, end: endDateString }
            this.dateSelected.emit(this.selectedDate)
        }
        this.act.toggleDatePicker()
    }
}
