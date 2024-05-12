import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserProfile } from "../model/user-profile";
import { environment } from "../../../../environments/environment";
import { Trainer } from "../../admin/model/model";

@Injectable({
  providedIn: "root",
})
export class UserServiceService {
  private apiUrl = environment.backendUrl;

  constructor(private http: HttpClient) {}

  getUserByUsername(username: string): Observable<UserProfile> {
    const url = `${this.apiUrl}/api/users/find/${username}`;
    return this.http.get<UserProfile>(url);
  }

  getUser(id: number): Observable<UserProfile> {
    const url = `${this.apiUrl}/api/users/get/${id}`;
    return this.http.get<UserProfile>(url);
  }

  becomeTrainer(username: string): Observable<UserProfile> {
    const url = `${this.apiUrl}/api/users/becomeTrainer/`;
    return this.http.post<UserProfile>(url, username);
  }

  deleteUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}/api/users/delete/${userId}`;
    return this.http.delete(url);
  }

  joinTrainer(userId: number, trainerId: number): Observable<any> {
    const url = `${this.apiUrl}/api/users/joinTrainer`;
    const params = new HttpParams()
      .set("userId", userId)
      .set("trainerId", trainerId);
    return this.http.post<any>(url, params);
  }

  getAllTrainers(): Observable<Trainer[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/trainers/confirme`);
  }

  updateUser(updatedUserProfile: UserProfile): Observable<any> {
    const url = `${this.apiUrl}/api/users/update/${updatedUserProfile.id}`;
    return this.http.patch<any>(url, updatedUserProfile);
  }
}
