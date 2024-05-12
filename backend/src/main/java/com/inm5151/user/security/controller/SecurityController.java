package com.inm5151.user.security.controller; 
import com.inm5151.user.authentification.service.UserService;
import com.inm5151.user.security.model.*;
import com.inm5151.user.security.service.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;  

@RestController 
@RequestMapping("/security")
public class SecurityController { 

    @Autowired 
    private SecurityService securityService; 
 

    @Autowired 
    private UserService userService;

    

    /*
     * Apres avoir cree le compte, il faut aller recuperer le user_id pour enregistrer les 
     * reponses des questions de securite. Cette methode sert a chercher le user_id a partir 
     * d'un adresse courriel
     */ 
    @PostMapping("/security_questions") 
    public ResponseEntity<Long> recupererUserId(@RequestBody String email){  
        return ResponseEntity.ok().body(securityService.recupererUserId(email));
    } 

  
    /*
     * Quand le user_id est recupere, on peut maintenant enregistrer les reponses aux questions de securite 
     * dans la base de donnee 
     */ 
    @PostMapping("/register_answers")
    public ResponseEntity<?> enregistrerReponsesSecurite(@RequestBody Security security){   
        System.out.println("BONJOUR :)");
        System.out.println("id: " + security.getId());
        System.out.println("reponse1: " + security.getReponse1()); 
        System.out.println("reponse2: " + security.getReponse2());
        System.out.println("reponse3: " + security.getReponse3());
        Security newSecurity = securityService.enregistrerQuestionsSecurite(security.getId(), security.getReponse1(), 
            security.getReponse2(), security.getReponse3());  
        System.out.println("new security: " + newSecurity);
        return ResponseEntity.ok().body(newSecurity);
    }      


    /*
     * Quand un utilisateur veut reinitaliser son mot de passe, il entre son adresse courriel
     * et la reponse a la question de securite. On doit verifier si l'utilisateur a mis la 
     * bonne reponse
     */ 
    @PostMapping("/validate_security_answer")
    public ResponseEntity<?> estValideReponseSecurite(@RequestBody SecurityRequest securityRequest){ 
         boolean estValide = securityService.estValideReponseSecurite(securityRequest);
         if(estValide){  
            return ResponseEntity.ok().body(estValide);
         }else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
         }
    }   
 
 
     
}
 