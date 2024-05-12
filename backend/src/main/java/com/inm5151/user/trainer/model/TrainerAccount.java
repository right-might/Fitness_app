package com.inm5151.user.trainer.model;

import javax.persistence.*;

import com.inm5151.user.Role;
import com.inm5151.user.TrainerStatus;
import com.inm5151.user.authentification.model.UserAccount; 

@Entity
@Table(name = "Trainer")
public class TrainerAccount {

    //private String[] status_entraineurs = { "en attente", "confirme", "retire" };

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @Column(name = "trainer_id")
    private long id;

    @Enumerated(EnumType.STRING) 
    @Column(name = "status") 
    private TrainerStatus status;  

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserAccount account; 


    public TrainerAccount(){} 

    public TrainerAccount(long id, TrainerStatus status, UserAccount account){
        this.id = id;
        this.status = status;
        this.account = account;
        this.account.setRole(Role.TRAINER);
        
    }

    // Les setters
    public void setId(long id){
        this.id = id; 
        this.account.setId(id);
    } 

    public void setStatus(TrainerStatus nouveauStatus){
        this.status = nouveauStatus;
    }

    public void setAccount(UserAccount account) {
        this.account = account;
    }


    public long getId() {
        return id;
    }

    public TrainerStatus getStatus(){
        return status;
    }

    public UserAccount getAccount() {
        return account;
    }
    public long getUserId(){
        return account.getId();
    }

}
