import { useNutrition } from '../context/NutritionContext';
import './Header.css';

export default function Header() {
    const { selectedDate, dispatch } = useNutrition();

    const getDates = () => {
        const dates = [];
        const today = new Date();
        for (let i = -3; i <= 3; i++) {
            const d = new Date(today);
            d.setDate(d.getDate() + i);
            dates.push({
                dateStr: d.toISOString().split('T')[0],
                day: d.toLocaleDateString('en', { weekday: 'short' }),
                date: d.getDate(),
                isToday: i === 0,
                label: i === 0 ? 'Today' : i === -1 ? 'Yesterday' : i === 1 ? 'Tomorrow' : null,
            });
        }
        return dates;
    };

    const dates = getDates();

    return (
        <header className="header">
            <div className="header-bg">
                <div className="header-circle header-circle-1"></div>
                <div className="header-circle header-circle-2"></div>
                <div className="header-circle header-circle-3"></div>
            </div>
            <div className="header-content">
                <div className="header-top">
                    <div>
                        <h1 className="header-title">NutriTrack</h1>
                        <p className="header-subtitle">Calorie & Nutrition Tracker</p>
                    </div>
                    <div className="header-avatar">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </div>
                </div>

                <div className="date-scroller">
                    <div className="date-scroller-track">
                        {dates.map((d) => (
                            <button
                                key={d.dateStr}
                                className={`date-item ${d.dateStr === selectedDate ? 'active' : ''} ${d.isToday ? 'today' : ''}`}
                                onClick={() => dispatch({ type: 'SET_DATE', payload: d.dateStr })}
                            >
                                <span className="date-day">{d.day}</span>
                                <span className="date-num">{d.date}</span>
                                {d.isToday && d.dateStr === selectedDate && (
                                    <span className="date-today-dot"></span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
}
