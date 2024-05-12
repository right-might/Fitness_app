package com.inm5151.user.message.repository; 

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.inm5151.user.message.model.Message; 


@Repository
public interface MessageRepository extends JpaRepository<Message, Long>{
    Message findById(long id);
}
