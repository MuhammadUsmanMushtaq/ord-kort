import { useState, useEffect } from "react";
import FlashcardDeck from "./components/FlashcardDeck";
import { FlashcardData } from "./types/types";
import Loading from "./components/Loading";
import Header from "./components/Header";
import Footer from "./components/Footer";

import flashcardData from "./data/flashcards.json";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulated loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-purple-50">
      <Header />
      <main className="container mx-auto">
        <FlashcardDeck data={flashcardData as FlashcardData} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
