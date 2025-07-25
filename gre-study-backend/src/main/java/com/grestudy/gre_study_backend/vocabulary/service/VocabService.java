package com.grestudy.gre_study_backend.vocabulary.service;

import com.grestudy.gre_study_backend.vocabulary.dto.AddVocabRequest;
import com.grestudy.gre_study_backend.vocabulary.domain.Vocabulary;
import com.grestudy.gre_study_backend.vocabulary.repository.VocabRepository;
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
        List<Vocabulary> list = vocabRepository.findAll();
        list.sort((a,b) -> a.getWord().compareToIgnoreCase(b.getWord()));
        return list;
    }

    public void deleteWord(long id){
        vocabRepository.deleteById(id);
    }
}

