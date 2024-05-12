package com.inm5151;   
import static org.junit.jupiter.api.Assertions.assertEquals; 
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.inm5151.user.Role;
import com.inm5151.user.authentification.model.UserAccount; 
import java.time.LocalDate;

public class UserAccountTest{   

    private UserAccount user;

    @BeforeEach
    public void setUp() {
        user = new UserAccount(null, "John", "Doe"
        ,"johndoe", "johndoe@example.com", "password123",Role.USER,null,LocalDate.of(1990, 1, 1));
    } 


    /**
     * Tester le prenom
     */ 
    @Test 
    public void testFirstNameValid(){
        assertEquals("John", user.getFirstName());
    } 

    @Test
    public void testFirstNameInvalid(){
        assertNotEquals("Mary", user.getFirstName());
    }


    /**
     * Tester le nom
     */ 
    @Test 
    public void testNameValid(){
        assertEquals("Doe", user.getLastName());
    } 

    @Test
    public void testNameInvalid(){
        assertNotEquals("Deer", user.getLastName());
    }


    /**
     * Tester le username
     */ 
    @Test 
    public void testUsernameValid(){
        assertEquals("johndoe", user.getUsername());
    } 

    @Test
    public void testUsernameInvalid(){
        assertNotEquals("janedoe", user.getUsername());
    }



    /**
     * Tester le courriel
     */  
    @Test
    public void testEmailValid(){
        assertEquals("johndoe@example.com", user.getEmail());
    } 

    @Test 
    public void testEmailInvalid(){
        assertNotEquals("bk791982@ens.uqam.ca", user.getEmail());
    }


    /**
     * Tester le mot de passe
     */ 
    @Test
    public void testPasswordValid(){
        assertEquals("password123", user.getPassword());
    } 

    @Test 
    public void testPasswordInvalid(){
        assertNotEquals("123password", user.getPassword());
    }

    @Test
    public void testDate_of_birthValid(){
        assertEquals(LocalDate.of(1990, 1, 1), user.getDateOfBirth());
    }

    @Test
    public void testDate_of_birthInvalid(){
        assertNotEquals(LocalDate.of(1990, 1, 2), user.getDateOfBirth());
    }

}