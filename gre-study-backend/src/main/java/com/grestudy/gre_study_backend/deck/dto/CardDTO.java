package com.grestudy.gre_study_backend.deck.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CardDTO {
    private Long id;
    private String word;
    private String definition;
    private String status;
}

