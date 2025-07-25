package com.grestudy.gre_study_backend.deck.service;

import com.grestudy.gre_study_backend.deck.dto.request.AddDeckRequest;
import com.grestudy.gre_study_backend.vocabulary.dto.AddVocabRequest;
import com.grestudy.gre_study_backend.deck.dto.request.AddWordToDeckRequest;
import com.grestudy.gre_study_backend.deck.domain.CardDeck;
import com.grestudy.gre_study_backend.deck.domain.CardDeckVocabulary;
import com.grestudy.gre_study_backend.vocabulary.domain.Vocabulary;
import com.grestudy.gre_study_backend.deck.repository.CardDeckRepository;
import com.grestudy.gre_study_backend.deck.repository.CardDeckVocabularyRepository;
import com.grestudy.gre_study_backend.vocabulary.repository.VocabRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardDeckService {
    private final CardDeckRepository cardDeckRepository;
    private final VocabRepository vocabRepository;
    private final CardDeckVocabularyRepository cardDeckVocabularyRepository;

    public CardDeckService(CardDeckRepository cardDeckRepository, VocabRepository vocabRepository, CardDeckVocabularyRepository cardDeckVocabularyRepository) {
        this.cardDeckRepository = cardDeckRepository;
        this.vocabRepository = vocabRepository;
        this.cardDeckVocabularyRepository = cardDeckVocabularyRepository;
    }

    public List<CardDeck> getAll(){
        return cardDeckRepository.findAll();
    }

    public CardDeck addNewDeck(AddDeckRequest request){
        if (cardDeckRepository.findByName(request.getName()).isPresent()){
            throw new RuntimeException("Deck with name already exists");
        }
        CardDeck newDeck = new CardDeck(request.getName(), request.getDescription());
        cardDeckRepository.save(newDeck);
        return newDeck;
    }

    public void addCardToDeck(AddWordToDeckRequest request){
        AddVocabRequest vocabRequest = request.getVocabRequest();
        Long deckId = request.getId();

        Vocabulary newWord = new Vocabulary(vocabRequest.getWord(), vocabRequest.getDefinition());
        vocabRepository.save(newWord);

        CardDeck deck = cardDeckRepository.findById(deckId).orElseThrow(() -> new RuntimeException("Deck not found. ID:" + deckId));

        CardDeckVocabulary link = new CardDeckVocabulary();
        link.setCardDeck(deck);
        link.setVocabulary(newWord);
        link.setProgress(0);
        link.setMastered(false);

        cardDeckVocabularyRepository.save(link);
    }
}
