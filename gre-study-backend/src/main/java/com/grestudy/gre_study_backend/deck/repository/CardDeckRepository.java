package com.grestudy.gre_study_backend.deck.repository;

import com.grestudy.gre_study_backend.deck.domain.CardDeck;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CardDeckRepository extends JpaRepository<CardDeck, Long> {
    Optional<CardDeck> findByName(String name);
}
