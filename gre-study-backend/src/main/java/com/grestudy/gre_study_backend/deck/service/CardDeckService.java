package com.grestudy.gre_study_backend.deck.service;

import com.grestudy.gre_study_backend.deck.domain.CardDeck;
import com.grestudy.gre_study_backend.deck.domain.CardDeckVocabulary;
import com.grestudy.gre_study_backend.deck.dto.CardDTO;
import com.grestudy.gre_study_backend.deck.dto.DeckInfoDTO;
import com.grestudy.gre_study_backend.deck.dto.request.AddDeckRequest;
import com.grestudy.gre_study_backend.deck.dto.request.AddWordToDeckRequest;
import com.grestudy.gre_study_backend.deck.dto.response.DeckCardResponse;
import com.grestudy.gre_study_backend.deck.dto.response.DeckInfoResponse;
import com.grestudy.gre_study_backend.deck.repository.CardDeckRepository;
import com.grestudy.gre_study_backend.deck.repository.CardDeckVocabularyRepository;
import com.grestudy.gre_study_backend.vocabulary.domain.Vocabulary;
import com.grestudy.gre_study_backend.vocabulary.dto.AddVocabRequest;
import com.grestudy.gre_study_backend.vocabulary.repository.VocabRepository;
import jakarta.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class CardDeckService {
  private static final Logger log = LoggerFactory.getLogger(CardDeckService.class);
  private final CardDeckRepository cardDeckRepository;
  private final VocabRepository vocabRepository;
  private final CardDeckVocabularyRepository cardDeckVocabularyRepository;

  public CardDeckService(
      CardDeckRepository cardDeckRepository,
      VocabRepository vocabRepository,
      CardDeckVocabularyRepository cardDeckVocabularyRepository) {
    this.cardDeckRepository = cardDeckRepository;
    this.vocabRepository = vocabRepository;
    this.cardDeckVocabularyRepository = cardDeckVocabularyRepository;
  }

  public List<CardDeck> getAll() {
    return cardDeckRepository.findAll();
  }

  public CardDeck addNewDeck(AddDeckRequest request) {
    if (cardDeckRepository.findByTitle(request.getDeckInfo().getTitle()).isPresent()) {
      throw new RuntimeException("Deck with name already exists");
    }

    DeckInfoDTO deckInfo = request.getDeckInfo();
    List<CardDTO> cardList = request.getCards();

    CardDeck newDeck = new CardDeck(deckInfo.getTitle(), deckInfo.getDescription());
    cardDeckRepository.save(newDeck);

    Set<CardDeckVocabulary> vocabularySet = new HashSet<>();
    for (CardDTO cardDTO : cardList) {
      Vocabulary vocab = new Vocabulary(cardDTO.getWord(), cardDTO.getDefinition());
      vocabRepository.save(vocab);

      CardDeckVocabulary link = new CardDeckVocabulary();
      link.setCardDeck(newDeck);
      link.setVocabulary(vocab);
      link.setMastered(false);
      link.setProgress(0);

      cardDeckVocabularyRepository.save(link);
    }

    return newDeck;
  }

  public void addCardToDeck(AddWordToDeckRequest request) {
    AddVocabRequest vocabRequest = request.getVocabRequest();
    Long deckId = request.getId();

    Vocabulary newWord = new Vocabulary(vocabRequest.getWord(), vocabRequest.getDefinition());
    vocabRepository.save(newWord);

    CardDeck deck =
        cardDeckRepository
            .findById(deckId)
            .orElseThrow(() -> new RuntimeException("Deck not found. ID:" + deckId));

    CardDeckVocabulary link = new CardDeckVocabulary();
    link.setCardDeck(deck);
    link.setVocabulary(newWord);
    link.setProgress(0);
    link.setMastered(false);

    cardDeckVocabularyRepository.save(link);
  }

  public List<DeckInfoResponse> getAllDeckInfo() {
    log.info("Getall info" + cardDeckRepository.getAllDeckInfo());

    return cardDeckRepository.getAllDeckInfo().stream()
        .map(i -> new DeckInfoResponse(i.getId(), i.getTitle(), i.getDescription()))
        .toList();
  }

  public List<DeckCardResponse> getCards(Long id) {
    return cardDeckVocabularyRepository.findByCardDeckId(id).stream()
        .map(
            p ->
                new DeckCardResponse(
                    p.getVocabulary().getId(), p.getVocabulary().getWord(), p.getVocabulary().getDefinition()))
        .toList();
  }

  @Transactional
  public CardDeck deleteDeck(Long deckId) {
    CardDeck deck =
        cardDeckRepository.findById(deckId).orElseThrow(() -> new RuntimeException("Deck not found"));

    List<Long> vocabIds = cardDeckVocabularyRepository.findVocabIdsByDeckId(deckId);

    vocabRepository.deleteAllById(vocabIds);

    cardDeckVocabularyRepository.deleteAllByCardDeckId(deckId);

    cardDeckRepository.deleteById(deckId);

    return deck;
  }
}
