package com.inm5151.user.authentification.controller;

import com.inm5151.user.authentification.service.UserService;
import com.inm5151.user.authentification.util.JwtUtil;
import com.inm5151.user.security.model.ResetPassword;
import com.inm5151.user.client.model.ClientAccount;
import com.inm5151.user.trainer.model.TrainerAccount;
import com.inm5151.user.authentification.model.LoginRequest;
import com.inm5151.user.authentification.model.UserAccount;
import com.inm5151.user.authentification.model.UserProfile;
import com.inm5151.user.authentification.repository.UserRepository;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class AuthentificationController {
    // Les constantes
    static final String REGISTER = "/register";
    public static final String LOGIN = "/login";
    public static final String LOGOUT = "/logout";
    public static final String COOKIE_NAME = "cid";

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil; 

    @Autowired 
    private UserRepository userRepository;

    public AuthentificationController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping(REGISTER)
    public ResponseEntity<?> registerUser(@RequestBody UserAccount user) {
        UserAccount createdUser = userService.createUser(user);
        if (createdUser != null) { 
            System.out.println("created user: " + createdUser);
            return ResponseEntity.ok().body(createdUser);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping(LOGIN)
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {

        String usernameOrEmail = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        UserAccount user = userService.authenticateUser(usernameOrEmail, password);

        if (user != null) {
            String token = jwtUtil.generateToken(usernameOrEmail, true);

            Cookie cookie = new Cookie(COOKIE_NAME, token);
            cookie.setMaxAge(10000);
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            response.addCookie(cookie);

            return ResponseEntity.ok().body(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Échec de l'authentification");
        }
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId, 
    HttpServletResponse response) {
        try {
            userService.deleteUserById(userId);
            return ResponseEntity.ok("Utilisateur supprimé avec succès");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping(LOGOUT)
    public ResponseEntity<?> logoutUser(HttpServletResponse response) {
        Cookie cookie = new Cookie(COOKIE_NAME, null);
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        response.addCookie(cookie);

        return ResponseEntity.ok().body("Déconnecté");
    }

    @PostMapping("/becomeTrainer")
    public ResponseEntity<?> becomeTrainer(@RequestBody String username) {
        try {
            TrainerAccount trainer = userService.becomeTrainer(username);
            return ResponseEntity.ok().body(trainer);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    
    @GetMapping("/find/{username}")
public ResponseEntity<?> getUserByUsername(@PathVariable String username){
    try {
        UserAccount foundUserAccount = userService.getUser(username);
        return ResponseEntity.ok().body(foundUserAccount);
        
    } catch (RuntimeException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
}


@GetMapping("/get/{id}")
public ResponseEntity<?> getUserById(@PathVariable Long id){
    try{
    UserProfile foundUserAccount = userService.getUser(id);
        return ResponseEntity.ok().body(foundUserAccount);

    }catch(RuntimeException e){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());

        
    }
}



@GetMapping("/trainers")
public ResponseEntity<List<UserAccount>> getAllTrainers() {
    List<UserAccount> trainers = userService.getAllTrainers();
    return ResponseEntity.ok().body(trainers);


} 

@PatchMapping("/update/{userId}")
public ResponseEntity<?> updateUser(@RequestBody UserAccount updatedUser) {
    try {
        UserAccount updatedUserAccount = userService.updateUser(updatedUser);
        return ResponseEntity.ok().body(updatedUserAccount);
    } catch (RuntimeException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
} 
 
    /*
     * Quand un utilisateur aura bien repondu a la question de securite, il pourra reinitialiser son mot de passe
     */ 
    @PostMapping("/reset_password")
    public ResponseEntity<?> reinitialiserMotDePasse(@RequestBody ResetPassword resetPassword){  
        System.out.println("On est dans la methode dans AuthentificationController");
        System.out.println("email: " + resetPassword.getEmail());
        System.out.println("nouveau mot de passe : " + resetPassword.getNewPassword()); 
        
        UserAccount updatedUser = userService.updatePassword(resetPassword.getEmail(),
         resetPassword.getNewPassword());


        return ResponseEntity.ok().body(updatedUser);
        
    }   
  

@PostMapping("/joinTrainer")
public ResponseEntity<?> joinTrainer(@RequestParam long userId, @RequestParam long trainerId) {
  try {
       ClientAccount newClient= userService.joinTrainer(userId, trainerId);
       
       return ResponseEntity.ok().body(newClient + 
         " joint à l'entraîneur " + trainerId + " avec succès.");    } 
         
         catch (RuntimeException e) {
    } catch(Exception e){

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());


    }
return null;

}


@GetMapping("/find-info-admin/{username}")
public ResponseEntity<?> getUserInfoForAdmin(@PathVariable String username){
    try{
    UserProfile foundUserAccount = userService.getUserInfoForAdmin(username);
        return ResponseEntity.ok().body(foundUserAccount);

    }catch(RuntimeException e){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());

        
    }
}
@GetMapping("/find-info-public/{username}")
public ResponseEntity<?> getUserPublicInfo(@PathVariable String username){
    try{
    UserProfile foundUserAccount = userService.getUserPublicInfo(username);
        return ResponseEntity.ok().body(foundUserAccount);

    }catch(RuntimeException e){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());

        
    }
}

}




