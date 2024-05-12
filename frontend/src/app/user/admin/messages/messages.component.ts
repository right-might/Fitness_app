import { Component } from '@angular/core';
import { Message } from '../model/model';
import { Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
import { CommonModule,DatePipe } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule,DatePipe],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
}) 
export class MessagesComponent {
  //constructor
  constructor(private adminService: AdminService) {}
  //variables
  messages: Message [] =[];
  messagesSubscription: Subscription | undefined;
//functions

ngOnInit(): void {
  this.onLoadMessages();
}

onLoadMessages(){
  this.messagesSubscription=this.adminService.getMessages().subscribe(({
    next:(loadMessages)=>{this.messages=loadMessages},
    error:(error)=>{
      console.error('Une erreur s\'est produite lors du chargement des messages: ', error);

    }
  }

  ));
}
ngOnDestroty(){
  this.messagesSubscription?.unsubscribe();
}


}
