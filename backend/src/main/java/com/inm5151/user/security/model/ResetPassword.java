package com.inm5151.user.security.model;

public class ResetPassword {
    private String email; 

    private String newPassword;


    public ResetPassword(){}


    public ResetPassword(String email, String newPassword){
        this.email = email;
        this.newPassword = newPassword;
    } 

    // Getter et Setter pour user_id
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Getter et Setter pour newPassword
    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
