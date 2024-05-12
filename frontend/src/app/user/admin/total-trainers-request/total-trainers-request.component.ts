import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router'


@Component({
  selector: 'app-total-trainers-request',
  standalone: true,
  imports: [RouterModule,RouterOutlet],
  templateUrl: './total-trainers-request.component.html',
  styleUrl: './total-trainers-request.component.css'
})
export class TotalTrainersRequestComponent {
  totalTrainersRequest=1234

}
