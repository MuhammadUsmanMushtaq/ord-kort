export interface Flashcard {
  id: number;
  en: string;
  swe: string;
  learned?: boolean;
}

export interface Week {
  id: string;
  title: string;
  description: string;
  words: Flashcard[];
}

export interface FlashcardData {
  weeks: Week[];
  totalWords: number;
  totalWeeks: number;
  languageFrom: string;
  languageTo: string;
}
