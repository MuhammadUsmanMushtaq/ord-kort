# Ord-Kort - Swedish Vocabulary Flashcards

<div align="center">
  
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Interactive flashcard app for Swedish vocabulary learning**

</div>

## 📖 Overview

I'm learning Swedish at SIFA, where each week our teacher provides 72 new words to memorize. As a software developer, I saw an opportunity to create a digital solution — Ord-Kort ("word cards" in Swedish), a flashcard web app where I can organize weekly vocabulary lists and share them with classmates.

## ✨ Features

### 🃏 **Smart Flashcards**

- Flip cards with **click** or **spacebar**
- Smooth 3D animations
- Shows English → Swedish translations

### 🎮 **Easy Navigation**

- **Keyboard controls**: ← → arrows to navigate, spacebar to flip
- **Click controls**: Buttons for previous/next cards
- **Visual feedback**: Interactive hover effects

### 📅 **Week Management**

- Dropdown selector for different weekly word lists
- Shows progress and card counts
- Mobile-responsive design

### 📱 Responsive Design

- Mobile-First Approach: Optimized for all screen sizes
- Touch-Friendly: Large buttons for mobile users
- daptive Layout: Cards resize appropriately for different devices

### 🚀 Live Demo

- You can try the application here: (https://ord-kort.netlify.app/)

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/your-username/ord-kort.git
cd ord-kort

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open http://localhost:5173
```

## 🔧 Troubleshooting

| Issue                              | Solution                                                    |
| ---------------------------------- | ----------------------------------------------------------- |
| **App won't start**                | Check Node.js version, run `npm install`                    |
| **Type errors**                    | Ensure TypeScript version matches, run `npm run type-check` |
| **Styles not loading**             | Check Tailwind configuration, restart dev server            |
| **Keyboard shortcuts not working** | Ensure no other extensions are interfering                  |

</br>

### 📝 Adding New Vocabulary

### Edit src/data/flashcards.ts:

- JSON example

```bash
{
id: 1,
title: "Week 1 - Basics",
description: "Basic Swedish vocabulary",
words: [
{ id: 1, en: "hello", swe: "hej" },
{ id: 2, en: "thank you", swe: "tack" },
// Add more words...
]
}
```

## 🤝 Contributing

- Fork the repository

- Create your feature branch

- Commit your changes

- Push to the branch

- Open a Pull Request

## 🙏 Acknowledgments

- Ulf Sparredal - My Swedish teacher at SIFA for the weekly vocabulary lists

- SIFA classmates - For testing and feedback

- React & Tailwind communities - For excellent tools and documentation

<div align="center" style="margin: 60px 0">
Made with ❤️ by a Swedish learner</br>
Lycka till med dina svenska studier!
</div>
