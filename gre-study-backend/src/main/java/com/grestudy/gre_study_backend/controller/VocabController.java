package com.grestudy.gre_study_backend.controller;

import com.grestudy.gre_study_backend.dto.AddVocabRequest;
import com.grestudy.gre_study_backend.models.Vocabulary;
import com.grestudy.gre_study_backend.service.VocabService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class VocabController {
    private final VocabService vocabService;

    public VocabController(VocabService vocabService) {
        this.vocabService = vocabService;
    }

    @GetMapping("/get-all")
    public ResponseEntity<?> test(){
        try {
            List<Vocabulary> words = vocabService.getAll();
            return ResponseEntity.ok(words);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PostMapping("/add-new")
    public ResponseEntity<?> addNewWord(@RequestBody AddVocabRequest request){
        try {
            Vocabulary v = vocabService.validateAddNewWord(request);
            return ResponseEntity.ok(v);
        } catch (RuntimeException e) {
            return ResponseEntity.status(409).body(e.getMessage());
        }
    }
}
