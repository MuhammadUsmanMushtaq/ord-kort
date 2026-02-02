import { BookOpen } from "lucide-react";

const Loading = () => {
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
      </div>
    </div>
  );
};

export default Loading;
