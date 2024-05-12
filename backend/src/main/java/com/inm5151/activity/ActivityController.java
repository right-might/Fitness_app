package com.inm5151.activity;

import com.inm5151.activity.model.Activity;
import com.inm5151.activity.repository.ActivityRepository;

import java.text.Normalizer;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class ActivityController {

    @Autowired
    private ActivityRepository repository;
  
    // création d'une activité
    @PostMapping("/activity")
    public Activity create(@RequestBody Activity activity){
        return repository.save(activity);
    }

    // modification d'une activité
    @PutMapping("/activity")
    public Activity update(@RequestBody Activity modifiedActivity) {   
        return repository.save(modifiedActivity);
    }

    // suppression d'une activité
    @DeleteMapping("activity/{id_activity}")
    public void delete(@PathVariable Integer id_activity){
        try {
            repository.deleteById(id_activity);
        } catch(EmptyResultDataAccessException ex) {
           throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Nothing to delete", ex);
        }
    }

    // sélection d'une activité spécifique
    @GetMapping("/activity/{id_activity}")
    public Optional<Activity> get(@PathVariable Integer id_activity){
        return repository.findById(id_activity);
    }

    // sélection de toutes les activités
    @GetMapping("/activity")
    public List<Activity> getAll(){
        return repository.findAll();
    }

    // sélection de toutes les activités associées à un utilisateur spécifique
    @GetMapping("/activity/user/{idUser}")
    public List<Activity> getByUserId(@PathVariable ("idUser") int idUser){
        return repository.findAllByUser(idUser);
    }

    // sélection de toutes les activités situées entre 2 dates inclusivement
    // ex. activity/2024-03-01/2024-03-31 
    @GetMapping("/activity/{startDate}/{endDate}")
    public List<Activity> getByDateRange(@PathVariable("startDate") String startDateString, 
                                         @PathVariable("endDate") String endDateString) {
        LocalDate startDate = LocalDate.parse(startDateString);
        LocalDate endDate = LocalDate.parse(endDateString);
        return repository.findAllByDateBetween(startDate, endDate);
    }


    // sélection de toutes les activités associées à un utilisateur spécifique situées entre 2 dates inclusivement
    // ex. activity/3/2024-03-01/2024-03-31
    @GetMapping("/activity/{idUser}/{startDate}/{endDate}")
    public List<Activity> getByUserDateRange(@PathVariable("idUser") int idUser,
                                             @PathVariable("startDate") String startDateString, 
                                             @PathVariable("endDate") String endDateString) {
        return getByDateRange(startDateString, endDateString)
                         .stream()
                         .filter(item -> item.getIdUser() == idUser)
                         .collect(Collectors.toList());
    }

    // sélection de toutes les activités contenant la chaine de caratères 'search' dans les champs :
    // type, description, commentaires
    @GetMapping("/activity/user/{idUser}/{search}")
    public List<Activity> getByUserSearch(@PathVariable("idUser") int idUser,
                                          @PathVariable("search") String searchString) {   
        String search = searchString == null ? "" : normalize(searchString);
        return getByUserId(idUser)
                         .stream()
                         .filter(item -> containString(item, search))
                         .collect(Collectors.toList());
    }

    // helper
    // enlève les accents et les majuscules
    public static String normalize(String input) {
        String inputNormalized = (input == null) ? null : Normalizer.normalize(input, Normalizer.Form.NFKD);
        
        return (inputNormalized == null) ? null :inputNormalized.replaceAll("\\p{M}", "").toLowerCase();
    }

    private boolean containString(Activity item, String searchString) {
        if (searchString.isBlank()) {
            return false;
        }
        String textType = (item.getTypeActivity() == null) ? "" : normalize(item.getTypeActivity());
        String textDescription = (item.getDescriptionActivity() == null) ? "" : normalize(item.getDescriptionActivity());
        String textComment = (item.getComment() == null) ? "" : normalize(item.getComment());
        if (textType.contains(searchString)) {
            return true;
        } else if (textDescription.contains(searchString)) {
            return true;
        } else if (textComment.contains(searchString)) {
            return true;
        }
        return false;
   }


}