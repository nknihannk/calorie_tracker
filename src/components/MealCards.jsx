import { useNutrition } from '../context/NutritionContext';
import './MealCards.css';

const mealConfig = {
    breakfast: {
        name: 'Breakfast',
        time: '7:00 - 9:00 AM',
        recommended: '300-400 cal',
        emoji: '🥣',
        gradient: 'linear-gradient(135deg, #FFF3E0, #FFE0B2)',
    },
    lunch: {
        name: 'Lunch',
        time: '12:00 - 2:00 PM',
        recommended: '400-500 cal',
        emoji: '🍱',
        gradient: 'linear-gradient(135deg, #E8F5E9, #C8E6C9)',
    },
    dinner: {
        name: 'Dinner',
        time: '7:00 - 9:00 PM',
        recommended: '350-450 cal',
        emoji: '🍽️',
        gradient: 'linear-gradient(135deg, #E3F2FD, #BBDEFB)',
    },
    snacks: {
        name: 'Snacks',
        time: 'Anytime',
        recommended: '100-200 cal',
        emoji: '🍎',
        gradient: 'linear-gradient(135deg, #FCE4EC, #F8BBD0)',
    },
};

export default function MealCards({ onLogMeal }) {
    const { selectedDayData, dispatch, selectedDate } = useNutrition();

    const getMealCalories = (mealType) => {
        const items = selectedDayData.meals[mealType] || [];
        return items.reduce((sum, item) => sum + (item.calories || 0), 0);
    };

    const handleRemoveItem = (mealType, logId) => {
        dispatch({
            type: 'REMOVE_FOOD',
            payload: { date: selectedDate, mealType, logId },
        });
    };

    return (
        <div className="meal-cards-section">
            <div className="section-header">
                <h2 className="section-title">Meal Log</h2>
                <span className="section-subtitle">Track what you eat</span>
            </div>

            <div className="meal-cards-list">
                {Object.entries(mealConfig).map(([type, config], idx) => {
                    const items = selectedDayData.meals[type] || [];
                    const totalCal = getMealCalories(type);

                    return (
                        <div
                            key={type}
                            className={`meal-card glass-card animate-fade-in-up stagger-${idx + 3}`}
                        >
                            <div className="meal-card-main">
                                <div className="meal-icon-wrap" style={{ background: config.gradient }}>
                                    <span className="meal-emoji">{config.emoji}</span>
                                </div>

                                <div className="meal-info">
                                    <span className="meal-name">{config.name}</span>
                                    <span className="meal-time">{config.time}</span>
                                    {totalCal > 0 && (
                                        <span className="meal-logged-cal">{totalCal} cal logged</span>
                                    )}
                                </div>

                                <div className="meal-right">
                                    <span className="meal-recommended">{config.recommended}</span>
                                    <button
                                        className="log-btn"
                                        onClick={() => onLogMeal(type)}
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                            <line x1="12" y1="5" x2="12" y2="19" />
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                        </svg>
                                        Log
                                    </button>
                                </div>
                            </div>

                            {items.length > 0 && (
                                <div className="meal-items-list">
                                    {items.map((item) => (
                                        <div key={item.logId} className="meal-logged-item">
                                            <span className="logged-item-name">{item.name}</span>
                                            <span className="logged-item-cal">{item.calories} cal</span>
                                            <button
                                                className="remove-item-btn"
                                                onClick={() => handleRemoveItem(type, item.logId)}
                                                aria-label="Remove item"
                                            >
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                                    <line x1="18" y1="6" x2="6" y2="18" />
                                                    <line x1="6" y1="6" x2="18" y2="18" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
