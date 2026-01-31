import { useState, useEffect } from "react";
import FlashcardDeck from "./components/FlashcardDeck";
import { FlashcardData } from "./types/types.ts";
import { BookOpen } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Import JSON directly
import flashcardData from "./data/flashcards.json";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCardsStudied: 0,
    totalFlips: 0,
    weeksCompleted: 0,
    currentStreak: 0,
  });

  // Load data with simulated loading for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);

      // Initialize stats from localStorage
      const savedStats = localStorage.getItem("flashcard-stats");
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Save stats to localStorage when they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("flashcard-stats", JSON.stringify(stats));
    }
  }, [stats, isLoading]);

  // Update stats handlers
  const handleCardFlip = () => {
    setStats((prev) => ({
      ...prev,
      totalFlips: prev.totalFlips + 1,
    }));
  };

  const handleCardLearned = () => {
    setStats((prev) => ({
      ...prev,
      totalCardsStudied: prev.totalCardsStudied + 1,
      currentStreak: prev.currentStreak + 1,
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
        <div className="text-center max-w-md">
          <div className="relative mb-8">
            <BookOpen className="w-24 h-24 text-blue-500 mx-auto animate-pulse" />
            <div className="absolute -inset-4 bg-linear-to-r from-blue-200 to-purple-200 rounded-full blur-xl opacity-50"></div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Swedish Vocabulary Flashcards
          </h1>
          <p className="text-gray-600 mb-8">Loading your learning journey...</p>

          <div className="w-64 mx-auto mb-8">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Loading data</span>
              <span>•</span>
              <span>{flashcardData.totalWeeks} weeks</span>
              <span>•</span>
              <span>{flashcardData.totalWords} words</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-linear-to-r from-blue-500 to-purple-500 animate-pulse"></div>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            <p>Get ready to master Swedish vocabulary!</p>
            <p className="mt-1 text-xs">
              English → Swedish • Week by Week • Interactive Learning
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-purple-50">
      <Header />
      <main className="container mx-auto ">
        <FlashcardDeck
          data={flashcardData as FlashcardData}
          onCardFlip={handleCardFlip}
          onCardLearned={handleCardLearned}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
