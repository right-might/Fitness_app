package com.inm5151.user.security.model;

import javax.persistence.*; 

@Entity 
@Table(name="security")
public class Security {
    @Id
    @Column(name = "user_id")
    private Long id;  

    @Column(name="reponse1")
    private String reponse1;

    @Column(name="reponse2")
    private String reponse2;

    @Column(name="reponse3")
    private String reponse3; 

    public Security(){}

    public Security(Long id, String reponse1, String reponse2, String reponse3){
        this.id = id; 
        this.reponse1 = reponse1; 
        this.reponse2 = reponse2; 
        this.reponse3 = reponse3;
    } 

    // Getter et Setter pour id
    public Long getId() {
        return id;
    } 

    public void setId(Long id) {
        this.id = id;
    }

    // Getter et Setter pour reponse1
    public String getReponse1() {
        return reponse1;
    }

    public void setReponse1(String reponse1) {
        this.reponse1 = reponse1;
    }

    // Getter et Setter pour reponse2
    public String getReponse2() {
        return reponse2;
    }

    public void setReponse2(String reponse2) {
        this.reponse2 = reponse2;
    }

    // Getter et Setter pour reponse3
    public String getReponse3() {
        return reponse3;
    }

    public void setReponse3(String reponse3) {
        this.reponse3 = reponse3;
    }
} 
