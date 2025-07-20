"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className="sticky top-0 h-screen w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Menu</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <button
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => router.push("/")}
            >
              Crossword
            </button>
          </li>
          <li>
            <button
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => router.push("/flashcards")}
            >
              Flashcards
            </button>
          </li>

          <li>
            <button
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => router.push("/add-word")}
            >
              Add Words
            </button>
          </li>
          <li>
            <button
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => router.push("/words")}
            >
              View All Words
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
