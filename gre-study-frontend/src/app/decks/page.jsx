"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { instance } from "../utils/axiosInstance";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import DeckInfoCard from "../components/DeckInfoCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ConfirmModal from "../components/ConfirmModal";
import axios from "axios";
export default function DecksPage() {
  const router = useRouter();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [deckIdForDeletion, setDeckIdForDeletion] = useState("");
  const {
    data: deckInfo,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => instance.get("/get-all-deck-info").then((res) => res.data),
    queryKey: ["deck-info"],
  });

  const { mutate: deleteDeck } = useMutation({
    mutationFn: ({ deckIdForDeletion }) =>
      instance
        .delete(`/delete-deck/${deckIdForDeletion}`)
        .then((res) => res.data),
    onSuccess: async () => {
      toast.success("Successfully deleted card deck.");
      await qc.invalidateQueries({ queryKey: ["deck-info"] }); //? need to check name
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.message || err.message;
        console.error(err);
        toast.error(msg);
      }
    },
  });

  const handleOpenCreate = () => {
    router.push("/create-deck");
    console.log("Clicked");
  };

  useEffect(() => {
    if (localStorage.getItem("deckCreated")) {
      toast.success("Deck created!");
      setTimeout(() => {
        localStorage.removeItem("deckCreated");
      }, 2000);
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error}</div>;
  if (!deckInfo) return <div>No decks found</div>;

  const handleDelete = (e, deckId) => {
    e.stopPropagation();
    setDeckIdForDeletion(deckId);
    console.log("Deck id in handle delete", deckId);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    console.log("ID", deckIdForDeletion);
    deleteDeck({ deckIdForDeletion });
    setOpen(false);
  };

  return (
    <div>
      <DeckInfoCard deckInfo={deckInfo} handleDelete={handleDelete} />
      <div
        className="fixed bottom-0 right-0 hover:cursor-pointer text-accent"
        onClick={() => handleOpenCreate()}
      >
        <PlusCircleIcon className="w-13 h-13 m-7 transition duration-400 hover:scale-110 " />
      </div>
      <ToastContainer />
      <ConfirmModal
        visible={open}
        title={"Delete Card Deck"}
        message={`Are you sure you want to delete the *insert name here* card deck? This action cannot be undone.`}
        onCancel={handleCancel}
        onConfirm={() => handleConfirmDelete()}
      />
    </div>
  );
}
