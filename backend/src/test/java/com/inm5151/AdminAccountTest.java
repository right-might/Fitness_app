package com.inm5151;   
import static org.junit.jupiter.api.Assertions.assertEquals; 
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test; 
import com.inm5151.user.administration.model.AdminAccount; 

public class AdminAccountTest {
    private AdminAccount administrateur; 

    @BeforeEach
    public void setup(){
        administrateur = new AdminAccount(111111, 123456);
    } 

    /*
     * Tester le id
     */ 

    @Test 
    public void testIdValid(){
        assertEquals(111111, administrateur.getId());
    } 

    @Test 
    public void testIdInvalid(){
        assertNotEquals(222222,administrateur.getId());
    }


    /*
     * Tester le password
     */ 
    @Test 
    public void testPasswordValid(){
        assertEquals(123456, administrateur.getPassword());
    } 

    @Test 
    public void testPasswordInvalid(){
        assertNotEquals(111111, administrateur.getPassword());
    }
}