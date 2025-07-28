package com.grestudy.gre_study_backend.deck.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeckInfoResponse {
  public Long id;
  public String name;
  public String description;

  public DeckInfoResponse(Long id, String name, String description) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
