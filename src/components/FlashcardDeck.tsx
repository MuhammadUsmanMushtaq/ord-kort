import { useState, useEffect } from "react";
import { Week, FlashcardData } from "../types/types.ts";
import FlashcardComponent from "./Flashcard";
import WeekSelector from "./WeekSelector";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FlashcardDeckProps {
  data: FlashcardData;
}

const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ data }) => {
  const [selectedWeek, setSelectedWeek] = useState<Week>(data.weeks[0]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [activeButton, setActiveButton] = useState<"prev" | "next" | null>(
    null,
  );

  const currentCard = selectedWeek.words[currentCardIndex];
  const totalCards = selectedWeek.words.length;

  const handleNext = () => {
    setCurrentCardIndex((prev) => (prev + 1) % totalCards);
    setActiveButton("next");
    setTimeout(() => setActiveButton(null), 150);
  };

  const handlePrev = () => {
    setCurrentCardIndex((prev) => (prev - 1 + totalCards) % totalCards);
    setActiveButton("prev");
    setTimeout(() => setActiveButton(null), 150);
  };

  const handleWeekChange = (week: Week) => {
    setSelectedWeek(week);
    setCurrentCardIndex(0);
  };

  const progress =
    totalCards > 0
      ? Math.round(((currentCardIndex + 1) / totalCards) * 100)
      : 0;

  // Add keyboard navigation left/right keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          handlePrev();
          break;
        case "ArrowRight":
          e.preventDefault();
          handleNext();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setCurrentCardIndex(0);
  }, [selectedWeek]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Week Selector */}
      <WeekSelector
        weeks={data.weeks}
        selectedWeek={selectedWeek}
        onWeekChange={handleWeekChange}
      />
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-gray-700">{progress}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-green-400 to-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        {/*  Flashcard  */}
        <div className="flex max-w-md">
          <FlashcardComponent card={currentCard} />
        </div>
      </div>
      {/* // Navigation Controls */}
      <div className="flex justify-between md:justify-center items-center text-center py-8">
        <button
          onClick={handlePrev}
          disabled={currentCardIndex === 0}
          className={`p-3 sm:p-4 rounded-full bg-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-150 disabled:opacity-30 disabled:hover:scale-100 disabled:hover:shadow-md mr-2 sm:mr-4 group relative ${
            activeButton === "prev" ? "scale-95 shadow-lg bg-gray-100" : ""
          }`}
          aria-label="Previous card"
        >
          <ChevronLeft size={20} className="sm:w-6 sm:h-6 text-gray-700" />
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            ← Left Arrow
          </span>
        </button>

        <div className="">
          <p className="text-sm text-gray-500 mt-1">
            Card {currentCardIndex + 1} of {totalCards}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Use ← → arrow keys to navigate
          </p>
        </div>

        <button
          onClick={handleNext}
          disabled={currentCardIndex === totalCards - 1}
          className={`p-3 sm:p-4 rounded-full bg-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-150 disabled:opacity-30 disabled:hover:scale-100 disabled:hover:shadow-md ml-2 sm:ml-4 group relative ${
            activeButton === "next" ? "scale-95 shadow-lg bg-gray-100" : ""
          }`}
          aria-label="Next card"
        >
          <ChevronRight size={20} className="sm:w-6 sm:h-6 text-gray-700" />
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            → Right Arrow
          </span>
        </button>
      </div>
    </div>
  );
};

export default FlashcardDeck;
