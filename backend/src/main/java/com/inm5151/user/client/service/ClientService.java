package com.inm5151.user.client.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inm5151.user.Role;
import com.inm5151.user.authentification.model.UserAccount;
import com.inm5151.user.authentification.repository.UserRepository;
import com.inm5151.user.client.model.ClientAccount;
import com.inm5151.user.client.repository.ClientRepository;
import com.inm5151.user.trainer.model.TrainerAccount;

@Service
public class ClientService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ClientRepository clientRepository;

    // Code qui sert a change le role d'un utilisateur a CLIENT quand il est jumele
    // a un entraineur
    public ClientAccount devenirClient(UserAccount user, TrainerAccount trainer) {

        user.setRole(Role.CLIENT);
        userRepository.save(user);
        long user_id = user.getId();
        long trainer_id = trainer.getId();

        UserAccount userTrainer = userRepository.findById(trainer.getUserId());
        String trainerUsername = userTrainer.getUsername();

        ClientAccount client = new ClientAccount(user_id, trainer_id, trainerUsername);

        clientRepository.save(client);

        return client;

    }

    public String getTrainerUsername(long clientId) {
        
        ClientAccount client = clientRepository.findById(clientId);
        if (client != null) {
            return client.getTrainer_username();
        }
        return null;
    }

}
