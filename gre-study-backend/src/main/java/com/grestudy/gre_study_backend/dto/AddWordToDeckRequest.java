package com.grestudy.gre_study_backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddWordToDeckRequest {
    private AddVocabRequest vocabRequest;
    private long id;
}
