
import React, { useState } from 'react';
import WordCard from './WordCard.js';
import ThemeSwitcher from './ThemeSwitcher.js';
import GlobalStats from './GlobalStats.js'; // Import the new component
import wordList from './words.js';

const App = () => {
    const [words, setWords] = useState(wordList);
    const [theme, setTheme] = useState('theme-sky');
    const [globalStats, setGlobalStats] = useState({ studied: 0, correct: 0 });

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
    };

    // Function to update the global score, only called on the first try
    const handleFirstTry = (isCorrect) => {
        setGlobalStats(prevStats => ({
            studied: prevStats.studied + 1,
            correct: isCorrect ? prevStats.correct + 1 : prevStats.correct
        }));
    };

    return (
        <div className={`app-container ${theme}`}>
            <div className="container-fluid">
                <h1 className="text-center my-4 site-title">VocabFlow：挑战雅思1500词</h1>
                <ThemeSwitcher onThemeChange={handleThemeChange} currentTheme={theme} />
                <GlobalStats studied={globalStats.studied} correct={globalStats.correct} />
                <div className="word-grid">
                    {words.map((word, index) => (
                        <WordCard 
                            key={index} 
                            wordData={word} 
                            index={index} 
                            allWords={words} 
                            onFirstTry={handleFirstTry} // Pass the scoring function
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;
