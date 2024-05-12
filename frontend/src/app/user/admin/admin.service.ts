import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, firstValueFrom } from "rxjs";
import { AdminLoginRequest } from "./model/model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  static ADMINKEY = "adminkey";

  private apiUrl = `${environment.backendUrl}/admin`;




  constructor(private http: HttpClient) {}

  async authenticateAdmin(adminData: AdminLoginRequest) {
    try {
      const response = await firstValueFrom(
        this.http.post(`${this.apiUrl}/authenticate`, adminData, {
          responseType: "text",
        })
      );

      localStorage.setItem(AdminService.ADMINKEY, response);
      console.log("Admin key:", response);
    } catch (error) {
      console.error("Error during admin authentication:", error);
      throw error;
    }
  }

  isAdmin(): boolean {
    return this.getAdminKey() !== null;
  }

  getAllUsersAndClients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usersAndClients`);
  }

  getAllTrainersWithStatusEnAttente(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/trainers/enattente`);
  }

  getAllTrainersWithStatusConfirme(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/trainers/confirme`);
  }

  confirmerDemandeEntraineur(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/trainers/confirmDemande/${id}`);
  }

  retirerStatusEntrainer(id: number): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/trainers/retirerStatus/${id}`,
      {}
    );
  }

  getMessages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/messages`);
  }

  getAdminKey(): string | null {
    return localStorage.getItem(AdminService.ADMINKEY);
  }

  logoutAdmin(): void {
    localStorage.removeItem(AdminService.ADMINKEY);
  }
}
