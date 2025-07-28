package com.grestudy.gre_study_backend.deck.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeckCardResponse {
  private final long id;
  private final String word;
  private final String definition;

  //    private int progress;
  //    private boolean mastered;

  public DeckCardResponse(long id, String word, String definition) {
    this.id = id;
    this.word = word;
    this.definition = definition;
  }
}
