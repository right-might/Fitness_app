package com.inm5151.user.authentification.repository; 

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.repository.query.QueryByExampleExecutor;

import com.inm5151.user.authentification.model.UserAccount; 

/*
 * Cette classe est responsable de la persistance des donnees
 * Autrement dit cette classe communique avec la base de donnees 
 * pour aller chercher et envoyer des donnees
 *
 */
public interface UserRepository extends JpaRepository<UserAccount, Long> {
    UserAccount findByUsername(String username);
    UserAccount findByEmail(String email);  
    UserAccount findById(long id);
}
