package com.inm5151.user.administration.service; 

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inm5151.user.Role;
import com.inm5151.user.TrainerStatus;
import com.inm5151.user.administration.model.*;
import com.inm5151.user.administration.repository.*;
import com.inm5151.user.authentification.model.UserAccount;
import com.inm5151.user.authentification.repository.UserRepository;
import com.inm5151.user.message.model.Message;
import com.inm5151.user.message.repository.MessageRepository;
import com.inm5151.user.trainer.model.TrainerAccount; 
import com.inm5151.user.trainer.service.*;
import com.inm5151.user.trainer.repository.TrainerRepository; 

@Service
public class AdminService { 

    @Autowired
    private AdminRepository adminRepository;  

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TrainerRepository trainerRepository;  

    @Autowired 
    private MessageRepository messageRepository;
    
    @Autowired
    private TrainerService trainerService;

    //Code pour s'authentifier 
    public AdminAccount authenticateAdmin(long admin_id, long mot_de_passe) {
        AdminAccount adminAccount = adminRepository.findById(admin_id);
        if (adminAccount != null) {
            if (adminAccount.getPassword() == mot_de_passe) {
                return adminAccount;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }


    
    //Code pour recuperer tous les utilisateurs/clients 
    //Code pour recuperer tous les utilisateurs/clients 
public List<UserAccount> getAllUsersAndClients() {
    List<UserAccount> allUsers = userRepository.findAll();
    
    List<UserAccount> clients = allUsers.stream()
            .filter(user -> user.getRole() == Role.CLIENT)
            .collect(Collectors.toList());

    List<UserAccount> users = allUsers.stream()
            .filter(user -> user.getRole() == Role.USER)
            .collect(Collectors.toList());

    // Fusionner les listes des utilisateurs et des clients
    List<UserAccount> allUsersAndClients = new ArrayList<>();
    allUsersAndClients.addAll(users);
    allUsersAndClients.addAll(clients);

    return allUsersAndClients;
} 



    //Code pour recuperer tous les entraineurs en demande 
    //Code pour recuperer tous les entraineurs en demande 
    public List<TrainerAccount> getAllTrainersWithStatusEnAttente() {
        List<TrainerAccount> allConfirmedTrainers = trainerRepository.findAll(); 
        return allConfirmedTrainers.stream()
        .filter(trainer -> trainer.getStatus() == TrainerStatus.EN_DEMANDE)
            .collect(Collectors.toList());
}


    //Code pour recuperer tous les entraineurs confirmes 
    public List<TrainerAccount> getAllTrainersWithStatusConfirme() { 
        List<TrainerAccount> allConfirmedTrainers = trainerRepository.findAll(); 
        return allConfirmedTrainers.stream()
        .filter(trainer -> trainer.getStatus() == TrainerStatus.CONFIRME)
            .collect(Collectors.toList());
    }  

    //Code pour recuperer tous les entraineurs avec le status retire 
    public List<TrainerAccount> getAllTrainersWithStatusRetire(){
        List<TrainerAccount> allConfirmedTrainers = trainerRepository.findAll(); 
        return allConfirmedTrainers.stream()
        .filter(trainer -> trainer.getStatus() == TrainerStatus.RETIRE)
            .collect(Collectors.toList());
    }

    //Code pour recuperer tous les messages (semaine du 25 mars)  
    public List< Message > getAllMessagesOrderByDateAndTimeDesc() {
        List<Message> allMessages = messageRepository.findAll();

        // Trier les messages en utilisant un comparateur personnalisé
        List<Message> sortedMessages = allMessages.stream()
                .sorted(Comparator.comparing(Message::getDate).reversed()
                        .thenComparing(Message::getHeure).reversed())
                .collect(Collectors.toList());

        return sortedMessages;
    }

    
    //Code pour confirmer les demandes d'entraineurs  
    public TrainerAccount confirmerDemandeEntraineur(long id){
        TrainerAccount trainerAccount = trainerRepository.findById(id); 
        
        if(trainerAccount != null){ 
            trainerService.updateStatusConfirmed(trainerAccount);
            return trainerAccount;
        } 
        return null;
    }   


    //Code pour mettre a jour le role d'un utilisateur a TRAINER 
    public UserAccount changerRoleEntraineur(long id){
        UserAccount user_trainer = userRepository.findById(id);
        user_trainer.setRole(Role.TRAINER);  
        return user_trainer;
    }



    //Code pour retirer le titre d'entraineur 
    public TrainerAccount retirerStatusEntrainer(long id){
        TrainerAccount trainerAccount = trainerRepository.findById(id); 
        if(trainerAccount != null){
            trainerService.updateStatusRevoked(trainerAccount); 
            return trainerAccount;
        } 
        return null;
    }
    

}
