package com.grestudy.gre_study_backend.controller;

import com.grestudy.gre_study_backend.dto.AddDeckRequest;
import com.grestudy.gre_study_backend.dto.AddWordToDeckRequest;
import com.grestudy.gre_study_backend.models.CardDeck;
import com.grestudy.gre_study_backend.service.CardDeckService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class CardDeckController {
    private static final Logger log = LoggerFactory.getLogger(CardDeckController.class);
    private final CardDeckService cardDeckService;


    public CardDeckController(CardDeckService cardDeckService) {
        this.cardDeckService = cardDeckService;
    }

    @GetMapping("/decks")
    public ResponseEntity<?> getAllDecks(){
        log.info("Get all decks hit");
        try {
            List<CardDeck> decks = cardDeckService.getAll();
            return ResponseEntity.ok(decks);
        } catch (Exception e){
            return ResponseEntity.status(404).build();
        }
    }

    @PostMapping("/create-new-deck")
    public ResponseEntity<?> addNewDeck(@RequestBody AddDeckRequest request){
        log.info("Adding deck:" + request.getName());
        try {
            cardDeckService.addNewDeck(request);
            return ResponseEntity.ok().build();
        } catch (Exception e){
            return ResponseEntity.status(404).build(); // Do error code later
        }
    }

    @PostMapping("/add-to-deck")
    public ResponseEntity<?> addCardToDeck(@RequestBody AddWordToDeckRequest request){
        log.info("Adding word to deck");
        try {
            cardDeckService.addCardToDeck(request);
            return ResponseEntity.ok().build();
        } catch (Exception e){
            return ResponseEntity.status(404).body(e.getMessage()); // Do error code later
        }

    }
}
