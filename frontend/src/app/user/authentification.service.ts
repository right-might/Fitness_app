import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs'
import { UserCredentials } from './login/model/loginRequest'
import { UserNewAccount } from './registration/model/user-registration'
import { UserProfile } from './profil/model/user-profile'
import { UserNewMessage } from './formulaire/model/user-message' 
import { environment } from '../../environments/environment'
import { UserNewSecurity } from "../user/registration/model/user-security" 
import { UserNewPassword } from './password_forgotten/model/UserNewPassword'
import { UserRenewPassword } from './password_forgotten/model/UserRenewPassword'
 
@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    static KEY = 'username'
    static KEY_ID = 'userId'

    private apiUrl = environment.backendUrl
    private username = new BehaviorSubject<string | null>(null)
    private userProfile = new BehaviorSubject<UserProfile | null>(null)
    private userId = new BehaviorSubject<number | null>(null)

    constructor(private httpClient: HttpClient) {
        this.username.next(localStorage.getItem(AuthenticationService.KEY))
        this.userId.next(Number(localStorage.getItem(AuthenticationService.KEY_ID)))
    }

    async createNewUser(newUserData: UserNewAccount) {
        const response = await firstValueFrom(
            this.httpClient.post<any>(`${this.apiUrl}/api/users/register`, newUserData, {
                withCredentials: true,
            })
        )
    }

    async createMessage(newUserData: UserNewMessage) {
        console.log('On est dans la methode createMessage dans authentification.service')
        const response = await firstValueFrom(
            this.httpClient.post<any>(`${this.apiUrl}/messages/creerMessages`, newUserData, {
                withCredentials: true,
            })
        )
    }  
    
    async validateSecurityQuestion(newUserData: UserNewPassword) {
        console.log('On est dans la methode validateSecurityQuestion dans authentification.service')
        console.log(newUserData); 
        const reponse = await firstValueFrom(
            this.httpClient.post<any>(`${this.apiUrl}/security/validate_security_answer`, newUserData, {
                withCredentials: true,
            })
        )
    }  

    async renewPassword(newUserData: UserRenewPassword){
        console.log('On est dans la methode renewPassword dans authentification.service') 
        console.log(newUserData);
        const reponse = await firstValueFrom(
            this.httpClient.post<any>(`${this.apiUrl}/api/users/reset_password`, newUserData, {
                withCredentials: true,
            })
        ) 
    } 
 
    async registerSecurity(newUserData: UserNewSecurity) {
        console.log('On est dans la methode registerSecurity dans authentification.service');
        console.log(newUserData);
        const reponse = await firstValueFrom(
            this.httpClient.post<any>(
                `${this.apiUrl}/security/register_answers`, newUserData,
                {
                    withCredentials: true,
                }
            )
        );
    }

    async loginUser(userCredentials: UserCredentials): Promise<any> {
        try {
            const response = await firstValueFrom(
                this.httpClient.post(`${this.apiUrl}/api/users/login`, userCredentials, {
                    observe: 'response',
                    withCredentials: true,
                    responseType: 'json',
                })
            )

            let userData: UserProfile | any = response.body

            if (userData) {
                this.userProfile.next(userData)

                if (userData.id) {
                    this.setStoredUserId(userData.id)
                    this.userId.next(userData.id)
                }

                if (userData.username) {
                    this.setStoredUsername(userData.username)
                    this.username.next(userData.username)
                }
            }
        } catch (error) {
            throw error
        }
    }

    async logoutUser() {
        try {
            await firstValueFrom(
                this.httpClient.post(`${this.apiUrl}/api/users/logout`, null, {
                    withCredentials: true,
                })
            )
        } finally {
            this.setStoredUsername(null)
            this.username.next(null)
            this.setStoredUserId(null)
            this.userId.next(null)
        }
    }

    getUsername(): Observable<string | null> {
        return this.username.asObservable()
    }
    setUsername(newName: string | null) {
        this.username.next(newName)
    }

    getId(): Observable<number | null> {
        return this.userId.asObservable()
    } 

    async getUserId(email: string): Promise<number> { 
        console.log("on est dans la methode getUserId dans la classe authentification.service")
        console.log(email)
        const response = await firstValueFrom(
          this.httpClient.post(`${this.apiUrl}/security/security_questions`, email, {
            withCredentials: true,
          })
        );
        console.log(response);
        // Assurez-vous que la réponse est bien un nombre avant de la retourner
        if (typeof response === 'number') {
          return response;
        } else {
          throw new Error('La réponse n\'est pas un nombre valide.');
        }
    }

    isConnected(): boolean {
        return this.getStoredUsername() != null
    }

    private getStoredUsername(): string | null {
        return localStorage.getItem(AuthenticationService.KEY)
    }

    private setStoredUsername(username: string | null) {
        if (username != null) {
            localStorage.setItem(AuthenticationService.KEY, username)
        } else {
            localStorage.removeItem(AuthenticationService.KEY)
        }
    }

    private setStoredUserId(userId: number | null) {
        if (userId != null) {
            let userIdString = userId.toString()
            localStorage.setItem(AuthenticationService.KEY_ID, userIdString)
        } else {
            localStorage.removeItem(AuthenticationService.KEY_ID)
        }
    }
}
