import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Trainer } from '../model/model';
import { Subscription } from "rxjs";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-trainers-list',
  templateUrl: './trainers-list.component.html',
  styleUrls: ['./trainers-list.component.css'],
  imports:[CommonModule],
  standalone:true,
})
export class TrainersListComponent implements OnInit {
  trainers: Trainer[] = [];
  trainersSubscription: Subscription | undefined;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadConfirmedTrainers();
  }

  loadConfirmedTrainers() {
    this.trainersSubscription=this.adminService.
    getAllTrainersWithStatusConfirme().
    subscribe({
      next:(data)=>{
        this.trainers=data
      },
    error:(error)=>{
    console.error('Une erreur s\'est produite lors du chargement des entraîneurs confirmés : ', error);
      }
    }
    );
  }
}
