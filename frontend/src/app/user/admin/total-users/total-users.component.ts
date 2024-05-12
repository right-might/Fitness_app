import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router'


@Component({
  selector: 'app-total-users',
  standalone: true,
  imports: [RouterModule,RouterOutlet],
  templateUrl: './total-users.component.html',
  styleUrl: './total-users.component.css'
})
export class TotalUsersComponent {
  totalUsers: number = 1234; // Valeur statique pour l'exemple


}
