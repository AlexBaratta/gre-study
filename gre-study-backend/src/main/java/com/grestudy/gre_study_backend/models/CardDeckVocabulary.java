package com.grestudy.gre_study_backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "CARD_DECK_VOCABULARY")
public class CardDeckVocabulary {
    @EmbeddedId
    private CardDeckVocabularyId id = new CardDeckVocabularyId();

    @ManyToOne
    @MapsId("cardDeckId")
    @JoinColumn(name = "CARD_DECK_ID")
    private CardDeck cardDeck;

    @ManyToOne
    @MapsId("vocabularyId")
    @JoinColumn(name = "VOCABULARY_ID")
    private Vocabulary vocabulary;

    private int progress;
    private boolean mastered;

    public CardDeckVocabulary() {
    }
}
