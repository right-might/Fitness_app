package com.inm5151.user.message.model;

public class MessageRequest { 

    private long user_id; 
    private String sujet; 
    private String contenu;

    public MessageRequest(){}

    public MessageRequest(long user_id, String sujet, String contenu){
        this.user_id = user_id;
        this.sujet = sujet;
        this.contenu = contenu;
    }

    // Getters
    public long getUserId() {
        return user_id;
    }

    public String getSujet() {
        return sujet;
    }

    public String getContenu() {
        return contenu;
    }

    // Setters
    public void setUserId(long user_id) {
        this.user_id = user_id;
    }

    public void setSujet(String sujet) {
        this.sujet = sujet;
    }

    public void setContenu(String contenu) {
        this.contenu = contenu;
    }
}
