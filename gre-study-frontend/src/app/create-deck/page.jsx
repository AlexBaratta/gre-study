"use client";

import { useState, useEffect } from "react";
import DeckInfoForm from "../components/DeckInfoForm";
import CardInput from "../components/CardInput";
import { toast, ToastContainer } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { instance } from "../utils/axiosInstance";
import axios from "axios";
import { useRouter } from "next/navigation";
import CompleteDeckForm from "../components/CompleteDeckForm";

export default function CreateDeckPage() {
  const router = useRouter();
  const [deckInfo, setDeckInfo] = useState({ title: "", description: "" });
  const [cards, setCards] = useState([
    { word: "", definition: "", id: Date.now() },
  ]);

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
    console.log("Submitting?");
    e.preventDefault();
    toast.dismiss();
    console.log("Submitted:", { ...deckInfo, cards });

    createDeck({ deckInfo: deckInfo, cards: cards });
  };

  const handleCardDelete = (cardId) => {
    setCards(cards.filter((c) => c.id !== cardId));
  };

  return (
    <div className="">
      <CompleteDeckForm
        deckInfo={deckInfo}
        setDeckInfo={setDeckInfo}
        cards={cards}
        setCards={setCards}
        handleCardDelete={handleCardDelete}
      />

      <div className="flex justify-end">
        <button
          type="submit"
          form="deck-form"
          className="items-end bg-[#a76463] rounded text-white p-2 text-sm hover:bg-primary"
          onClick={handleSubmit}
        >
          Create Deck
        </button>
      </div>
    </div>
  );
}
