import { useState, useEffect } from "react";
import FlashcardDeck from "./components/FlashcardDeck";
import { FlashcardData } from "./types/types.ts";
import Loading from "./components/Loading";
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

  if (isLoading) return <Loading />;

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
