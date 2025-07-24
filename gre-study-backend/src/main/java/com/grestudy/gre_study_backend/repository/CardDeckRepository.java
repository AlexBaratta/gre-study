package com.grestudy.gre_study_backend.repository;

import com.grestudy.gre_study_backend.models.CardDeck;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface CardDeckRepository extends JpaRepository<CardDeck, Long> {
    Optional<CardDeck> findByName(String name);
}
