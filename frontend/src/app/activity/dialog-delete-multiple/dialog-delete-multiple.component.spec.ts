import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { SelectMultipleComponent } from './dialog-delete-multiple.component'
import { ReactiveFormsModule } from '@angular/forms'
import { DialogModule } from '@angular/cdk/dialog'

describe('SelectMultipleComponent', () => {
    let component: SelectMultipleComponent
    let fixture: ComponentFixture<SelectMultipleComponent>
    let matDialogRef: MatDialogRef<SelectMultipleComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, DialogModule],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: { existingActivity: {} } },
                { provide: MatDialogRef, useValue: { close: () => {} } },
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(SelectMultipleComponent)
        component = fixture.componentInstance
        matDialogRef = TestBed.inject(MatDialogRef)
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
