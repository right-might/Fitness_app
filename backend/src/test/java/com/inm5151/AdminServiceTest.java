package com.inm5151; 

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.inm5151.user.Role;
import com.inm5151.user.TrainerStatus;
import com.inm5151.user.administration.model.AdminAccount;
import com.inm5151.user.authentification.model.UserAccount;
import com.inm5151.user.message.model.Message;
import com.inm5151.user.trainer.model.TrainerAccount;
import com.inm5151.user.trainer.service.TrainerService;
import com.inm5151.user.administration.repository.AdminRepository;
import com.inm5151.user.administration.service.AdminService;
import com.inm5151.user.authentification.repository.UserRepository;
import com.inm5151.user.message.repository.MessageRepository;
import com.inm5151.user.trainer.repository.TrainerRepository;

public class AdminServiceTest {

    @Mock
    private AdminRepository adminRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private TrainerRepository trainerRepository;

    @Mock
    private MessageRepository messageRepository;

    @Mock
    private TrainerService trainerService;

    @InjectMocks
    private AdminService adminService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @SuppressWarnings("deprecation")
    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }
    
    @Test
    public void testAuthenticateAdmin_SuccessfulAuthentication() {
        long adminId = 1;
        long password = 123456;
        AdminAccount adminAccount = new AdminAccount();
        adminAccount.setId(adminId);
        adminAccount.setPassword(password);
        when(adminRepository.findById(adminId)).thenReturn(adminAccount);

        AdminAccount authenticatedAdmin = adminService.authenticateAdmin(adminId, password);

        assertNotNull(authenticatedAdmin);
        assertEquals(adminId, authenticatedAdmin.getId());
    }

    @Test
    public void testAuthenticateAdmin_IncorrectPassword() {
        long adminId = 1;
        long correctPassword = 123456;
        long incorrectPassword = 654321; 
        AdminAccount adminAccount = new AdminAccount();
        adminAccount.setId(adminId);
        adminAccount.setPassword(correctPassword);
        when(adminRepository.findById(adminId)).thenReturn(adminAccount);

        AdminAccount authenticatedAdmin = adminService.authenticateAdmin(adminId, incorrectPassword);

        assertNull(authenticatedAdmin);
    }

    @Test
    public void testAuthenticateAdmin_AdminNotFound() {
        long nonExistentAdminId = 999;
        when(adminRepository.findById(nonExistentAdminId)).thenReturn(null);

        AdminAccount authenticatedAdmin = adminService.authenticateAdmin(nonExistentAdminId, 123456);

        assertNull(authenticatedAdmin);
    }

    @Test
    public void testGetAllUsersAndClients() {
        UserAccount user1 = new UserAccount();
        user1.setId((long) 1);
        user1.setRole(Role.USER);

        UserAccount user2 = new UserAccount();
        user2.setId((long) 2);
        user2.setRole(Role.CLIENT);

        List<UserAccount> allUsers = Arrays.asList(user1, user2);

        // Mocking userRepository.findAll() to return the prepared list
        when(userRepository.findAll()).thenReturn(allUsers);

        List<UserAccount> result = adminService.getAllUsersAndClients();

        assertNotNull(result);
        assertEquals(2, result.size());
        assertTrue(result.contains(user1));
        assertTrue(result.contains(user2));
    }

    @Test
    public void testGetAllUsersAndClients_NoUsers() {
        List<UserAccount> allUsers = Arrays.asList();

        when(userRepository.findAll()).thenReturn(allUsers);

        List<UserAccount> result = adminService.getAllUsersAndClients();

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    public void testGetAllTrainersWithStatusEnAttente() {
        TrainerAccount trainer1 = new TrainerAccount();
        trainer1.setAccount(new UserAccount());
        trainer1.setId(1);
        trainer1.setStatus(TrainerStatus.EN_DEMANDE);

        TrainerAccount trainer2 = new TrainerAccount();
        trainer2.setAccount(new UserAccount());
        trainer2.setId(2);
        trainer2.setStatus(TrainerStatus.CONFIRME);

        TrainerAccount trainer3 = new TrainerAccount();
        trainer3.setAccount(new UserAccount());
        trainer3.setId(3);
        trainer3.setStatus(TrainerStatus.EN_DEMANDE);

        List<TrainerAccount> allTrainers = Arrays.asList(trainer1, trainer2, trainer3);

        when(trainerRepository.findAll()).thenReturn(allTrainers);

        List<TrainerAccount> result = adminService.getAllTrainersWithStatusEnAttente();

        assertNotNull(result);
        assertEquals(2, result.size());
        assertTrue(result.contains(trainer1));
        assertTrue(result.contains(trainer3));
        assertFalse(result.contains(trainer2)); 
    }

    @Test
    public void testGetAllTrainersWithStatusEnAttente_NoTrainers() {
        List<TrainerAccount> allTrainers = Arrays.asList();

        when(trainerRepository.findAll()).thenReturn(allTrainers);

        List<TrainerAccount> result = adminService.getAllTrainersWithStatusEnAttente();

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    public void testGetAllTrainersWithStatusConfirme() {
        TrainerAccount trainer1 = new TrainerAccount();
        trainer1.setAccount(new UserAccount());
        trainer1.setId(1);
        trainer1.setStatus(TrainerStatus.CONFIRME);

        TrainerAccount trainer2 = new TrainerAccount();
        trainer2.setAccount(new UserAccount());
        trainer2.setId(2);
        trainer2.setStatus(TrainerStatus.EN_DEMANDE);

        TrainerAccount trainer3 = new TrainerAccount();
        trainer3.setAccount(new UserAccount());
        trainer3.setId(3);
        trainer3.setStatus(TrainerStatus.CONFIRME);

        List<TrainerAccount> allTrainers = Arrays.asList(trainer1, trainer2, trainer3);

        when(trainerRepository.findAll()).thenReturn(allTrainers);

        List<TrainerAccount> result = adminService.getAllTrainersWithStatusConfirme();

        assertNotNull(result);
        assertEquals(2, result.size());
        assertTrue(result.contains(trainer1));
        assertTrue(result.contains(trainer3));
        assertFalse(result.contains(trainer2));
    }

    @Test
    public void testGetAllTrainersWithStatusConfirme_NoTrainers() {
        List<TrainerAccount> allTrainers = Arrays.asList();

        when(trainerRepository.findAll()).thenReturn(allTrainers);

        List<TrainerAccount> result = adminService.getAllTrainersWithStatusConfirme();

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    public void testGetAllTrainersWithStatusRetire() {
        TrainerAccount trainer1 = new TrainerAccount();
        trainer1.setAccount(new UserAccount());
        trainer1.setId(1);
        trainer1.setStatus(TrainerStatus.RETIRE);

        TrainerAccount trainer2 = new TrainerAccount();
        trainer2.setAccount(new UserAccount());
        trainer2.setId(2);
        trainer2.setStatus(TrainerStatus.EN_DEMANDE);

        TrainerAccount trainer3 = new TrainerAccount();
        trainer3.setAccount(new UserAccount());
        trainer3.setId(3);
        trainer3.setStatus(TrainerStatus.RETIRE);

        List<TrainerAccount> allTrainers = Arrays.asList(trainer1, trainer2, trainer3);

        when(trainerRepository.findAll()).thenReturn(allTrainers);

        List<TrainerAccount> result = adminService.getAllTrainersWithStatusRetire();

        assertNotNull(result);
        assertEquals(2, result.size());
        assertTrue(result.contains(trainer1));
        assertTrue(result.contains(trainer3));
        assertFalse(result.contains(trainer2)); 
    }

    @Test
    public void testGetAllTrainersWithStatusRetire_NoTrainers() {
        List<TrainerAccount> allTrainers = Arrays.asList();

        when(trainerRepository.findAll()).thenReturn(allTrainers);

        List<TrainerAccount> result = adminService.getAllTrainersWithStatusRetire();

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    public void testGetAllMessagesOrderByDateAndTimeDesc() {
        // Création de quelques messages pour simuler des données de la base de données
        Message message1 = new Message();
        message1.setContenu("Contenu du message 1");
        message1.setDate(LocalDate.parse("2024-03-25"));
        message1.setHeure(LocalTime.parse("10:00"));

        Message message2 = new Message();
        message2.setContenu("Contenu du message 2");
        message2.setDate(LocalDate.parse("2024-03-25"));
        message2.setHeure(LocalTime.parse("12:00"));

        Message message3 = new Message();
        message3.setContenu("Contenu du message 3");
        message3.setDate(LocalDate.parse("2024-03-25"));
        message3.setHeure(LocalTime.parse("15:00"));

        List<Message> messages = new ArrayList<>();
        messages.add(message1);
        messages.add(message2);
        messages.add(message3);

        // Simuler le comportement du repository pour retourner les messages créés
        when(messageRepository.findAll()).thenReturn(messages);

        List<Message> sortedMessages = adminService.getAllMessagesOrderByDateAndTimeDesc();

        // Vérifier que les messages sont triés par date et heure décroissantes
        assertEquals("Contenu du message 3", sortedMessages.get(0).getContenu());
        assertEquals("Contenu du message 2", sortedMessages.get(1).getContenu());
        assertEquals("Contenu du message 1", sortedMessages.get(2).getContenu());

        // Vérifier que le repository a été appelé une fois pour récupérer les messages
        verify(messageRepository, times(1)).findAll();
    }

    @Test
    public void testConfirmerDemandeEntraineur_WhenTrainerFound_ShouldReturnConfirmedTrainer() {
        long trainerId = 123;
        TrainerAccount trainerAccount = new TrainerAccount();
        when(trainerRepository.findById(trainerId)).thenReturn(trainerAccount);

        TrainerAccount confirmedTrainer = adminService.confirmerDemandeEntraineur(trainerId);

        assertNotNull(confirmedTrainer);
        assertEquals(trainerAccount, confirmedTrainer);
        verify(trainerService, times(1)).updateStatusConfirmed(trainerAccount);
    }

    @Test
    public void testConfirmerDemandeEntraineur_WhenTrainerNotFound_ShouldReturnNull() {
        long trainerId = 123;
        when(trainerRepository.findById(trainerId)).thenReturn(null);

        TrainerAccount confirmedTrainer = adminService.confirmerDemandeEntraineur(trainerId);

        assertNull(confirmedTrainer);
        verify(trainerService, never()).updateStatusConfirmed(any());
    }

    @Test
    public void testChangerRoleEntraineur() {
        long userId = 123;
        UserAccount userAccount = new UserAccount();
        when(userRepository.findById(userId)).thenReturn(userAccount);

        UserAccount updatedUser = adminService.changerRoleEntraineur(userId);

        assertNotNull(updatedUser);
        assertEquals(Role.TRAINER, updatedUser.getRole());
        verify(userRepository, times(1)).findById(userId);
    }

    @Test
    public void testRetirerStatusEntraineur_WhenTrainerFound() {
        long trainerId = 123;
        TrainerAccount trainerAccount = new TrainerAccount();
        when(trainerRepository.findById(trainerId)).thenReturn(trainerAccount);

        TrainerAccount revokedTrainer = adminService.retirerStatusEntrainer(trainerId);

        assertNotNull(revokedTrainer);
        assertEquals(trainerAccount, revokedTrainer);
        verify(trainerService, times(1)).updateStatusRevoked(trainerAccount);
    }

    @Test
    public void testRetirerStatusEntraineur_WhenTrainerNotFound() {
        long trainerId = 123;
        when(trainerRepository.findById(trainerId)).thenReturn(null);

        TrainerAccount revokedTrainer = adminService.retirerStatusEntrainer(trainerId);

        assertNull(revokedTrainer);
        verify(trainerService, never()).updateStatusRevoked(any());
    }

    
}
