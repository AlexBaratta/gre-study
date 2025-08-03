"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className="sticky top-0 h-screen w-64 bg-primary text-accent p-4 px-5">
      <h2 className="text-3xl font-bold mb-6 px-3">Menu</h2>
      <nav>
        <ul className="space-y-4 text-xl font-bold">
          <li>
            <button
              className="w-full text-left px-3 py-2 rounded hover:bg-white focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => router.push("/")}
            >
              Crossword
            </button>
          </li>
          <li>
            <button
              className="w-full text-left px-3 py-2 rounded hover:bg-white focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => router.push("/flashcards")}
            >
              Flashcards
            </button>
          </li>

          {/* <li>
            <button
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => router.push("/add-word")}
            >
              Add Words
            </button>
          </li> */}
          <li>
            <button
              className="w-full text-left px-3 py-2 rounded hover:bg-white focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => router.push("/view-all")}
            >
              View All Words
            </button>
          </li>
          <li>
            <button
              className="w-full text-left px-3 py-2 rounded hover:bg-white focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => router.push("/decks")}
            >
              View Decks
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
