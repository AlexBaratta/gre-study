package com.grestudy.gre_study_backend.deck.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeckInfoResponse {
  public Long id;
  public String title;
  public String description;

  public DeckInfoResponse(Long id, String title, String description) {
    this.id = id;
    this.title = title;
    this.description = description;
  }
}
