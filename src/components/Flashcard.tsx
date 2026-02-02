import { useState, useEffect, useCallback } from "react";
import { Flashcard as FlashcardType } from "../types/types.ts";

interface FlashcardProps {
  card: FlashcardType;
  onFlip?: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ card, onFlip }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
  }, [card]);

  // callback for handleClick
  const handleClick = useCallback(() => {
    setIsFlipped((prev) => !prev);
    onFlip?.();
  }, [onFlip]);

  // Add global spacebar listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClick]);

  return (
    <div
      className="w-80 h-96 md:w-96 md:h-112 perspective-1000 cursor-pointer"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? "rotate-y-180" : ""}`}
      >
        {/* Front English */}
        <div className="absolute w-full h-full backface-hidden rounded-2xl p-6 flex flex-col items-center justify-center bg-linear-to-br from-blue-500 to-purple-600 text-white shadow-xl">
          <div className="text-center p-8">
            <h2 className="text-4xl font-bold mb-6">{card.en}</h2>
            <p className="text-sm opacity-80 mt-8 italic">
              Click or press SPACE to flip
            </p>
          </div>
          <div className="absolute bottom-4 left-4 text-xs opacity-60">
            English
          </div>
        </div>

        {/* Back  Swedish */}
        <div className="absolute w-full h-full backface-hidden rounded-2xl p-6 flex flex-col items-center justify-center bg-linear-to-br from-pink-500 to-orange-500 text-white shadow-xl rotate-y-180">
          <div className="text-center p-8">
            <h2 className="text-4xl font-bold mb-3">{card.swe}</h2>
            <div className="text-sm uppercase tracking-wider opacity-90 mb-6">
              Swedish
            </div>
            <p className="text-xl opacity-80 mb-8">({card.en})</p>
            <p className="text-sm opacity-80 mt-8 italic">
              Click or press SPACE to flip back
            </p>
          </div>
          <div className="absolute bottom-4 left-4 text-xs opacity-60">
            Swedish
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
