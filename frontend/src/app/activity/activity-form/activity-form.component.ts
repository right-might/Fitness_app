import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormGroup, FormsModule, NgForm } from '@angular/forms'
import { Subscription } from 'rxjs'
import { Activity } from '../model/activity'
import { ValidationFormService } from '../validation-form.service'
import { CharacterCounterComponent } from '../character-counter/character-counter.component'
import { Router } from '@angular/router'

@Component({
    selector: 'app-receiver',
    standalone: true,
    imports: [FormsModule, CommonModule, CharacterCounterComponent],
    templateUrl: './activity-form.component.html',
    styleUrl: './activity-form.component.scss',
})
export class ActivityFormComponent implements OnInit {
    @Output()
    newActivity = new EventEmitter<Activity>()
    @Input()
    oldActivity!: FormGroup

    isPaceEditable = false

    private oldActivitySubscription!: Subscription

    id_activity: number | undefined
    type_activity: string = ''
    date = new Date()
    dateString = this.date.toISOString().split('T')[0]
    distance_km: number | undefined
    duration_min: number | undefined
    pace = 0
    heart_beat_min: number | undefined
    temperature_c: number | undefined
    gpx_file: string = '' 
    description_activity: string = ''
    comment: string = ''
    buttonText = 'Ajouter'
    title = 'Ajouter une activité'

    types: string[] = ['Course', 'Vélo', 'Marche']

    description_empty: boolean = false
    type_empty: boolean = false
    distance_empty: boolean = false
    duration_empty: boolean = false

    description_invalid: boolean = false
    distance_invalid: boolean = false
    duration_invalid: boolean = false
    date_invalid: boolean = false
    temperature_invalid: boolean = false
    heart_beat_invalid: boolean = false

    constructor(private validationForm: ValidationFormService, private router: Router) {}

    ngOnInit() {
        const idActivityControl = this.oldActivity.get('id_activity')
        if (idActivityControl !== null && idActivityControl.value !== null) {
            this.id_activity = idActivityControl.value
            this.updateFields()
        }
    }

    private updateFields(): void {
        this.type_activity = this.oldActivity.get('type_activity')?.value
        this.date = this.parseDate(this.oldActivity.get('date')?.value) ?? new Date()
        this.dateString = this.date.toISOString().split('T')[0]
        this.distance_km = this.oldActivity.get('distance_km')?.value ?? ''
        this.duration_min = this.oldActivity.get('duration_min')?.value ?? ''
        this.pace = this.calculatePace()
        this.heart_beat_min = this.oldActivity.get('heart_beat_min')?.value ?? ''
        this.temperature_c = this.oldActivity.get('temperature_c')?.value ?? ''
        this.gpx_file = this.oldActivity.get('gpx_file')?.value ?? ''
        this.description_activity = this.oldActivity.get('description_activity')?.value ?? ''
        this.comment = this.oldActivity.get('comment')?.value ?? ''

        this.buttonText = 'Modifier'
        this.title = 'Modifier une activité'
    }

    ngOnDestroy() {
        if (this.oldActivitySubscription) {
            this.oldActivitySubscription.unsubscribe()
        }
    }

    onCommentChanged(comment: string) {
        this.comment = comment
    }

    onCancel() {
        this.router.navigate(['/activities'])
    }

    onSubmit(form: NgForm) {
        if (form.valid) {
            const validValue = this.runAllValidations()
            if (!validValue) {
                form.value.comment = this.comment
                form.value.gpx_file = this.gpx_file
                this.newActivity.emit(form.value)
                form.resetForm()
            }
        } else {
            form.control.markAllAsTouched()
        }
    }

    runAllValidations(): boolean {
        let hasErrors = false
        hasErrors = this.validateDescription() || hasErrors
        hasErrors = this.validateType() || hasErrors
        hasErrors = this.validateDate() || hasErrors
        hasErrors = this.validateDistance() || hasErrors
        hasErrors = this.validateDuration() || hasErrors
        hasErrors = this.validateTemperature() || hasErrors
        hasErrors = this.validateHeartBeat() || hasErrors
        return hasErrors
    }

    onDurDistChange(): void {
        this.pace = this.calculatePace()
    }

    calculatePace(): number {
        let pace = 0
        if (this.distance_km && this.duration_min) {
            pace = this.duration_min / this.distance_km
            pace = Number(pace.toFixed(2))
        }
        return pace
    }

    parseDate(dateString: string | null): Date | null {
        if (!dateString) {
            return null
        }
        const parts = dateString.split('-')
        return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]))
    }

    onFileSelected(f: any) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.gpx_file = e.target.result as string;
        }
        reader.readAsText(f.target.files[0]);
    }


    validateDescription(): boolean {
        this.description_empty = this.validationForm.isEmptyText(this.description_activity)
        return (this.description_invalid =
            !this.description_empty && this.validationForm.isInvalidText(this.description_activity))
    }

    validateType(): boolean {
        return (this.type_empty = this.validationForm.isEmptyText(this.type_activity))
    }

    validateDate(): boolean {
        return (this.date_invalid = this.validationForm.isInvalidDate(this.dateString))
    }

    validateDistance(): boolean {
        this.distance_empty = this.validationForm.isEmptyNumber(this.distance_km)
        return (this.distance_invalid =
            this.distance_km !== undefined &&
            !this.distance_empty &&
            this.validationForm.isInvalidFloat(this.distance_km))
    }

    validateDuration(): boolean {
        this.duration_empty = this.validationForm.isEmptyNumber(this.duration_min)
        return (this.duration_invalid =
            this.duration_min !== undefined &&
            !this.duration_empty &&
            this.validationForm.isInvalidNumber(this.duration_min))
    }

    validateTemperature(): boolean {
        return (
            this.temperature_c !== undefined &&
            this.temperature_c !== 0 &&
            !this.validationForm.isReasonableAmbientTemperature(this.temperature_c)
        )
    }

    validateHeartBeat(): boolean {
        return (
            this.heart_beat_min !== undefined &&
            this.heart_beat_min !== 0 &&
            this.validationForm.isInvalidNumber(this.heart_beat_min)
        )
    }
}
