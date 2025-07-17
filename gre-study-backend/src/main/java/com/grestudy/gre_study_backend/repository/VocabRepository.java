package com.grestudy.gre_study_backend.repository;

import com.grestudy.gre_study_backend.models.Vocabulary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VocabRepository extends JpaRepository<Vocabulary, Long> {
    Optional<Vocabulary> findByWord(String word);
    int deleteByWord(String word);
}
