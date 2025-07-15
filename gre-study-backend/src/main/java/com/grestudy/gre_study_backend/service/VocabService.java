package com.grestudy.gre_study_backend.service;

import com.grestudy.gre_study_backend.dto.AddVocabRequest;
import com.grestudy.gre_study_backend.models.Vocabulary;
import com.grestudy.gre_study_backend.repository.VocabRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class VocabService {
    private final VocabRepository vocabRepository;

    public VocabService(VocabRepository vocabRepository) {
        this.vocabRepository = vocabRepository;
    }

    public Vocabulary validateAddNewWord(AddVocabRequest request){
        if (vocabRepository.findByWord(request.getWord()).isPresent()){
            throw new RuntimeException("Word already exists");
        }
        Vocabulary newWord = new Vocabulary(request.getWord(), request.getDefinition());
        vocabRepository.save(newWord);
        return newWord;
    }

    public List<Vocabulary> getAll(){
        return vocabRepository.findAll();
    }
}

