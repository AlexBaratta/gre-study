package com.grestudy.gre_study_backend.deck.repository;

import com.grestudy.gre_study_backend.deck.domain.CardDeck;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CardDeckRepository extends JpaRepository<CardDeck, Long> {
  Optional<CardDeck> findByTitle(String name);

  @Query("SELECT c.id as id, c.title as title, c.description as description FROM CardDeck c")
  List<CardDeckSummary> getAllDeckInfo();

  interface CardDeckSummary {
    Long getId();

    String getTitle();

    String getDescription();
  }
}
