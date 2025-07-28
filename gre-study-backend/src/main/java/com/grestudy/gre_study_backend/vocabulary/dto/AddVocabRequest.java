package com.grestudy.gre_study_backend.vocabulary.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddVocabRequest {
  private String word;
  private String definition;
}
