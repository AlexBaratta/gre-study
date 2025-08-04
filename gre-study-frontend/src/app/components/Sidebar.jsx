"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bars3Icon,
  RocketLaunchIcon,
  RectangleStackIcon,
  QueueListIcon,
  NumberedListIcon,
  FolderOpenIcon,
  AcademicCapIcon,
  HeartIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/outline";
export default function Sidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    {
      label: "Crossword",
      icon: <RocketLaunchIcon className="size-7 shrink-0" />,
      path: "/",
    },
    {
      label: "Flashcards",
      icon: <RectangleStackIcon className="size-7 shrink-0" />,
      path: "/flashcards",
    },
    {
      label: "View All Words",
      icon: <AcademicCapIcon className="size-7 shrink-0" />,
      path: "/view-all",
    },
    {
      label: "View Decks",
      icon: <FolderOpenIcon className="size-7 shrink-0" />,
      path: "/decks",
    },
  ];

  return (
    <aside
      className={`sticky top-0 h-screen ${
        isOpen ? "w-64" : "w-16"
      } bg-primary text-accent p-4 transition-all duration-400`}
    >
      <div className={`flex ${isOpen ? "" : "px-3"}px-3 mb-4`}>
        {isOpen && (
          <>
            <div className="flex justify-center items-center ">
              <HeartIcon className="size-7" />
            </div>

            <h2 className="flex justify-center items-center align-center text-center text-xl font-bold">
              Ari's Study Site
            </h2>
          </>
        )}
        <div className="flex justify-end items-center">
          <ChevronDoubleLeftIcon
            className={`size-7 transition duration-300 hover:cursor-pointer ${
              isOpen ? "justify-start rotate-0" : "rotate-180 justify-start"
            }`}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </div>
      <nav>
        <ul className="space-y-4 text-xl font-bold">
          {menuItems.map(({ label, icon, path }) => (
            <li key={label}>
              <button
                className={`flex items-center w-full px-3 py-2 rounded hover:bg-white ${
                  isOpen ? "justify-start gap-3" : "justify-center"
                }`}
                onClick={() => router.push(path)}
              >
                {icon}
                {isOpen && (
                  <span
                    className={`transition-opacity duration-200 ${
                      isOpen ? "opacity-100 delay-500" : "opacity-0 delay-0"
                    }`}
                  >
                    {label}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
