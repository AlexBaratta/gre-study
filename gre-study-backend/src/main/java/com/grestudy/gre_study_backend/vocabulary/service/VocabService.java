package com.grestudy.gre_study_backend.vocabulary.service;

import com.grestudy.gre_study_backend.deck.service.CardDeckService;
import com.grestudy.gre_study_backend.vocabulary.domain.Vocabulary;
import com.grestudy.gre_study_backend.vocabulary.dto.AddVocabRequest;
import com.grestudy.gre_study_backend.vocabulary.repository.VocabRepository;
import java.util.List;

import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class VocabService {
    private final VocabRepository vocabRepository;
    private static final Logger log = LoggerFactory.getLogger(VocabService.class);

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

    @Transactional
    public void capitalizeDBWords(){
        List<Vocabulary> vocabList = vocabRepository.findAll();
        log.info("Vocablist" + vocabList);

        for (Vocabulary v : vocabList){
            vocabRepository.updateAllById(v.getId(), StringUtils.capitalize(v.getWord()), StringUtils.capitalize(v.getDefinition()));
        }
    }
}

