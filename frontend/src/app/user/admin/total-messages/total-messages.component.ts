import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router'


@Component({
  selector: 'app-total-messages',
  standalone: true,
  imports: [RouterModule,RouterOutlet],
  templateUrl: './total-messages.component.html',
  styleUrl: './total-messages.component.css'
})
export class TotalMessagesComponent {
  totalMessages=123445

}
