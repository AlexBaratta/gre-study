package com.grestudy.gre_study_backend.deck.dto.request;

import com.grestudy.gre_study_backend.deck.dto.CardDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UpdateDeckRequest {
    private List<CardDTO> toCreateCards;
    private List<CardDTO> toEditCards;
    private List<Long> toDeleteIds;

}
