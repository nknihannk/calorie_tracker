import { useNutrition } from '../context/NutritionContext';
import './MacroRow.css';

export default function MacroRow() {
    const { goals, dayTotals } = useNutrition();

    const macros = [
        {
            label: 'Fats',
            current: Math.round(dayTotals.fats),
            goal: goals.fats,
            color: 'var(--accent-orange)',
            bgColor: 'var(--accent-orange-bg)',
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-orange)" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v8M8 12h8" />
                </svg>
            ),
        },
        {
            label: 'Carbs',
            current: Math.round(dayTotals.carbs),
            goal: goals.carbs,
            color: 'var(--accent-yellow)',
            bgColor: 'var(--accent-yellow-bg)',
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-yellow)" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 3v18M3 12h18" />
                </svg>
            ),
        },
        {
            label: 'Protein',
            current: Math.round(dayTotals.protein),
            goal: goals.protein,
            color: 'var(--accent-blue)',
            bgColor: 'var(--accent-blue-bg)',
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2" strokeLinecap="round">
                    <path d="M6 12h12M6 8h12M6 16h12" />
                </svg>
            ),
        },
    ];

    return (
        <div className="macro-row animate-fade-in-up stagger-2">
            {macros.map((m) => {
                const pct = Math.min((m.current / m.goal) * 100, 100);
                return (
                    <div key={m.label} className="macro-item glass-card">
                        <div className="macro-header">
                            <span className="macro-label" style={{ color: m.color }}>{m.label}</span>
                        </div>
                        <div className="macro-values">
                            <span className="macro-current">{m.current}g</span>
                            <span className="macro-separator">/</span>
                            <span className="macro-goal">{m.goal}g</span>
                        </div>
                        <div className="macro-bar-track">
                            <div
                                className="macro-bar-fill"
                                style={{
                                    width: `${pct}%`,
                                    background: m.color,
                                    animation: 'progressFill 0.8s ease-out',
                                }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
