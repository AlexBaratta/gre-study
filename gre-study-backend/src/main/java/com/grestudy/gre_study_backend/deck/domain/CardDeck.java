package com.grestudy.gre_study_backend.deck.domain;

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
@Table(name = "CARD_DECK")
public class CardDeck {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CARD_DECK_ID")
    private long id;
    private String title;
    private String description;


    @OneToMany(mappedBy = "cardDeck", cascade = CascadeType.ALL)
    private Set<CardDeckVocabulary> cards = new HashSet<>();

    public CardDeck() {
    }

    public CardDeck(String title, String description) {
        this.title = title;
        this.description = description;
    }


}
