package com.grestudy.gre_study_backend.vocabulary.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WordsResponse {
    public Long id;
    public String word;
    public String definition;

    public WordsResponse(Long id, String word, String definition) {
        this.id = id;
        this.word = word;
        this.definition = definition;
    }
}
