package com.grestudy.gre_study_backend.deck.repository;

import com.grestudy.gre_study_backend.deck.domain.CardDeckVocabulary;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CardDeckVocabularyRepository extends JpaRepository<CardDeckVocabulary, Long> {
  List<CardDeckVocabulary> findByCardDeckId(Long id);
  @Query("SELECT c.vocabulary.id FROM CardDeckVocabulary c WHERE c.cardDeck.id = :id")
  List<Long> findVocabIdsByDeckId(@Param("id") Long id);

  Integer deleteAllByCardDeckId(Long id);
}
