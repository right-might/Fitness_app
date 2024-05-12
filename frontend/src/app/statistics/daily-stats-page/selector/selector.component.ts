import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-selector',
  standalone: true,
  template: `<select (change)="selectDataType($event)">
            <option value=""> Sélectionnez une option</option>
            <option value="speed">Vitesse</option>
            <option value="pace">Allure</option>
            <option value="distance">Distance</option>
            </select>`,
})
export class SelectorComponent {
  @Output() selectionChange = new EventEmitter<string>();
  selectDataType(event: Event){
    const selectElement = event.target as HTMLSelectElement;
    this.selectionChange.emit(selectElement.value);
  }

}
