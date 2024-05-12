package com.inm5151.user.message.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inm5151.user.message.service.MessageService;
import com.inm5151.user.message.model.*;


@RestController
@RequestMapping("/messages")
public class MessageController { 
    //Les constantes 
    static final String MESSAGE = "/creerMessages"; 

    @Autowired 
    private MessageService messageService;


    //Methode qui sert a creer ou modifier un message et l'envoyer a l'administrateur 
    @PostMapping(MESSAGE)
    public ResponseEntity<?> registerMessage(@RequestBody MessageRequest messageRequest) {  
        Message message = messageService.createMessage(messageRequest.getUserId(), messageRequest.getSujet(), messageRequest.getContenu()); 
        if(message != null){
            return ResponseEntity.ok().body(message);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    } 





    
}
