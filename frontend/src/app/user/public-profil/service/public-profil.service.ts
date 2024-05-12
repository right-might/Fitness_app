import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { UserProfile } from "../../profil/model/user-profile";
import { Observable, firstValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ActivityService } from "../../../activity/activity.service";
import { Activity } from "../../../activity/model/activity";

@Injectable({
  providedIn: "root",
})
export class PublicProfilService {
  private apiUrl = environment.backendUrl;
  private userPublicProfil: UserProfile | null = null;
  activities: any;
  constructor(
    private http: HttpClient,
    private activityService: ActivityService
  ) {}

  getUser(id: number): Observable<UserProfile> {
    const url = `${this.apiUrl}/api/users/get/${id}`;

    return this.http.get<UserProfile>(url);
  }
  getUserPublicinf0(username: String): Observable<UserProfile> {
    const url = `${this.apiUrl}/api/users/find-info-public/${username}`;

    return this.http.get<UserProfile>(url);
  }
  getUserInfoForAdmin(username: String) {
    const url = `${this.apiUrl}/api/users/find-info-admin/${username}`;

    return this.http.get<UserProfile>(url);
  }

  async getUserActivities(userId: number) {
    const activities = await firstValueFrom(
      this.http.get<Activity[]>(`${this.apiUrl}/activity/user/${userId}`, {
        withCredentials: true,
      })
    );
    return activities;
  }
}
