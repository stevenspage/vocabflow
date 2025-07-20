
import React from 'react';

const GlobalStats = ({ studied, correct }) => {
    const accuracy = studied > 0 ? ((correct / studied) * 100).toFixed(1) : 0;

    return (
        <div className="global-stats-container my-4">
            <div className="stat-item">
                <span className="stat-value">{studied}</span>
                <span className="stat-label">单词已学习 (Words Studied)</span>
            </div>
            <div className="stat-item">
                <span className="stat-value">{correct}</span>
                <span className="stat-label">首次正确 (First-Try Correct)</span>
            </div>
            <div className="stat-item">
                <span className="stat-value">{accuracy}%</span>
                <span className="stat-label">首次正确率 (Accuracy)</span>
            </div>
        </div>
    );
};

export default GlobalStats;
