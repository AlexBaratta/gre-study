package com.grestudy.gre_study_backend.service;

import com.grestudy.gre_study_backend.dto.AddVocabRequest;
import com.grestudy.gre_study_backend.dto.DeleteVocabRequest;
import com.grestudy.gre_study_backend.models.Vocabulary;
import com.grestudy.gre_study_backend.repository.VocabRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

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
        String capitalizedWord = StringUtils.capitalize(request.getWord());
        String capitalizedDefinition = StringUtils.capitalize(request.getDefinition());
        Vocabulary newWord = new Vocabulary(capitalizedWord, capitalizedDefinition);
        vocabRepository.save(newWord);
        return newWord;
    }

    public List<Vocabulary> getAll(){
        return vocabRepository.findAll();
    }

    public void deleteWord(DeleteVocabRequest request){
        int removed = vocabRepository.deleteByWord(request.getWord());
        if (removed == 0){
            throw new RuntimeException("Word not found" + request.getWord());
        }
    }
}

