package com.grestudy.gre_study_backend.vocabulary.web;

import com.grestudy.gre_study_backend.vocabulary.dto.AddVocabRequest;
import com.grestudy.gre_study_backend.vocabulary.domain.Vocabulary;
import com.grestudy.gre_study_backend.vocabulary.service.VocabService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class VocabController {
    private static final Logger log = LoggerFactory.getLogger(VocabController.class);
    private final VocabService vocabService;

    public VocabController(VocabService vocabService) {
        this.vocabService = vocabService;
    }

    @GetMapping("/words")
    public ResponseEntity<?> test(){
        log.info("ALL WORDS HIT");
        try {
            List<Vocabulary> words = vocabService.getAll();
            log.info("Found words: " + words);
            return ResponseEntity.ok(words);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PostMapping("/add-new")
    public ResponseEntity<?> addNewWord(@RequestBody AddVocabRequest request){
        log.info("Adding word:" + request.getWord());
        try {
            Vocabulary v = vocabService.validateAddNewWord(request);
            return ResponseEntity.ok(v);
        } catch (RuntimeException e) {
            return ResponseEntity.status(409).body(e.getMessage());
        }
    }

    @DeleteMapping("/word/{id}")
    public ResponseEntity<?> deleteWord(@PathVariable long id){
        log.info("DELETE MAPPING HIT");
        try {
            vocabService.deleteWord(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e){
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
