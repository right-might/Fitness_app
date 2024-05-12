package com.inm5151.activity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Optional;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.inm5151.activity.model.Activity;

 @SpringBootTest
 class ActivityControllerIntegrationTests {

	@Autowired
    private ActivityController controller;

	private Activity activity = new Activity(1, 10.25, "commentaires", "");

	@Disabled
 	@Test
 	void create_and_delete() {
		Activity resultSave = controller.create(activity);
		int id = resultSave.getIdActivity();
		Optional<Activity> resultGet = controller.get(id);
		assertTrue(resultGet.isPresent());
		
		controller.delete(id);
		Optional<Activity> resultGetAfterDelete = controller.get(id);
		assertFalse(resultGetAfterDelete.isPresent());
 	}

	@Disabled
	@Test
 	void create() {
		Activity resultSave = controller.create(activity);
		int id = resultSave.getIdActivity();
		Optional<Activity> resultGet = controller.get(id);
		assertTrue(resultGet.isPresent());
 	}

	@Disabled
	@Test
 	void create_modify_and_delete() {
		Activity resultSave = controller.create(activity);
		int id = resultSave.getIdActivity();
		Optional<Activity> resultGet = controller.get(id);
		assertTrue(resultGet.isPresent());

		activity.setComment("commentTestModified");		
		controller.update(activity);
		Optional<Activity> resultGetAfterUpdate = controller.get(id);
		assertTrue(resultGetAfterUpdate.isPresent());
		assertEquals("commentTestModified", resultGetAfterUpdate.get().getComment());

		controller.delete(id);
		Optional<Activity> resultGetAfterDelete = controller.get(id);
		assertFalse(resultGetAfterDelete.isPresent());
 	}

	@Test
 	void normalizeString() {
		assertEquals("aaaeiiiiggnnsssuuy", ActivityController.normalize("āăąēîïĩíĝġńñšŝśûůŷ"));
		assertEquals("oaaaeiiiiggnnsssuuy", ActivityController.normalize("Ôāăąēîïĩíĝġńñšŝśûůŷ"));
	}

	@Test
 	void containsString() {
		String test = "course";
		assertTrue(test.contains("course"));
		
	}

 }
