package com.inm5151.user.security.model;

public class SecurityRequest { 

    private String email;  
    private int no_question;  
    private String reponse; 

    public SecurityRequest(){} 

    public SecurityRequest(String email, int no_question, String reponse){
        this.email = email;
        this.no_question = no_question;
        this.reponse = reponse;
    } 

    // Getter et Setter pour email
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Getter et Setter pour no_question
    public int getNo_question() {
        return no_question;
    }

    public void setNo_question(int no_question) {
        this.no_question = no_question;
    }

    // Getter et Setter pour reponse
    public String getReponse() {
        return reponse;
    }

    public void setReponse(String reponse) {
        this.reponse = reponse;
    }
    
}
