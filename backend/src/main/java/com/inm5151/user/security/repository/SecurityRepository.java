package com.inm5151.user.security.repository;

import org.springframework.data.jpa.repository.JpaRepository; 

import com.inm5151.user.security.model.*;

public interface SecurityRepository extends JpaRepository <Security, Long> {
    Security findById(long id);
} 
