package com.inm5151.user.message.model;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.persistence.*;

@Entity
@Table(name = "Message")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private Long id;

    @JoinColumn(name = "user_id")
    private Long user_id;

    @Column(name = "sujet")
    private String sujet;

    @Column(name = "contenu")
    private String contenu;

    @Column(name = "date")
    LocalDate date;

    @Column(name = "heure")
    LocalTime heure;

    public Message() {
    }

    public Message(Long id, Long user_id, String sujet, String contenu, LocalDate date, LocalTime heure) {
        this.id = id;
        this.user_id = user_id;
        this.sujet = sujet;
        this.contenu = contenu;
        this.date = date;
        this.heure = heure;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return user_id;
    }

    public String getSujet() {
        return sujet;
    }

    public String getContenu() {
        return contenu;
    }

    public LocalDate getDate() {
        return date;
    }

    public LocalTime getHeure() {
        return heure;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long user_id) {
        this.user_id = user_id;
    }

    public void setSujet(String sujet) {
        this.sujet = sujet;
    }

    public void setContenu(String contenu) {
        this.contenu = contenu;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setHeure(LocalTime heure) {
        this.heure = heure;
    }
}
