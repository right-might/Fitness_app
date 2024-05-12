import { Component, EventEmitter, Output } from '@angular/core'
import { FormsModule, NgForm } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { TranslateModule } from '@ngx-translate/core'

@Component({
    selector: 'app-activity-search',
    standalone: true,
    imports: [FormsModule, MatIconModule, TranslateModule],
    templateUrl: './activity-search.component.html',
    styleUrl: './activity-search.component.scss',
})
export class ActivitySearchComponent {
    @Output()
    searchActivity = new EventEmitter<string>()

    searchText: string = ''

    onSearch(form: NgForm) {
        if (form.valid && form.value.searchText) {
            this.searchActivity.emit(form.value.searchText)
        }
    }

    clearText() {
        this.searchText = ''
    }
}
