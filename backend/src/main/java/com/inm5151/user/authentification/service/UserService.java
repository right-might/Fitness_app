package com.inm5151.user.authentification.service;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.inm5151.user.Role;
import com.inm5151.user.authentification.model.UserAccount;
import com.inm5151.user.authentification.model.UserProfile;
import com.inm5151.user.authentification.repository.UserRepository;
import com.inm5151.user.client.model.ClientAccount;
import com.inm5151.user.client.service.ClientService;
import com.inm5151.user.security.model.ResetPassword;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Optional;

import com.inm5151.user.trainer.model.TrainerAccount;
import com.inm5151.user.trainer.repository.TrainerRepository;
import com.inm5151.user.trainer.service.TrainerService;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TrainerRepository trainerRepository;
    @Autowired
    private TrainerService trainerService;
    @Autowired
    private ClientService clientService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserAccount createUser(UserAccount user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new RuntimeException("Nom d'utilisateur déjà pris.");
        }

        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("Adresse courriel déjà utilisée.");
        }

        if (!isValidEmailFormat(user.getEmail())) {
            throw new RuntimeException("L'adresse courriel n'a pas le bon format.");
        }

        if (!isAgeValid(user.getDateOfBirth())) {
            throw new RuntimeException("L'utilisateur doit être âgé d'au moins 18 ans.");
        }

        // Crypter le mot de passe avant de l'enregistrer dans la base de données
        // user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.USER);

        return userRepository.save(user);
    }

    // Vérifier si l'utilisateur a au moins 18 ans
    public boolean isAgeValid(LocalDate birthDate) {
        return Period.between(birthDate, LocalDate.now()).getYears() >= 18;
    }

    public UserAccount authenticateUser(String usernameOrEmail, String password) {
        UserAccount user = userRepository.findByUsername(usernameOrEmail);
        if (user == null) {
            user = userRepository.findByEmail(usernameOrEmail);
        }

        if (user != null) {
            return user;
        } else {
            return null;
        }
    }

    public void deleteUserById(Long userId) {
        UserAccount existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        userRepository.delete(existingUser);
    }

    public TrainerAccount becomeTrainer(String username) {
        UserAccount existingUser = userRepository.findByUsername(username);
        if (existingUser == null) {
            throw new RuntimeException("Utilisateur non trouvé avec le nom d'utilisateur: " + username);
        }
        userRepository.save(existingUser);

        TrainerAccount newTrainerAccount = trainerService.createTrainer(existingUser);

        trainerRepository.save(newTrainerAccount);
        return newTrainerAccount;
    }

    public boolean isValidEmailFormat(String email) {
        String regex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}$";
        return email.matches(regex);
    }

    public UserAccount getUser(String username) {
        UserAccount foundUser = userRepository.findByUsername(username);
        if (foundUser != null) {
            return foundUser;
        }
        return null;
    }

    public UserProfile getUser(long id) {
        UserAccount foundUser = userRepository.findById(id);
        UserProfile userProfile = new UserProfile();

        userProfile.setFirstName(foundUser.getFirstName());
        userProfile.setLastName(foundUser.getLastName());
        userProfile.setUsername(foundUser.getUsername());
        userProfile.setEmail(foundUser.getEmail());
        userProfile.setProfilePicture(foundUser.getProfilePicture());
        userProfile.setRole(foundUser.getRole());
        userProfile.setId(foundUser.getId());

        userProfile.setUsername(foundUser.getUsername());

        if (foundUser != null) {
            if (foundUser.getRole() == Role.CLIENT) {
                String trainerUsername = clientService.getTrainerUsername(foundUser.getId());
                userProfile.setTrainerUsername(trainerUsername);
            }
            return userProfile;
        }
        return null;

    }

    // Modifier cette fonction pour sortir les entraineurs qui ont le status
    // "confirme"
    public List<UserAccount> getAllTrainers() {
        List<UserAccount> allUsers = userRepository.findAll();
        return allUsers.stream()
                .filter(user -> user.getRole() == Role.TRAINER)
                .collect(Collectors.toList());
    }

    public UserAccount updateUser(UserAccount updatedUser) {
        // Vérifier si l'utilisateur existe dans la base de données
        @SuppressWarnings("null")
        UserAccount existingUser = userRepository.findById(updatedUser.getId())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        System.out.println(updatedUser.getId());
        // Mettre à jour les informations de l'utilisateur
        existingUser.setUsername(updatedUser.getUsername());
        System.out.println(updatedUser.getEmail());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setFirstName(updatedUser.getFirstName());
        existingUser.setLastName(updatedUser.getLastName());

        // Enregistrer les modifications dans la base de données
        return userRepository.save(existingUser);
    }

    public UserAccount updatePassword(String email, String newPassword) {
        UserAccount existingUser = userRepository.findByEmail(email);
        existingUser.setPassword(passwordEncoder.encode(newPassword));
        return userRepository.save(existingUser);
    }

    public ClientAccount joinTrainer(long userId, long trainerId) {
        UserAccount user = userRepository.findById(userId);

        TrainerAccount trainer = trainerRepository.findById(trainerId);

        if (user != null && trainer != null) {

            return clientService.devenirClient(user, trainer);

        }
        return null;

    }


    public UserProfile getUserInfoForAdmin(String username) {
     
        UserAccount foundUser = userRepository.findByUsername(username);

        if (foundUser != null) {
            UserProfile userProfile = new UserProfile();

            userProfile.setId(foundUser.getId());
            userProfile.setFirstName(foundUser.getFirstName());
            userProfile.setLastName(foundUser.getLastName());
            userProfile.setUsername(foundUser.getUsername());
            userProfile.setEmail(foundUser.getEmail());
            userProfile.setProfilePicture(foundUser.getProfilePicture());
            userProfile.setRole(foundUser.getRole());
        
            if (foundUser != null) {
                if (foundUser.getRole() == Role.CLIENT) {
                    String trainerUsername = clientService.getTrainerUsername(foundUser.getId());
                    userProfile.setTrainerUsername(trainerUsername);
                }
                return userProfile;
            }

            
        }
        
     
        return null;
    }

    public UserProfile getUserPublicInfo(String username) {
      
        UserAccount foundUser = userRepository.findByUsername(username);

        if (foundUser != null) {
        
            UserProfile userProfile = new UserProfile();

          
            userProfile.setId(foundUser.getId());
            userProfile.setFirstName(foundUser.getFirstName());
            userProfile.setLastName(foundUser.getLastName());
            userProfile.setUsername(foundUser.getUsername());
            userProfile.setProfilePicture(foundUser.getProfilePicture());
            
            return userProfile;
        }
        
      
        return null;
    }

}
