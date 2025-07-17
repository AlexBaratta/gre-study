package com.grestudy.gre_study_backend.dto;

import lombok.Getter;

@Getter
public class DeleteVocabRequest {
    private String word;
    private String definition;
}
