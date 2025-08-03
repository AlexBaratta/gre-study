package com.grestudy.gre_study_backend.deck.repository;

import com.grestudy.gre_study_backend.deck.domain.CardDeckVocabulary;
import java.util.List;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CardDeckVocabularyRepository extends JpaRepository<CardDeckVocabulary, Long> {
  List<CardDeckVocabulary> findByCardDeckId(Long id);
  @Query("SELECT c.vocabulary.id FROM CardDeckVocabulary c WHERE c.cardDeck.id = :id")
  List<Long> findVocabIdsByDeckId(@Param("id") Long id);

  Integer deleteAllByCardDeckId(Long id);


  @Modifying
  @Transactional
  @Query("DELETE FROM CardDeckVocabulary c WHERE c.cardDeck.id = :deckId AND c.vocabulary.id IN :vocabIds")
  int deleteAllByCardDeckIdAndVocabularyIds(@Param("deckId") Long cardDeckId,@Param("vocabIds") List<Long> vocabIds);
}
