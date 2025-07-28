package com.grestudy.gre_study_backend.vocabulary.repository;

import com.grestudy.gre_study_backend.vocabulary.domain.Vocabulary;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VocabRepository extends JpaRepository<Vocabulary, Long> {
  Optional<Vocabulary> findByWord(String word);
}
