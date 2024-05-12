import { Component, OnInit } from "@angular/core";
import { AdminService } from "../admin.service";
import { Trainer } from "../model/model";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";

@Component({
  selector: "app-trainers-request",
  templateUrl: "./trainers-request.component.html",
  styleUrls: ["./trainers-request.component.css"],
  standalone: true,
  imports: [CommonModule],
})
export class TrainersRequestComponent implements OnInit {
  trainerRequests: Trainer[] = [];
  trainerRequestSubscription: Subscription | undefined;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadTrainerRequests();
  }

  loadTrainerRequests() {
    this.trainerRequestSubscription = this.adminService
      .getAllTrainersWithStatusEnAttente()
      .subscribe({
        next: (data) => {
          console.log(data);
          this.trainerRequests = data;
        },
        
        error: (error) => {
          console.error("Une erreur s'est produite : ", error);
        },
      });
  }

  onAccepterTrainer(id: number) {
    this.adminService.confirmerDemandeEntraineur(id).subscribe({
      next: (response) => {
        console.log("Demande de formateur acceptée avec succès !");
        this.loadTrainerRequests();
      },
      error: (error) => {
        console.error(
          "Une erreur s'est produite lors de l'acceptation de la demande de formateur : ",
          error
        );
      },
    });
  }

  ngOnDestroy() {
    if (this.trainerRequestSubscription) {
      this.trainerRequestSubscription.unsubscribe();
    }
  }
}
