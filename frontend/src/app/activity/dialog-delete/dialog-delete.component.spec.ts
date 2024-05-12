import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DialogComponent } from './dialog-delete.component'
import { ReactiveFormsModule } from '@angular/forms'
import { DialogModule } from '@angular/cdk/dialog'

describe('DialogComponent', () => {
    let component: DialogComponent
    let fixture: ComponentFixture<DialogComponent>
    let matDialogRef: MatDialogRef<DialogComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, DialogModule],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: { existingActivity: {} } },
                { provide: MatDialogRef, useValue: { close: () => {} } },
            ],
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogComponent)
        component = fixture.componentInstance
        matDialogRef = TestBed.inject(MatDialogRef)
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should close dialog on confirm', () => {
        spyOn(matDialogRef, 'close')
        component.onConfirm()
        expect(matDialogRef.close).toHaveBeenCalledWith('confirm')
    })

    it('should close dialog', () => {
        spyOn(matDialogRef, 'close')
        component.closeDialog()
        expect(matDialogRef.close).toHaveBeenCalled()
    })
})
