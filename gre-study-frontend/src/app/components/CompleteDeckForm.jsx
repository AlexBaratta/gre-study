"use client";

import DeckInfoForm from "./DeckInfoForm";
import CardInput from "./CardInput";
import { useRouter } from "next/navigation";

export default function CompleteDeckForm({
  deckInfo,
  setDeckInfo,
  cards,
  setCards,
}) {
  console.log("Card received", cards);
  const handleDeckInfoChange = (e) => {
    const { name, value } = e.target;
    setDeckInfo({ ...deckInfo, [name]: value });
  };

  const handleCardInfoChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCards = [...cards];
    const card = updatedCards[index];
    card[name] = value;

    if (card.status !== "create") {
      card.status = "edit";
    }

    updatedCards[index] = card;
    setCards(updatedCards);
  };

  const handleAddCard = () => {
    setCards([
      ...cards,
      { word: "", definition: "", id: Date.now(), status: "create" },
    ]);
  };

  const handleEditCard = () => {
    setCards([...cards, {}]);
  };

  const handleCardDelete = (index) => {
    const updatedCards = cards.map((card, i) =>
      i === index ? { ...card, status: "delete" } : card
    );
    setCards(updatedCards);
    console.log(cards);
  };

  return (
    <div>
      <form
        id="deck-form"
        className="max-w"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <DeckInfoForm {...deckInfo} onChange={handleDeckInfoChange} />
        {cards &&
          cards
            .filter((card) => card.status !== "delete")
            .map((card, index) => (
              <CardInput
                key={index}
                index={index}
                card={card}
                onChange={handleCardInfoChange}
                onDelete={() => handleCardDelete(index)}
              />
            ))}
        <div className="flex gap-2 justify-center">
          <button
            type="button"
            onClick={handleAddCard}
            className="flex bg-blue-600 rounded text-white p-2 text-sm hover:bg-blue-500"
          >
            Add Card
          </button>
        </div>
      </form>
    </div>
  );
}
