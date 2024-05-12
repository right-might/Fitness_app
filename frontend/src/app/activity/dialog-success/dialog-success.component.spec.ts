import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ReactiveFormsModule } from '@angular/forms'
import { DialogModule } from '@angular/cdk/dialog'
import { SuccessDialogComponent } from './dialog-success.component'

describe('SuccessDialogComponent', () => {
    let component: SuccessDialogComponent
    let fixture: ComponentFixture<SuccessDialogComponent>
    let matDialogRef: MatDialogRef<SuccessDialogComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, DialogModule],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: { close: () => {} } },
            ],
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(SuccessDialogComponent)
        component = fixture.componentInstance
        matDialogRef = TestBed.inject(MatDialogRef)
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
