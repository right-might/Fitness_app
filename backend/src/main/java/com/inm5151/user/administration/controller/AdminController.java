package com.inm5151.user.administration.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inm5151.user.administration.model.AdminAccount;
import com.inm5151.user.administration.model.AdminLoginRequest;
import com.inm5151.user.administration.service.AdminService;
import com.inm5151.user.authentification.model.UserAccount;
import com.inm5151.user.trainer.model.TrainerAccount;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.inm5151.user.message.model.Message;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticateAdmin(@RequestBody AdminLoginRequest adminCredentials) {
        AdminAccount adminFound = adminService.authenticateAdmin(adminCredentials.getId(),
                adminCredentials.getPassword());
        if (adminFound != null) {
            return ResponseEntity.ok().body(adminFound.getId());

        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Échec de l'authentification");

        }
    }

    @GetMapping("/usersAndClients")
    public List<UserAccount> getAllUsersAndClients() {
        return adminService.getAllUsersAndClients();
    }

    @GetMapping("/trainers/enattente")
    public List<TrainerAccount> getAllTrainersWithStatusEnAttente() {
        return adminService.getAllTrainersWithStatusEnAttente();
    }

    @GetMapping("/trainers/confirme")
    public List<TrainerAccount> getAllTrainersWithStatusConfirme() {
        return adminService.getAllTrainersWithStatusConfirme();
    }

    @GetMapping("/trainers/confirmDemande/{id}")
    public TrainerAccount confirmerDemandeEntraineur(@PathVariable("id") long id) {
        return adminService.confirmerDemandeEntraineur(id);
    }

    @GetMapping("/trainers/retirerStatus/{id}")
    public TrainerAccount retirerStatusEntrainer(long id) {
        return adminService.retirerStatusEntrainer(id);
    }

    @GetMapping("/messages")
    public List<Message> getAdminMessages() {
        return adminService.getAllMessagesOrderByDateAndTimeDesc();

    }
}
