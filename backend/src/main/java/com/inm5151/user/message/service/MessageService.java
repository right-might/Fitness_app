package com.inm5151.user.message.service;

import java.time.LocalDate; 
import java.time.LocalTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inm5151.user.message.model.Message;
import com.inm5151.user.message.repository.MessageRepository;

@Service
public class MessageService { 

    @Autowired
    private MessageRepository messageRepository; 

    

    //Code pour sauvegarder/envoyer un message 
    public Message createMessage(long user_id, String sujet, String contenu){   
        Message message = new Message();
        message.setUserId(user_id);
        message.setSujet(sujet);
        message.setContenu(contenu); 
        message.setDate(LocalDate.now()); 
        message.setHeure(LocalTime.now());
        return messageRepository.save(message);
    }



    


}
