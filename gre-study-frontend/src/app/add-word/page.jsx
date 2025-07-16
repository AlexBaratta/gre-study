"use client";
import { useState } from "react";
import { instance } from "../utils/axiosInstace";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";

export default function AddWordPage() {
  const router = useRouter();
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    toast.dismiss();
    try {
      const { data } = await instance.post("/add-new", { word, definition });
      toast.success("Successfully added new word!");
      setWord("");
      setDefinition("");
      // router.push("/");
    } catch (err) {
      console.error("Caught error:", err);

      if (axios.isAxiosError(err)) {
        if (err.response) {
          setError(
            typeof err.response.data === "string"
              ? err.response.data
              : err.response.data.message || "Server rejected the request"
          );
          toast.error(error);
        } else if (err.request) {
          setError("No response from server");
          toast.error(error);
        } else {
          setError("Request setup failed: " + err.message);
          toast.error(error);
        }
      } else {
        // not an AxiosError (should be rare)
        console.error("Non‑Axios error", err);
        setError("Unexpected error: " + (err.message || err));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="">Add a new word</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block">Word</label>
          <input
            id="word"
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            required
            className="w-full border px-3"
          />
        </div>
        <div>
          <label>Definition</label>
          <input
            id="definition"
            type="text"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            className="w-full border px-3"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add new word"}
        </button>
      </form>
      {/* {error && <p className="text-red-600 text-sm">{error}</p>} */}
      <ToastContainer />
    </div>
  );
}
