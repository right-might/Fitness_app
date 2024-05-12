package com.inm5151.user.administration.model; 

import javax.persistence.*; 

@Entity 
@Table(name ="Administrateur")
public class AdminAccount{ 

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  
    @Column(name = "admin_id")
    private long id; 

    @Column(name = "mot_de_passe") 
    private long password;  




    public AdminAccount(){} 

    public AdminAccount(long id, long password){
        this.id = id;
        this.password = password;
    } 

    //Les setters  

    public void setId(long id){
        this.id = id;
    } 

    public void setPassword(long password){
        this.password = password;
    }

    //Les getters 

    public long getId(){
        return id;
    } 

    public long getPassword(){
        return password;
    }

} 
