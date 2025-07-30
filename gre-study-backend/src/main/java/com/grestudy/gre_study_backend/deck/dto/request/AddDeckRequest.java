package com.grestudy.gre_study_backend.deck.dto.request;

import com.grestudy.gre_study_backend.deck.dto.CardDTO;
import com.grestudy.gre_study_backend.deck.dto.DeckInfoDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AddDeckRequest {
  public DeckInfoDTO deckInfo;
  public List<CardDTO> cards;
}
