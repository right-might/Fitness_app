package com.inm5151.user.trainer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.inm5151.user.trainer.model.TrainerAccount;

import java.util.List;


@Repository
public interface TrainerRepository extends JpaRepository<TrainerAccount, Long> {
    TrainerAccount findById(long id); 
    List<TrainerAccount> findByStatus(String status);
}