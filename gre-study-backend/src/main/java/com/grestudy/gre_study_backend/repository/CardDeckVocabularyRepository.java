package com.grestudy.gre_study_backend.repository;

import com.grestudy.gre_study_backend.models.CardDeckVocabulary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardDeckVocabularyRepository extends JpaRepository<CardDeckVocabulary, Long> {
}
