import { Injectable } from '@angular/core'; 

@Injectable({
    providedIn: 'root', // Assurez-vous que le service est disponible globalement
  }) 

export class UserSecurityReponsesService { 
    private reponse1: string = '';
    private reponse2: string = '';
    private reponse3: string = ''; 

 
    constructor() {} 

    saveReponse1(reponse1: string): void {
        this.reponse1 = reponse1;
    } 

    saveReponse2(reponse2: string): void {
        this.reponse2 = reponse2;
    }

    saveReponse3(reponse3: string): void {
        this.reponse3 = reponse3;
    } 

    getReponse1(): string {
        return this.reponse1;
    } 

    getReponse2(): string {
        return this.reponse2;
    }

    getReponse3(): string {
        return this.reponse3;
    }
}