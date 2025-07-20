
import React from 'react';

// Final list of 23 curated themes
const themes = [
    { name: 'theme-forest', display: '森林 (Forest)' },
    { name: 'theme-sunset', display: '日落 (Sunset)' },
    { name: 'theme-ocean', display: '海洋 (Ocean)' },
    { name: 'theme-sakura', display: '樱花 (Sakura)' },
    { name: 'theme-royal', display: '皇家 (Royal)' },
    { name: 'theme-lava', display: '熔岩 (Lava)' },
    { name: 'theme-grape', display: '葡萄 (Grape)' },
    { name: 'theme-emerald', display: '翡翠 (Emerald)' },
    { name: 'theme-rose', display: '玫瑰 (Rose)' },
    { name: 'theme-slate', display: '石板 (Slate)' },
    { name: 'theme-indigo', display: '靛蓝 (Indigo)' },
    { name: 'theme-coral', display: '珊瑚 (Coral)' },
    { name: 'theme-mono', display: '单色 (Monochrome)' },
    { name: 'theme-dusk', display: '黄昏 (Dusk)' },
    { name: 'theme-midnight', display: '午夜 (Midnight)' },
    { name: 'theme-dracula', display: '德古拉 (Dracula)' },
    { name: 'theme-graphite', display: '石墨 (Graphite)' },
    { name: 'theme-crimson', display: '深红 (Crimson)' },
    { name: 'theme-solarized-dark', display: '深空 (Solarized Dark)' },
    { name: 'theme-nord-dark', display: '极北 (Nord Dark)' },
    { name: 'theme-gruvbox-dark', display: '复古 (Gruvbox Dark)' },
    { name: 'theme-monokai-pro', display: '经典 (Monokai Pro)' },
    { name: 'theme-night-owl', display: '夜枭 (Night Owl)' },
];

const ThemeSwitcher = ({ onThemeChange, currentTheme }) => {
    return (
        <div className="theme-switcher-container my-4">
            <label htmlFor="theme-select" className="mr-2">选择主题 (Select Theme):</label>
            <select 
                id="theme-select" 
                className="form-control form-control-sm"
                value={currentTheme}
                onChange={(e) => onThemeChange(e.target.value)}
            >
                {themes.map(theme => (
                    <option key={theme.name} value={theme.name}>
                        {theme.display}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ThemeSwitcher;
