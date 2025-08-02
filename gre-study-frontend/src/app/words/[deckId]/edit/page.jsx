"use client";
import CardInput from "@/app/components/CardInput";
import CompleteDeckForm from "@/app/components/CompleteDeckForm";
import { instance } from "@/app/utils/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditDeckPage() {
  const params = useParams();
  const deckId = params.deckId;
  console.log("Params", params);
  console.log("deckId", deckId);
  const [cards, setCards] = useState([
    {
      word: "",
      definition: "",
      id: Date.now(),
      status: "create" | "edit" | "delete",
    },
  ]);
  const [deckInfo, setDeckInfo] = useState({ title: "", description: "" });

  const { mutate: updateDeck } = useMutation({
    mutationFn: async ({ deckId, toDeleteIds }) =>
      instance.put(`/update-deck/${deckId}`, { toDeleteIds }),
    onSuccess: () => {
      //something
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.message || err.message;
        console.error(msg);
        toast.error(msg);
      } else {
        console.error("Error", err);
      }
    },
  });

  const words = useQueryClient().getQueryData([`${deckId}-words`]);

  useEffect(() => {
    setCards(words);
  }, [words]);

  const handleSubmit = () => {
    const toDeleteIds = cards
      .filter((c) => c.status === "delete" && c.id)
      .map((c) => c.id);
    console.log("Delete ids", toDeleteIds);
    updateDeck({ deckId, toDeleteIds });
  };

  return (
    <div>
      <CompleteDeckForm
        deckInfo={deckInfo}
        setDeckInfo={setDeckInfo}
        cards={cards}
        setCards={setCards}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          form="deck-form"
          className="items-end bg-green-700 rounded text-white p-2 text-sm hover:bg-green-600"
          onClick={handleSubmit}
        >
          Create Deck
        </button>
      </div>
    </div>
  );
}
