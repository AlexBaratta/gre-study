package com.grestudy.gre_study_backend.deck.repository;

import com.grestudy.gre_study_backend.deck.domain.CardDeckVocabulary;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardDeckVocabularyRepository extends JpaRepository<CardDeckVocabulary, Long> {
  List<CardDeckVocabulary> findByCardDeckId(Long id);
}
