package com.grestudy.gre_study_backend.deck.dto.request;

import com.grestudy.gre_study_backend.vocabulary.dto.AddVocabRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddWordToDeckRequest {
  private AddVocabRequest vocabRequest;
  private long id;
}
