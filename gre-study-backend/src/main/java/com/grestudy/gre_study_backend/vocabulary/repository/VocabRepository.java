package com.grestudy.gre_study_backend.vocabulary.repository;

import com.grestudy.gre_study_backend.vocabulary.domain.Vocabulary;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VocabRepository extends JpaRepository<Vocabulary, Long> {
  Optional<Vocabulary> findByWord(String word);

  @Modifying(clearAutomatically = true)
  @Query("UPDATE Vocabulary v SET v.word = :word, v.definition = :definition WHERE v.id = :id")
  int updateAllById(@Param("id") Long id, @Param("word") String word, @Param("definition") String definition);
}
