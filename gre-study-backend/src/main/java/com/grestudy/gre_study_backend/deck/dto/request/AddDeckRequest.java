package com.grestudy.gre_study_backend.deck.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddDeckRequest {
  private String name;
  private String description;
  // vocabulary stuff here
}
