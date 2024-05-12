package com.inm5151;

import com.inm5151.user.Role;
import com.inm5151.user.authentification.controller.AuthentificationController;
import com.inm5151.user.authentification.model.UserAccount;
import com.inm5151.user.authentification.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AuthentificationControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private AuthentificationController authentificationController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void registerUser_SuccessfulRegistration_ReturnsOk() {
        // Arrange
        UserAccount testUser = new UserAccount(111111l, "John", "Doe", "johndoe", 
        "john@example.com", "password", Role.USER, null,null);

        when(userService.createUser(any(UserAccount.class))).thenReturn(testUser);

        // Act
        ResponseEntity<?> response = authentificationController.registerUser(testUser);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(testUser, response.getBody());
        verify(userService, times(1)).createUser(any(UserAccount.class));
    }

    @Test
    void registerUser_FailedRegistration_ReturnsInternalServerError() {
        // Arrange
        UserAccount testUser = new UserAccount(111111l, "John"
        , "Doe", "johndoe", "john@example.com", "password", 
        Role.USER, null,null);

        when(userService.createUser(any(UserAccount.class))).thenReturn(null);

        // Act
        ResponseEntity<?> response = authentificationController.registerUser(testUser);

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        verify(userService, times(1)).createUser(any(UserAccount.class));
    }
}
