package com.inm5151;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.inm5151.user.authentification.controller.AuthentificationController;
import com.inm5151.user.authentification.model.LoginRequest;
import com.inm5151.user.authentification.model.UserAccount;
import com.inm5151.user.authentification.service.UserService;
import com.inm5151.user.authentification.util.JwtUtil;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyBoolean;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

public class LogInLogOutTest {  
    private AuthentificationController authController;
    private UserService userServiceMock;
    private JwtUtil jwtUtilMock;

    @BeforeEach
    public void setUp() {
        userServiceMock = mock(UserService.class);
        jwtUtilMock = mock(JwtUtil.class);
        authController = new AuthentificationController(userServiceMock, jwtUtilMock);
    }

    @Test
    public void testLoginUser_Success() {
        // Mock login request
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("testUser");
        loginRequest.setPassword("testPassword");

        // Mock authenticated user
        UserAccount authenticatedUser = new UserAccount();
        authenticatedUser.setUsername("testUser");

        // Mock token generation
        when(jwtUtilMock.generateToken(anyString(), anyBoolean())).thenReturn("mockToken");

        when(userServiceMock.authenticateUser("testUser", "testPassword")).thenReturn(authenticatedUser);

        HttpServletResponse httpServletResponse = mock(HttpServletResponse.class);

        ResponseEntity<?> responseEntity = authController.loginUser(loginRequest, httpServletResponse);

        verify(jwtUtilMock, times(1)).generateToken("testUser", true);

        verify(httpServletResponse, times(1)).addCookie(any(Cookie.class));

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(authenticatedUser, responseEntity.getBody());
    }

    @Test
    public void testLoginUser_Failure() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("testUser");
        loginRequest.setPassword("testPassword");

        when(userServiceMock.authenticateUser("testUser", "testPassword")).thenReturn(null);

        HttpServletResponse httpServletResponse = mock(HttpServletResponse.class);

        ResponseEntity<?> responseEntity = authController.loginUser(loginRequest, httpServletResponse);

        assertEquals(HttpStatus.UNAUTHORIZED, responseEntity.getStatusCode());
        assertEquals("Échec de l'authentification", responseEntity.getBody());
    }

    @Test
    public void testLogoutUser() {
        HttpServletResponse httpServletResponse = mock(HttpServletResponse.class);

        ResponseEntity<?> responseEntity = authController.logoutUser(httpServletResponse);

        verify(httpServletResponse, times(1)).addCookie(any(Cookie.class));

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Déconnecté", responseEntity.getBody());
    }
}
