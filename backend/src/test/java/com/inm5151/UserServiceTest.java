package com.inm5151;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.inm5151.user.authentification.model.UserAccount;
import com.inm5151.user.authentification.repository.UserRepository;
import com.inm5151.user.authentification.service.UserService;
import java.time.LocalDate;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @Test
    public void testCreateUser() {

        UserAccount user = new UserAccount();
        user.setUsername("testuser");
        user.setEmail("testuser@example.com");
        user.setPassword("testpassword");
        user.setDateOfBirth(LocalDate.of(1990, 1, 1));

        when(userRepository.findByUsername("testuser")).thenReturn(null);
        when(userRepository.findByEmail("testuser@example.com")).thenReturn(null);
        // when(passwordEncoder.encode("testpassword")).thenReturn("encodedpassword");
        when(userRepository.save(user)).thenReturn(user);

        UserAccount createdUser = userService.createUser(user);

        assertNotNull(createdUser);
        assertEquals("testuser", createdUser.getUsername());
        assertEquals("testuser@example.com", createdUser.getEmail());
        // assertEquals("encodedpassword", createdUser.getPassword());
        assertEquals(LocalDate.of(1990, 1, 1), createdUser.getDateOfBirth());

        verify(userRepository, times(1)).findByUsername("testuser");
        verify(userRepository, times(1)).findByEmail("testuser@example.com");
        // verify(passwordEncoder, times(1)).encode("testpassword");
        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void testCreateUser_UsernameTaken() {

        UserAccount user = new UserAccount();
        user.setUsername("existinguser");

        when(userRepository.findByUsername("existinguser")).thenReturn(new UserAccount());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> userService.createUser(user));
        assertEquals("Nom d'utilisateur déjà pris." + //
                "", exception.getMessage());

        verify(userRepository, times(1)).findByUsername("existinguser");
        verify(userRepository, times(0)).findByEmail(any());
        // verify(passwordEncoder, times(0)).encode(any());
        verify(userRepository, times(0)).save(any());
    }

    @Test
    public void testCreateUser_EmailTaken() {

        UserAccount user = new UserAccount();
        user.setEmail("existinguser@example.com");

        when(userRepository.findByUsername(any())).thenReturn(null);
        when(userRepository.findByEmail("existinguser@example.com")).thenReturn(new UserAccount());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> userService.createUser(user));
        assertEquals("Adresse courriel déjà utilisée.", exception.getMessage());

        verify(userRepository, times(1)).findByUsername(any());
        verify(userRepository, times(1)).findByEmail("existinguser@example.com");
        // verify(passwordEncoder, times(0)).encode(any());
        verify(userRepository, times(0)).save(any());
    }

    @Test
    public void testAuthenticateUser_ValidCredentials() {

        String usernameOrEmail = "existinguser";
        String password = "testpassword";
        UserAccount user = new UserAccount();
        user.setUsername(usernameOrEmail);
        user.setEmail("existinguser@example.com");
        user.setPassword(passwordEncoder.encode(password));

        when(userRepository.findByUsername(usernameOrEmail)).thenReturn(user);
        // when(passwordEncoder.matches(password, user.getPassword())).thenReturn(true);

        UserAccount authenticatedUser = userService.authenticateUser(usernameOrEmail, password);

        assertNotNull(authenticatedUser);
        assertEquals(usernameOrEmail, authenticatedUser.getUsername());

        verify(userRepository, times(1)).findByUsername(usernameOrEmail);
        verify(userRepository, times(0)).findByEmail(any());
        // verify(passwordEncoder, times(1)).matches(password, user.getPassword());
    }

    @Test
    public void testAuthenticateUser_InvalidCredentials() {

        String usernameOrEmail = "nonexistentuser";
        String password = "testpassword";

        when(userRepository.findByUsername(usernameOrEmail)).thenReturn(null);
        when(userRepository.findByEmail(usernameOrEmail)).thenReturn(null);

        UserAccount authenticatedUser = userService.authenticateUser(usernameOrEmail, password);

        assertNull(authenticatedUser);

        verify(userRepository, times(1)).findByUsername(usernameOrEmail);
        verify(userRepository, times(1)).findByEmail(usernameOrEmail);
        // verify(passwordEncoder, times(0)).matches(any(), any());
    }

   // @Test
    //public void testAuthenticateUser_InvalidPassword() {

        //String usernameOrEmail = "existinguser";
        //String password = "wrongpassword";
        //UserAccount user = new UserAccount();
        //user.setUsername(usernameOrEmail);
        //user.setEmail("existinguser@example.com");
        //user.setPassword(passwordEncoder.encode("correctpassword"));

        //when(userRepository.findByUsername(usernameOrEmail)).thenReturn(user);
       // when(passwordEncoder.matches(password,user.getPassword())).thenReturn(false);

        //UserAccount authenticatedUser = userService.authenticateUser(usernameOrEmail, password);

        //assertNull(authenticatedUser);

        //verify(userRepository, times(1)).findByUsername(usernameOrEmail);
        //verify(userRepository, times(0)).findByEmail(any());
        // verify(passwordEncoder, times(1)).matches(password, user.getPassword());
    //}

    @Test
    public void testIsAgeValid() {
        LocalDate eighteenYearsAgo = LocalDate.now().minusYears(18);
        LocalDate seventeenYearsAgo = LocalDate.now().minusYears(17);

        assertTrue(userService.isAgeValid(eighteenYearsAgo));
        assertFalse(userService.isAgeValid(seventeenYearsAgo));
    }
}
