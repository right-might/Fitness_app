package com.inm5151.user.security.service; 


import com.inm5151.user.security.model.ResetPassword;
import com.inm5151.user.security.model.Security;
import com.inm5151.user.security.model.SecurityRequest;
import com.inm5151.user.security.repository.SecurityRepository;
import com.inm5151.user.authentification.model.UserAccount; 
import com.inm5151.user.authentification.service.*;
import com.inm5151.user.authentification.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
 
@Service
public class SecurityService {
    
    @Autowired
    private SecurityRepository securityRepository;  
    
    @Autowired UserRepository userRepository;


    //Methode qui sert a recuperer les reponses de securite a partir d'un adresse courriel 
    public Security recupererSecurity(String email){ 
        UserAccount user  = userRepository.findByEmail(email); 
        if(user != null){
            long id = user.getId(); 
            Security security = securityRepository.findById(id); 
            if(security != null){
                return security;
            } 
        }
        return null;
    }  

    //Methode qui recupere un user_id a partir d'un courriel 
    public long recupererUserId(String email){
        UserAccount user = userRepository.findByEmail(email);
        if(user != null){
            return user.getId();
        } 
        return 0;
    }

    

 
    //Methode qui sert a enregistrer les questions de securite 
    public Security enregistrerQuestionsSecurite(long id, String reponse1, String reponse2, String reponse3){  
        Security newSecurity = new Security(id, reponse1, reponse2,reponse3);  

        return securityRepository.save(newSecurity);
    } 
 
 
    //Methode qui sert a recuperer la reponse de securite qui est dans la base de donnee pour l'utilisateur
    public String recupererQuestionSecuritePresente(SecurityRequest securityRequest, Security security){ 
        if(securityRequest.getNo_question() == 1){
            return security.getReponse1();
        }else if(securityRequest.getNo_question() == 2){
            return security.getReponse2();
        }else if(securityRequest.getNo_question() == 3){
            return security.getReponse3();
        }else{
            return "";
        }
        
    } 


    //Methode qui sert verifier si un individu a bien repondu a la question de securite 
    public boolean estValideReponseSecurite(SecurityRequest securityRequest){ 
        Security security = recupererSecurity(securityRequest.getEmail()); 
        String reponse = recupererQuestionSecuritePresente(securityRequest, security);  
        if(reponse.equals(securityRequest.getReponse())){ 
            return true;
        }else{
            return false;
        }
    } 

     


    


    


}
 