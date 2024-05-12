
export interface Trainer {
    id: number;
    status: string;
    account: {
      userId: number;
      firstName: string;
      lastName: string;
      username: string;
      email: string;
      password: string;
      role: string;
      trainerUsername: string | null;
    };
  };
  
  export interface Message {
    user_id:number;
    sujet:string;
    contenu:string;
    date:Date
    heure: string;


  }

  export interface AdminLoginRequest{
    id:number;
    password:number;
  }

