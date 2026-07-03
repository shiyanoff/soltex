import React from "react";

export const ICONS = {
    // 💡 Освещение
    lightbulb: (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
            <path d="M9 18h6"/>
            <path d="M10 22h4"/>
            <path d="M12 2a7 7 0 0 0-4 12c1 1 1 2 1 3h6c0-1 0-2 1-3a7 7 0 0 0-4-12z"/>
        </svg>
    ),

    // ⚡ Пусконаладка
    power: (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
            <path d="M12 2v10"/>
            <path d="M5.5 5.5a8 8 0 1 0 13 0"/>
        </svg>
    ),

    // 📄 Тех условия
    document: (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <path d="M14 2v6h6"/>
        </svg>
    ),

    // 🔧 Обслуживание
    wrench: (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
            <path d="M14.7 6.3a4 4 0 1 0 3 3l-6.4 6.4a2 2 0 1 0 2.8 2.8l6.4-6.4a4 4 0 0 0-5.8-5.8z"/>
        </svg>
    ),

    // 🔨 Ремонт
    hammer: (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
            <path d="M14 3l7 7-4 4-7-7z"/>
            <path d="M5 14l5 5"/>
        </svg>
    ),

    // ✏️ Проектирование
    pen: (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
            <path d="M12 20h9"/>
            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>
        </svg>
    ),

    // 🎥 Видеонаблюдение
    camera: (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
            <rect x="2" y="7" width="15" height="10" rx="2"/>
            <path d="M17 9l5-2v10l-5-2z"/>
        </svg>
    ),

    // 🔥 Пожарка
    fire: (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
            <path d="M12 2s4 4 4 8-4 6-4 6-4-2-4-6 4-8 4-8z"/>
        </svg>
    ),

    // 📶 Связь
    wifi: (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
            <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
            <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
            <circle cx="12" cy="20" r="1"/>
        </svg>
    ),

    // 💻 Слаботочка
    chip: (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
            <rect x="7" y="7" width="10" height="10" rx="2"/>
            <path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4"/>
        </svg>
    ),
};
