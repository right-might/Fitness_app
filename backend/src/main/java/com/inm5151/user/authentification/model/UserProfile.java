package com.inm5151.user.authentification.model;

import com.inm5151.user.Role;

public class UserProfile {
    private long id;
    private String firstName;
    private String lastName;
    private String password;
    private String username;
    private String email;
    private Role role;
    private String bio;
    private String profilePicture;
    private String trainerUsername;

    // Constructors
    public UserProfile() {
    }

    public UserProfile(int id, String firstName, String lastName, String password, String username, String email, Role role, String bio, String profilePicture, String trainerUsername) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.username = username;
        this.email = email;
        this.role = role;
        this.bio = bio;
        this.profilePicture = profilePicture;
        this.trainerUsername = trainerUsername;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long long1) {
        this.id = long1;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role2) {
        this.role = role2;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public String getTrainerUsername() {
        return trainerUsername;
    }

    public void setTrainerUsername(String trainerUsername) {
        this.trainerUsername = trainerUsername;
    }

    // toString method
    @Override
    public String toString() {
        return "UserProfile{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", password='" + password + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", role='" + role + '\'' +
                ", bio='" + bio + '\'' +
                ", profilePicture='" + profilePicture + '\'' +
                ", trainerUsername='" + trainerUsername + '\'' +
                '}';
    }
}
