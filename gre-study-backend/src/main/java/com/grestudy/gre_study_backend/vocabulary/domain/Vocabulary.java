package com.grestudy.gre_study_backend.vocabulary.domain;

import com.grestudy.gre_study_backend.deck.domain.CardDeckVocabulary;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

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

    @OneToMany(mappedBy = "vocabulary", cascade = CascadeType.ALL)
    private Set<CardDeckVocabulary> cards = new HashSet<>();

    public Vocabulary(String word, String definition) {
        this.word = word;
        this.definition = definition;
    }

    public Vocabulary() {

    }

}
