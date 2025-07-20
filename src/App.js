import React, { useState } from 'react';
import WordCard from './WordCard';
import ThemeSwitcher from './ThemeSwitcher';
import GlobalStats from './GlobalStats';
import wordList from './words.js';
import './App.css'; // Import the CSS file

const App = () => {
    const [words, setWords] = useState(wordList);
    const [theme, setTheme] = useState('theme-dusk'); // A nice dark theme to start
    const [globalStats, setGlobalStats] = useState({ studied: 0, correct: 0 });

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
    };

    const handleFirstTry = (isCorrect) => {
        setGlobalStats(prevStats => ({
            studied: prevStats.studied + 1,
            correct: isCorrect ? prevStats.correct + 1 : prevStats.correct
        }));
    };

    return (
        <div className={`app-container ${theme}`}>
            <div className="container-fluid">
                <h1 className="text-center my-4 site-title">VocabFlow：挑战GRE 1500词汇</h1>
                <ThemeSwitcher onThemeChange={handleThemeChange} currentTheme={theme} />
                <GlobalStats studied={globalStats.studied} correct={globalStats.correct} />
                <div className="word-grid">
                    {words.map((word, index) => (
                        <WordCard 
                            key={index} 
                            wordData={word} 
                            index={index} 
                            allWords={words} 
                            onFirstTry={handleFirstTry}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;