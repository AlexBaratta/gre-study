"use client";

import DeckInfoForm from "./DeckInfoForm";
import CardInput from "./CardInput";
import { useRouter } from "next/navigation";

export default function CompleteDeckForm({
  deckInfo,
  setDeckInfo,
  cards,
  setCards,
  handleCardDelete,
}) {
  console.log("Card received", cards);
  const handleDeckInfoChange = (e) => {
    const { name, value } = e.target;
    setDeckInfo({ ...deckInfo, [name]: value });
  };

  const handleAddCard = () => {
    setCards([
      ...cards,
      { word: "", definition: "", id: Date.now(), status: "create" },
    ]);
  };

  const handleCardInfoChange = (cardId, e) => {
    const { name, value } = e.target;
    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId
          ? {
              ...card,
              [name]: value,
              status: card.status === "create" ? "create" : "edit",
            }
          : card
      )
    );
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
                key={card.id}
                index={index}
                card={card}
                onChange={handleCardInfoChange}
                onDelete={() => handleCardDelete(card.id)}
              />
            ))}
        <div className="flex gap-2 justify-center">
          <button
            type="button"
            onClick={handleAddCard}
            className="flex bg-accent rounded text-white p-2 text-sm hover:bg-primary"
          >
            Add Card
          </button>
        </div>
      </form>
    </div>
  );
}
