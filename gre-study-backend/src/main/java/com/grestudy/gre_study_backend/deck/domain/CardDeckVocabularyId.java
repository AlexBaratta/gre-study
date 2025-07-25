package com.grestudy.gre_study_backend.deck.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class CardDeckVocabularyId implements Serializable {
    @Column(name = "CARD_DECK_ID")
    private Long cardDeckId;
    @Column(name = "VOCABULARY_ID")
    private Long vocabularyId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CardDeckVocabularyId that)) return false;
        return Objects.equals(cardDeckId, that.cardDeckId) && Objects.equals(vocabularyId, that.vocabularyId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cardDeckId, vocabularyId);
    }
}
