package com.inm5151.activity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import org.junit.jupiter.api.Test;

import com.inm5151.activity.model.Activity;
 class ActivityControllerTests {

	private Activity activity = new Activity(1, "course", LocalDate.now());


	@Test
 	void normalizeString() {
		assertEquals("aaaeiiiiggnnsssuuy", ActivityController.normalize("āăąēîïĩíĝġńñšŝśûůŷ"));
		assertEquals("oaaaeiiiiggnnsssuuy", ActivityController.normalize("Ôāăąēîïĩíĝġńñšŝśûůŷ"));
	}

	@Test
 	void containsString() {
		assertTrue(activity.getTypeActivity().contains("course"));
		
	}

 }
