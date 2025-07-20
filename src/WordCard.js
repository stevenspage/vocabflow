
import React, { useState, useEffect } from 'react';

const correctSound = new Audio('https://cdn.freesound.org/previews/403/403012_5123851-lq.mp3');
const incorrectSound = new Audio('https://cdn.freesound.org/previews/448/448052_5123851-lq.mp3');

const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const highlightWord = (sentence, word) => {
    if (!sentence) return '';
    // Create a more robust regex to handle common variations (plural, -ing, -ed)
    const baseWord = word.endsWith('e') ? word.slice(0, -1) : word;
    const regex = new RegExp(`\\b(${baseWord}[a-z]*)?\\b`, 'gi');
    
    const parts = sentence.split(regex);
    
    return parts.map((part, index) => {
        if (part && part.toLowerCase().startsWith(baseWord.toLowerCase())) {
            return <strong key={index}>{part}</strong>;
        }
        return part;
    });
};

const WordCard = ({ wordData, index, allWords, onFirstTry }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [options, setOptions] = useState([]);
    const [selectedWord, setSelectedWord] = useState(null);
    const [imageUrl, setImageUrl] = useState(`https://picsum.photos/seed/${wordData.word}/400/300`);
    const [cardScores, setCardScores] = useState({ correct: 0, incorrect: 0 });
    const [isGloballyScored, setIsGloballyScored] = useState(false);

    useEffect(() => {
        const wrongOptions = allWords
            .filter(w => w.word !== wordData.word)
            .sort(() => 0.5 - Math.random())
            .slice(0, 2);

        const allOptions = [wordData, ...wrongOptions];
        setOptions(shuffleArray(allOptions));
        setIsFlipped(false);
        setSelectedWord(null);
    }, [wordData, allWords]);

    const handleOptionClick = (option) => {
        if (isFlipped) return;

        setSelectedWord(option.word);
        const isCorrect = option.word === wordData.word;

        if (!isGloballyScored) {
            onFirstTry(isCorrect);
            setIsGloballyScored(true);
        }

        if (isCorrect) {
            setCardScores(prev => ({ ...prev, correct: prev.correct + 1 }));
            correctSound.play().catch(e => console.error("Error playing correct sound:", e));
            setIsFlipped(true);
        } else {
            setCardScores(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
            incorrectSound.play().catch(e => console.error("Error playing incorrect sound:", e));
        }
    };

    const handleSpeakerClick = (e) => {
        e.stopPropagation();
        const utterance = new SpeechSynthesisUtterance(wordData.word);
        speechSynthesis.speak(utterance);
    };

    const handleImageClick = () => {
        if (isFlipped) return;
        const newImageUrl = `https://picsum.photos/seed/${wordData.word}${Math.random()}/400/300`;
        setImageUrl(newImageUrl);
    };

    const handleResetClick = (e) => {
        e.stopPropagation();
        setIsFlipped(false);
        setSelectedWord(null);
    };

    const getButtonClass = (option) => {
        if (!selectedWord || selectedWord !== option.word) {
            return 'btn-outline-primary';
        }
        return option.word === wordData.word ? 'btn-success' : 'btn-danger';
    };

    return (
        <div className="word-card-container">
            <div className={`word-card ${isFlipped ? 'is-flipped' : ''}`}>
                {/* Both front and back are in the same grid cell */}
                <div className="word-card-face word-card-front">
                    <img 
                        src={imageUrl}
                        className="card-img-top"
                        alt={wordData.word}
                        onClick={handleImageClick}
                        style={{ cursor: 'pointer' }}
                        onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = `https://via.placeholder.com/400x300.png?text=${wordData.word}`;
                        }}
                    />
                    <div className="card-body">
                        <p className="card-text">{wordData.definition}</p>
                        <div className="options-container">
                            {options.map((option, i) => (
                                <button 
                                    key={i} 
                                    className={`btn ${getButtonClass(option)} mb-2`}
                                    onClick={() => handleOptionClick(option)}
                                    disabled={isFlipped}
                                >
                                    {option.word}
                                </button>
                            ))}
                        </div>
                        <div className="card-scoreboard mt-3">
                            <span className="score-correct">Correct: {cardScores.correct}</span>
                            <span className="score-incorrect">Incorrect: {cardScores.incorrect}</span>
                        </div>
                    </div>
                </div>

                <div className="word-card-face word-card-back">
                    <div className="card-body d-flex flex-column justify-content-center align-items-center">
                        <h5 className="card-title">{wordData.word}</h5>
                        <p className="card-text">{wordData.cn}</p>
                        <p className="phonetic">{wordData.phonetic}</p>
                        <p className="card-text">{wordData.definition}</p>
                        <p className="card-text font-italic">例: {highlightWord(wordData.example, wordData.word)}</p>
                        <div className="d-flex justify-content-center align-items-center mt-3">
                            <span className="speaker-icon mx-2" onClick={handleSpeakerClick}>&#x1f50a;</span>
                            <span className="reset-icon mx-2" onClick={handleResetClick} style={{cursor: 'pointer', fontSize: '1.5rem'}}>&#x21bb;</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WordCard;
