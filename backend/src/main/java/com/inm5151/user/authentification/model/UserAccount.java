package com.inm5151.user.authentification.model;

import com.inm5151.user.Role;
import javax.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "User")
public class UserAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @Column(name = "user_id")
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(unique = true)
    private String username;

    @Column(unique = true)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "profile_picture")
    private String profilePicture;
    @Column(name = "date_of_birth") 
    private LocalDate dateOfBirth;





    
    // Constructeur vide
    public UserAccount() {
    }

    // Constructeur avec arguments
    public UserAccount(Long id, 
    String firstName, String lastName, String username,
     String email, String password, Role role, String profilePicture,LocalDate dateOfBirth)  {

        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role; 
        this.profilePicture = profilePicture;
        this.dateOfBirth = dateOfBirth;


    }


    // Getters et setters
    public Long getId() {
        return id;
    }

    public void setId(Long userId) {
    
        this.id = userId;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    } 

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public void updateUser(UserAccount updatedUser) {
        this.firstName = updatedUser.getFirstName();
        this.lastName = updatedUser.getLastName();
        this.password = updatedUser.getPassword();
        this.role = updatedUser.getRole();
        this.profilePicture = updatedUser.getProfilePicture();
    }
    public LocalDate getDateOfBirth() {
        return dateOfBirth;


    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;



    }




    
}
