export interface UserNewAccount {
    id:number | null;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    dateOfBirth: Date;
    password: string;
}
