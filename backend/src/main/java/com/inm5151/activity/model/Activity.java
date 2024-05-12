
package com.inm5151.activity.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("id_activity")
    private int idActivity;

    @JsonProperty("id_user")
    private int idUser;

    @JsonProperty("type_activity")
    private String typeActivity;
    
    @JsonProperty("description_activity")
    private String descriptionActivity;
    
    @JsonProperty("date")
    private LocalDate date;
    
    @JsonProperty("duration_min")
    private double durationMin;

    @JsonProperty("distance_km")
    private double distanceKm;

    @JsonProperty("heart_beat_min")
    private double heartBeatMin;

    @JsonProperty("temperature_c")
    @Column(name = "temperature_c")
    private double temperatureC;

    @JsonProperty("gpx_file")
    private String gpx_file;
    
    @JsonProperty("comment")
    private String comment;


    public Activity() {}

    public Activity(int idUser, double distanceKm, String comment, String gpx_file) {
        setIdUser(idUser);
        setDistanceKm(distanceKm);
        setComment(comment);
        setGpxFile(gpx_file);
    }

    public Activity(int idActivity, int idUser, double distanceKm, String comment, String gpx_file) {
        setIdActivity(idActivity);
        setIdUser(idUser);
        setDistanceKm(distanceKm);
        setComment(comment);
        setGpxFile(gpx_file);
    }

    // Constructor with mandatory fields
    public Activity(int idUser, String typeActivity, LocalDate date) {
        setIdUser(idUser);
        setTypeActivity(typeActivity);
        setDate(date);
    }

    // Constructor with mandatory fields + id
    public Activity(int idActivity, int idUser, String typeActivity, LocalDate date) {
        setIdActivity(idActivity);
        setIdUser(idUser);
        setTypeActivity(typeActivity);
        setDate(date);
    }

    // Constructor with all fields
    public Activity(int idUser, String typeActivity, String descriptionActivity, LocalDate date, double durationMin, 
                    double distanceKm, double heartBeatMinut, double temperatureCelcius, String comment, String gpx_file) {
        setIdUser(idUser);
        setTypeActivity(typeActivity);
        setDescriptionActivity(descriptionActivity);
        setDate(date);
        setDurationMin(durationMin);
        setDistanceKm(distanceKm);
        setHeartBeatMinut(heartBeatMinut);
        setTemperatureCelcius(temperatureCelcius);
        setGpxFile(gpx_file);
        setComment(comment);
    }

    // Constructor with all fields + id
    public Activity(int idActivity, int idUser, String typeActivity, String descriptionActivity, LocalDate date, 
                    double durationMin, double distanceKm, double heartBeatMinut, double temperatureCelcius, String comment, String gpx_file) {
        setIdActivity(idActivity);
        setIdUser(idUser);
        setTypeActivity(typeActivity);
        setDescriptionActivity(descriptionActivity);
        setDate(date);
        setDurationMin(durationMin);
        setDistanceKm(distanceKm);
        setHeartBeatMinut(heartBeatMinut);
        setTemperatureCelcius(temperatureCelcius);
        setGpxFile(gpx_file);
        setComment(comment);
    }

    @Override
    public String toString() {
        return
            "Activity{" +
            "id_activity = " + idActivity +
            ", type_activity = " + typeActivity +
            ", date = " + date +
            ", distance_km = " + distanceKm +
            ", comment = '" + comment + "'" +
            '}';
    }

    // getters
    public int getIdActivity() {
        return idActivity;
    }

    public int getIdUser() {
        return idUser;
    }

    public String getTypeActivity() {
        return typeActivity;
    }

    public String getDescriptionActivity() {
        return descriptionActivity;
    }

    public LocalDate getDate() {
        return date;
    }

    public double getDurationMin() {
        return durationMin;
    }

    public double getDistanceKm() {
        return distanceKm;
    }

    public double getHeartBeatMin() {
        return heartBeatMin;
    }

    public double getTemperatureC() {
        return temperatureC;
    }

    public String getGpxFile() {
        return gpx_file;
    }

    public String getComment() {
        return comment;
    }


    // setters
    public void setIdActivity(int idActivity) {
        this.idActivity = idActivity;
    }

    public void setIdUser(int idUser) {
       this.idUser = idUser;
    }

    public void setTypeActivity(String typeActivity) {
        this.typeActivity = typeActivity;
    }

    public void setDescriptionActivity(String descriptionActivity) {
        this.descriptionActivity = descriptionActivity;
    }

    public void setDate(LocalDate date) {
        this.date = (date == null) ? LocalDate.now() : date;   
    }

    public void setDurationMin(double durationMin) {
        this.durationMin = durationMin;
    }

    public void setDistanceKm(double distanceKm) {
        this.distanceKm = (distanceKm == 0) ? 1 : distanceKm;
    }

    public void setHeartBeatMinut(double heartBeatMin) {
        this.heartBeatMin = heartBeatMin;
    }

    public void setTemperatureCelcius(double temperatureC) {
        this.temperatureC = temperatureC;
    }

    public void setGpxFile(String gpx_file) {
        this.gpx_file = gpx_file;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }


}
