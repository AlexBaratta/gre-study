package com.grestudy.gre_study_backend.deck.web;

import com.grestudy.gre_study_backend.deck.domain.CardDeck;
import com.grestudy.gre_study_backend.deck.dto.request.AddDeckRequest;
import com.grestudy.gre_study_backend.deck.dto.request.AddWordToDeckRequest;
import com.grestudy.gre_study_backend.deck.dto.response.DeckCardResponse;
import com.grestudy.gre_study_backend.deck.dto.response.DeckInfoResponse;
import com.grestudy.gre_study_backend.deck.service.CardDeckService;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
public class CardDeckController {
    private static final Logger log = LoggerFactory.getLogger(CardDeckController.class);
    private final CardDeckService cardDeckService;


    public CardDeckController(CardDeckService cardDeckService) {
        this.cardDeckService = cardDeckService;
    }

    @GetMapping("/decks")
    public ResponseEntity<?> getAllDecks() {
        log.info("Get all decks hit");
        try {
            List<CardDeck> decks = cardDeckService.getAll();
            return ResponseEntity.ok(decks);
        } catch (Exception e) {
            return ResponseEntity.status(404).build();
        }
    }

    @PostMapping("/create-new-deck")
    public ResponseEntity<?> addNewDeck(@RequestBody AddDeckRequest request) {
        log.info("Adding deck:" + request.getDeckInfo().getTitle());
        try {
            cardDeckService.addNewDeck(request);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(404).build(); // Do error code later
        }
    }

    @PostMapping("/add-to-deck")
    public ResponseEntity<?> addCardToDeck(@RequestBody AddWordToDeckRequest request) {
        log.info("Adding word to deck");
        try {
            cardDeckService.addCardToDeck(request);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e.getMessage()); // Do error code later
        }
    }

    @GetMapping("/get-all-deck-info")
    public ResponseEntity<?> getAllDeckInfo() {
        try {
            List<DeckInfoResponse> response = cardDeckService.getAllDeckInfo();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/get-cards/{id}")
    public ResponseEntity<?> getCards(@PathVariable Long id) {
        try {
            List<DeckCardResponse> response =
            cardDeckService.getCards(id);


            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/delete-deck/{id}")
    public ResponseEntity<?> deleteDeck(@PathVariable Long id) {
        try {
            CardDeck deck = cardDeckService.deleteDeck(id);
            return ResponseEntity.ok("Successfully deleted deck \"" + deck.getTitle() + "\"");

        } catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }
}
