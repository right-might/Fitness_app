package com.inm5151.user.administration.model;


public class AdminLoginRequest {
    private Long id;
    private Long password;

    public AdminLoginRequest() {
    }

    public AdminLoginRequest(Long id, Long password) {
        this.id = id;
        this.password = password;
    }


    public Long getId() {
        return this.id;
    }

    public void setUsername(Long id) {
        this.id = id;
    }

    public Long getPassword() {
        return password;
    }

    public void setPassword(Long password) {
        this.password = password;
    }
}

