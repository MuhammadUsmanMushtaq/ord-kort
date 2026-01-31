import { useState, useEffect } from "react";
import { Week, FlashcardData } from "../types/types.ts";
import FlashcardComponent from "./Flashcard";
import WeekSelector from "./WeekSelector";
import {
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  CheckCircle,
  BarChart2,
  BookOpen,
} from "lucide-react";

interface FlashcardDeckProps {
  data: FlashcardData;
  onCardFlip?: () => void;
  onCardLearned?: () => void;
  onWeekComplete?: () => void;
}

const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ data }) => {
  const [selectedWeek, setSelectedWeek] = useState<Week>(data.weeks[0]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flippedCount, setFlippedCount] = useState(0);
  const [learnedCards, setLearnedCards] = useState<number[]>([]);

  const currentCard = selectedWeek.words[currentCardIndex];
  const totalCards = selectedWeek.words.length;

  const handleNext = () => {
    setCurrentCardIndex((prev) => (prev + 1) % totalCards);
  };

  const handlePrev = () => {
    setCurrentCardIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  const handleWeekChange = (week: Week) => {
    setSelectedWeek(week);
    setCurrentCardIndex(0);
    setFlippedCount(0);
  };

  const handleFlip = () => {
    setFlippedCount((prev) => prev + 1);
  };

  const toggleLearned = (cardId: number) => {
    setLearnedCards((prev) =>
      prev.includes(cardId)
        ? prev.filter((id) => id !== cardId)
        : [...prev, cardId],
    );
  };

  const progress =
    totalCards > 0
      ? Math.round(((currentCardIndex + 1) / totalCards) * 100)
      : 0;
  const learnedInWeek = selectedWeek.words.filter((word) =>
    learnedCards.includes(word.id),
  ).length;

  useEffect(() => {
    setCurrentCardIndex(0);
    setFlippedCount(0);
  }, [selectedWeek]);

  const shuffleCards = () => {
    const shuffled = [...selectedWeek.words].sort(() => Math.random() - 0.5);
    setSelectedWeek({ ...selectedWeek, words: shuffled });
    setCurrentCardIndex(0);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header swedish eng vocab */}
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Swedish Vocabulary Flashcards
        </h1>
        <p className="text-gray-600">
          {data.languageFrom} → {data.languageTo} • {data.totalWeeks} weeks •{" "}
          {data.totalWords} words
        </p>
      </div>
      {/* Week Selector */}
      <WeekSelector
        weeks={data.weeks}
        selectedWeek={selectedWeek}
        onWeekChange={handleWeekChange}
      />

      {/* status Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Cards in Week</p>
              <p className="text-2xl font-bold text-gray-800">{totalCards}</p>
            </div>
            <BarChart2 className="text-blue-500" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Current Card</p>
              <p className="text-2xl font-bold text-gray-800">
                {currentCardIndex + 1} / {totalCards}
              </p>
            </div>
            <RefreshCw className="text-green-500" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Times Flipped</p>
              <p className="text-2xl font-bold text-gray-800">{flippedCount}</p>
            </div>
            <div className="text-purple-500">↻</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Learned</p>
              <p className="text-2xl font-bold text-gray-800">
                {learnedInWeek} / {totalCards}
              </p>
            </div>
            <CheckCircle className="text-yellow-500" size={24} />
          </div>
        </div>
      </div>

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
        {/* Flashcard */}
        <div className="flex max-w-md">
          <FlashcardComponent card={currentCard} onFlip={handleFlip} />
        </div>
      </div>

      <div className="flex justify-between md:justify-center items-center text-center py-8 ">
        {/* Previous Arrow */}
        <button
          onClick={handlePrev}
          disabled={currentCardIndex === 0}
          className="p-3 sm:p-4 rounded-full bg-white shadow-md hover:shadow-lg hover:scale-105 transition-all disabled:opacity-30 disabled:hover:scale-100 disabled:hover:shadow-md mr-2 sm:mr-4"
          aria-label="Previous card"
        >
          <ChevronLeft size={20} className="sm:w-6 sm:h-6 text-gray-700" />
        </button>

        <div className="text-lg font-semibold text-gray-700">
          {currentCardIndex + 1} / {totalCards}
          <p className="text-sm text-gray-500 mt-1">
            Card {currentCardIndex + 1} of {totalCards}
          </p>
        </div>
        {/* Next Arrow */}
        <button
          onClick={handleNext}
          disabled={currentCardIndex === totalCards - 1}
          className="p-3 sm:p-4 rounded-full bg-white shadow-md hover:shadow-lg hover:scale-105 transition-all disabled:opacity-30 disabled:hover:scale-100 disabled:hover:shadow-md ml-2 sm:ml-4"
          aria-label="Next card"
        >
          <ChevronRight size={20} className="sm:w-6 sm:h-6 text-gray-700" />
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-10">
        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row  justify-center items-center gap-4">
          <button
            className=" flex items-center gap-2 px-6 py-3 bg-blue-600 text-white  rounded-lg hover:bg-blue-700 transition-colors"
            onClick={shuffleCards}
          >
            <RefreshCw size={20} />
            Shuffle
          </button>
          {/* Mark as Learned */}
          <button
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
              learnedCards.includes(currentCard.id)
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => toggleLearned(currentCard.id)}
          >
            <CheckCircle size={20} />
            {learnedCards.includes(currentCard.id) ? "Learned" : "Mark as "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardDeck;
