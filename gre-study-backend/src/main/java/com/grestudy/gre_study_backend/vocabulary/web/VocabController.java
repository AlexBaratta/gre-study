package com.grestudy.gre_study_backend.vocabulary.web;

import com.grestudy.gre_study_backend.vocabulary.domain.Vocabulary;
import com.grestudy.gre_study_backend.vocabulary.dto.AddVocabRequest;
import com.grestudy.gre_study_backend.vocabulary.dto.response.WordsResponse;
import com.grestudy.gre_study_backend.vocabulary.service.VocabService;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
            List<WordsResponse> response = words.stream().map(w -> new WordsResponse(w.getId(),w.getWord(), w.getDefinition())).toList();
            log.info("Found words: " + response);
            return ResponseEntity.ok(response);
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

    @GetMapping("/capitalize")
    public ResponseEntity<?> capitalizeDB(){
        log.info("CAPITALIZE");
        try {
            vocabService.capitalizeDBWords();;
            return ResponseEntity.ok().build();
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage() + e.getCause());
        }
    }
}
