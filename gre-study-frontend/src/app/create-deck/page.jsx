"use client";

import { useState, useEffect } from "react";
import DeckInfoForm from "../components/DeckInfoForm";
import CardInput from "../components/CardInput";
import { toast, ToastContainer } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { instance } from "../utils/axiosInstance";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateDeckPage() {
  const router = useRouter();
  const [deckInfo, setDeckInfo] = useState({ title: "", description: "" });
  const [cards, setCards] = useState([
    { word: "", definition: "", id: Date.now() },
  ]);
  const handleDeckInfoChange = (e) => {
    const { name, value } = e.target;
    setDeckInfo({ ...deckInfo, [name]: value });
  };

  const handleCardInfoChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCards = [...cards];
    updatedCards[index][name] = value;
    setCards(updatedCards);
  };

  const handleCardDelete = (index) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
  };

  const handleAddCard = () => {
    setCards([...cards, { word: "", definition: "", id: Date.now() }]);
  };

  const resetForm = () => {
    setCards([{ word: "", definition: "", id: "" }]);
    setDeckInfo({ title: "", description: "" });
  };

  const { mutate: createDeck, isPending } = useMutation({
    mutationFn: ({ deckInfo, cards }) =>
      //! drop card id here
      instance
        .post("/create-new-deck", { deckInfo, cards })
        .then((res) => res.data),
    onSuccess: () => {
      resetForm();
      localStorage.setItem("deckCreated", "true");
      router.push("/decks");

      // maybe invalidate a query here
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.message || err.message;
        toast.error(msg);
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    console.log("Submitted:", { ...deckInfo, cards });

    createDeck({ deckInfo: deckInfo, cards: cards });
  };

  return (
    <div>
      <form className="max-w" onSubmit={handleSubmit}>
        <DeckInfoForm {...deckInfo} onChange={handleDeckInfoChange} />
        {cards.map((card, index) => (
          <CardInput
            index={index}
            card={card}
            onChange={handleCardInfoChange}
            onDelete={() => handleCardDelete(index)}
          />
        ))}
        <div>
          <button
            type="button"
            onClick={handleAddCard}
            className="bg-blue-500 rounded"
          >
            Add Card
          </button>
          <button type="submit" className="bg-green-600 rounded">
            Create Deck
          </button>
        </div>
      </form>
    </div>
  );
}
