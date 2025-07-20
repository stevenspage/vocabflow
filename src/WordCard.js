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

const WordCard = ({ wordData, index, allWords, onFirstTry }) => {
    const [isRevealed, setIsRevealed] = useState(false);
    const [options, setOptions] = useState([]);
    const [selectedWord, setSelectedWord] = useState(null);
    const [imageUrl, setImageUrl] = useState(`https://picsum.photos/seed/${wordData.word}/400/300`);
    const [cardScores, setCardScores] = useState({ correct: 0, incorrect: 0 });
    const [isGloballyScored, setIsGloballyScored] = useState(false); // Track if global score was updated

    useEffect(() => {
        const wrongOptions = allWords
            .filter(w => w.word !== wordData.word)
            .sort(() => 0.5 - Math.random())
            .slice(0, 2);

        const allOptions = [wordData, ...wrongOptions];
        setOptions(shuffleArray(allOptions));
    }, [wordData, allWords]);

    const handleOptionClick = (option) => {
        // Prevent recounting if the same option is clicked again
        if (selectedWord === option.word) return;

        setSelectedWord(option.word);
        const isCorrect = option.word === wordData.word;

        // Update global score only on the very first try for this card
        if (!isGloballyScored) {
            onFirstTry(isCorrect);
            setIsGloballyScored(true);
        }

        // Update individual card score every time
        if (isCorrect) {
            setCardScores(prev => ({ ...prev, correct: prev.correct + 1 }));
            correctSound.play().catch(e => console.error("Error playing correct sound:", e));
            setIsRevealed(true);
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
        const newImageUrl = `https://picsum.photos/seed/${wordData.word}${Math.random()}/400/300`;
        setImageUrl(newImageUrl);
    };

    const handleResetClick = (e) => {
        e.stopPropagation();
        setIsRevealed(false);
        setSelectedWord(null);
        // We don't reset isGloballyScored, so the first-try score is preserved.
    };

    const getButtonClass = (option) => {
        if (!selectedWord || selectedWord !== option.word) {
            return 'btn-outline-primary';
        }
        return option.word === wordData.word ? 'btn-success' : 'btn-danger';
    };

    return (
        <div className="word-card">
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
                <h5 className="card-title">
                    {isRevealed ? `${wordData.word}: ${wordData.cn}` : ''}
                </h5>
                <p className="card-text">{wordData.definition}</p>
                
                {isRevealed && <p className="phonetic">{wordData.phonetic}</p>}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    {isRevealed && <span className="speaker-icon" onClick={handleSpeakerClick}>&#x1f50a;</span>}
                    {selectedWord && <span className="reset-icon" onClick={handleResetClick} style={{cursor: 'pointer', fontSize: '1.5rem'}}>&#x21bb;</span>}
                </div>
                <div className="options-container">
                    {options.map((option, i) => (
                        <button 
                            key={i} 
                            className={`btn ${getButtonClass(option)} btn-block mb-2`}
                            onClick={() => handleOptionClick(option)}
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
    );
};

export default WordCard;