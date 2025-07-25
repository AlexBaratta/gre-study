package com.grestudy.gre_study_backend.vocabulary.repository;

import com.grestudy.gre_study_backend.vocabulary.domain.Vocabulary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VocabRepository extends JpaRepository<Vocabulary, Long> {
    Optional<Vocabulary> findByWord(String word);
}
