package com.inm5151.user.client.model;

import javax.persistence.*;

import com.inm5151.user.authentification.model.UserAccount;
import com.inm5151.user.trainer.model.TrainerAccount; 

@Entity 
@Table(name = "Client")
public class ClientAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @Column(name = "user_id")
    private long id;  

    @Column(name = "trainer_id")
    private long trainer_id; 

    @Column(name = "trainer_username") 
    private String trainer_username; 

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserAccount account; 

    @OneToOne
    @JoinColumn(name = "user_id")
    private TrainerAccount trainer;

    // Constructeur vide
    public ClientAccount() {
    }

    // Constructeur avec arguments
    public ClientAccount(long id, long trainer_id, String trainer_username, UserAccount account, TrainerAccount trainer) {
        this.id = id;
        this.trainer_id = trainer_id;
        this.trainer_username = trainer_username;
        this.account = account;
        this.trainer = trainer;
    }
    
    // Constructeur avec arguments
    public ClientAccount(long id, long trainer_id, String trainer_username) {
        this.id = id;
        this.trainer_id = trainer_id;
        this.trainer_username = trainer_username;
     
    }

    // Getters et setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getTrainer_id() {
        return trainer_id;
    }

    public void setTrainer_id(long trainer_id) {
        this.trainer_id = trainer_id;
    }

    public String getTrainer_username() {
        return trainer_username;
    }

    public void setTrainer_username(String trainer_username) {
        this.trainer_username = trainer_username;
    }

    public UserAccount getAccount() {
        return account;
    }

    public void setAccount(UserAccount account) {
        this.account = account;
    }

    public TrainerAccount getTrainer() {
        return trainer;
    }

    public void setTrainer(TrainerAccount trainer) {
        this.trainer = trainer;
    }
}
