package com.grestudy.gre_study_backend.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Comparator;

@Data
@Getter
@Setter
@Entity
@Table(name = "VOCABULARY")
public class Vocabulary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "WORD_ID")
    private long id;
    private String word;
    private String definition;

    public Vocabulary(String word, String definition) {
        this.word = word;
        this.definition = definition;
    }

    public Vocabulary() {

    }

}
