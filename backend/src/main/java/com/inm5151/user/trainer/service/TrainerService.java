package com.inm5151.user.trainer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inm5151.user.trainer.repository.*;
import com.inm5151.user.TrainerStatus;
import com.inm5151.user.authentification.model.UserAccount;
import com.inm5151.user.authentification.repository.UserRepository;
import com.inm5151.user.trainer.model.*;
import com.inm5151.user.Role;

@Service
public class TrainerService {

    private final TrainerRepository trainerRepository;
    private final UserRepository userRepository;

    @Autowired
    public TrainerService(TrainerRepository trainerRepository, UserRepository userRepository) {
        this.trainerRepository = trainerRepository;
        this.userRepository = userRepository;
    }

    //Code qui sert a mettre a jour le status d'un entraineur a CONFIRME
    public TrainerAccount updateStatusConfirmed(TrainerAccount trainer) {
        if (trainer.getStatus() != TrainerStatus.RETIRE) {
            trainer.setStatus(TrainerStatus.CONFIRME);

            UserAccount user = trainer.getAccount();
            user.setRole(Role.TRAINER);
            userRepository.save(user);

            trainerRepository.save(trainer);
            return trainer;
        } else {
            return null;
        }
    }

    //Code qui sert a mettre a jour le status d'un entraineur a retire
    public TrainerAccount updateStatusRevoked(TrainerAccount trainer) {
        trainer.setStatus(TrainerStatus.RETIRE);
        return trainer;
    }

    // Code qui sert a creer une instance d'entraineur
    public TrainerAccount createTrainer(UserAccount user) {
        TrainerAccount trainer = new TrainerAccount();
        trainer.setAccount(user);
        trainer.setStatus(TrainerStatus.EN_DEMANDE);
        return trainer;
    }

    //Code pour recuperer tous les clients (sprint 3)

    // Code pour consulter un client (sprint 3)
}
