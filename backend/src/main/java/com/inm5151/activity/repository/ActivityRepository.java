package com.inm5151.activity.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.inm5151.activity.model.Activity;


/**
 * Interface qui gère la persistence des activités.
 * 
 */
@Repository
public interface ActivityRepository extends JpaRepository<Activity, Integer>{

    @Query("SELECT a FROM Activity a WHERE a.idUser=:idUser")
    List<Activity> findAllByUser(@Param("idUser") int idUser);


    List<Activity> findAllByDateBetween(LocalDate startDate, LocalDate endDate);
}
