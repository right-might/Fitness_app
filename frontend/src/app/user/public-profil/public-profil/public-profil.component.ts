import { Component, Input } from "@angular/core";
import { UserProfile } from "../../profil/model/user-profile";
import { PublicProfilService } from "../service/public-profil.service";
import { CommonModule } from "@angular/common";
import { UserServiceService } from "../../profil/service/user-service.service";
import { ActivatedRoute, Router
 } from "@angular/router";
import { AdminService } from "../../admin/admin.service";
import { ActivityService } from "../../../activity/activity.service";
import { Activity } from "../../../activity/model/activity";

@Component({
  selector: "app-public-profil",
  standalone: true,
  templateUrl: "./public-profil.component.html",
  styleUrls: ["./public-profil.component.css"],
  imports: [CommonModule],
})
export class PublicProfilComponent {
  constructor(
    private publicProfil: PublicProfilService,
    private route: ActivatedRoute,

    private userService: UserServiceService,
    private adminservice:AdminService,
    private activityService:ActivityService
  ) {}

  userProfile: UserProfile | null = null;
  userActivities!: Activity[];

  @Input()
  otherUserId: number | null = null;
  @Input()
  otherUserName: string | null = null;


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.otherUserName = params["username"];
      this.onGetUser();
    });
    this.showUserActivities();
  }

  onGetUser() {
    if(this.adminservice.isAdmin()){
    if (this.otherUserName) {
      this.publicProfil.getUserInfoForAdmin(this.otherUserName)
        .subscribe((userProfile) => {
          this.userProfile = userProfile;
        });
    }
  }
 else{
  if (this.otherUserName) {
    this.publicProfil.getUserPublicinf0(this.otherUserName)
      .subscribe((userProfile) => {
        this.userProfile = userProfile;
      });
  }

  }
}

onGetUserActivities(userId: number) {
  this.publicProfil.getUserActivities(userId).then((activities) => {
    this.userActivities = activities; 
  });
}


showUserActivities() {
  if (this.userProfile) {
    this.onGetUserActivities(this.userProfile.id);
    console.log(this.userProfile.id)
  }
}
}


  



