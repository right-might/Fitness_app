import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-total-trainers',
  standalone: true,
  imports: [RouterModule,RouterOutlet],
  templateUrl: './total-trainers.component.html',
  styleUrl: './total-trainers.component.css'
})
export class TotalTrainersComponent {
  totalTrainers=123456

}
