package com.inm5151.user.administration.repository;  

import org.springframework.data.jpa.repository.JpaRepository;

import com.inm5151.user.administration.model.AdminAccount;

public interface AdminRepository extends JpaRepository<AdminAccount, Long> { 
    AdminAccount findById(long id);
    AdminAccount findByPassword(long password);
}

