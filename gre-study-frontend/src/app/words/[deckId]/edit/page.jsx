"use client";
import CardInput from "@/app/components/CardInput";
import CompleteDeckForm from "@/app/components/CompleteDeckForm";
import { instance } from "@/app/utils/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditDeckPage() {
  const router = useRouter();
  const qc = useQueryClient();
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
    mutationFn: ({ deckId, toDeleteIds, toEditCards, toCreateCards }) =>
      instance.put(`/update-deck/${deckId}`, {
        toDeleteIds,
        toEditCards,
        toCreateCards,
      }),
    onSuccess: async () => {
      //something
      await qc.invalidateQueries({ queryKey: [`${deckId}-words`] });
      await qc.invalidateQueries({ queryKey: ["words"] });

      localStorage.setItem("deckUpdated", "true");
      console.log("Success!");
      router.push(`/words/${deckId}/`);
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
    const toEditCards = cards.filter((c) => c.status === "edit" && c.id);
    const toCreateCards = cards
      .filter((c) => c.status === "create")
      .map((c) => ({
        word: c.word,
        definition: c.definition,
        status: c.status,
      }));
    updateDeck({ deckId, toDeleteIds, toEditCards, toCreateCards });
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
          type="button"
          className="items-end bg-[#a76463] rounded text-white p-2 text-sm hover:bg-primary"
          onClick={handleSubmit}
        >
          Update Deck
        </button>
      </div>
    </div>
  );
}
