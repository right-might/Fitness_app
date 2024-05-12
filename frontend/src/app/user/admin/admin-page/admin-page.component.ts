import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router'
import { TotalUsersComponent } from '../total-users/total-users.component';
import { TotalMessagesComponent } from '../total-messages/total-messages.component';
import { TotalTrainersRequestComponent } from '../total-trainers-request/total-trainers-request.component';
import { TotalTrainersComponent } from '../total-trainers/total-trainers.component';





@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [RouterModule,RouterOutlet,
    TotalUsersComponent,
    TotalTrainersRequestComponent,
    TotalMessagesComponent,
    TotalTrainersComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {

}
