import { useState } from 'react';
import { useNutrition } from '../context/NutritionContext';
import './ExercisePage.css';

const exercises = [
    { name: 'Walking (30 min)', calories: 120, icon: '🚶', duration: '30 min' },
    { name: 'Running (30 min)', calories: 300, icon: '🏃', duration: '30 min' },
    { name: 'Cycling (30 min)', calories: 260, icon: '🚴', duration: '30 min' },
    { name: 'Swimming (30 min)', calories: 250, icon: '🏊', duration: '30 min' },
    { name: 'Yoga (30 min)', calories: 140, icon: '🧘', duration: '30 min' },
    { name: 'Weight Training (30 min)', calories: 200, icon: '🏋️', duration: '30 min' },
    { name: 'Jump Rope (15 min)', calories: 200, icon: '⏫', duration: '15 min' },
    { name: 'Dancing (30 min)', calories: 180, icon: '💃', duration: '30 min' },
    { name: 'Hiking (1 hr)', calories: 400, icon: '🥾', duration: '1 hr' },
    { name: 'Stretching (15 min)', calories: 50, icon: '🤸', duration: '15 min' },
];

export default function ExercisePage() {
    const { selectedDayData, dispatch, selectedDate } = useNutrition();
    const [customCal, setCustomCal] = useState('');
    const currentExercise = selectedDayData.exercise || 0;

    const addExercise = (calories) => {
        dispatch({
            type: 'SET_EXERCISE',
            payload: { date: selectedDate, calories: currentExercise + calories },
        });
    };

    const resetExercise = () => {
        dispatch({
            type: 'SET_EXERCISE',
            payload: { date: selectedDate, calories: 0 },
        });
    };

    const handleCustomAdd = () => {
        const cal = parseInt(customCal);
        if (cal > 0) {
            addExercise(cal);
            setCustomCal('');
        }
    };

    return (
        <div className="exercise-page">
            <div className="exercise-header">
                <h2 className="exercise-title">Exercise Log</h2>
                <p className="exercise-subtitle">Track your burned calories</p>
            </div>

            {/* Current Exercise Summary */}
            <div className="exercise-summary glass-card animate-fade-in-up">
                <div className="exercise-summary-icon">🔥</div>
                <div className="exercise-summary-info">
                    <span className="exercise-summary-label">Today's Burn</span>
                    <span className="exercise-summary-value">{currentExercise} <small>cal</small></span>
                </div>
                {currentExercise > 0 && (
                    <button className="exercise-reset-btn" onClick={resetExercise}>Reset</button>
                )}
            </div>

            {/* Custom Input */}
            <div className="custom-exercise glass-card animate-fade-in-up stagger-1">
                <h3 className="custom-exercise-title">Quick Add</h3>
                <div className="custom-exercise-row">
                    <input
                        type="number"
                        className="custom-exercise-input"
                        placeholder="Enter calories burned"
                        value={customCal}
                        onChange={(e) => setCustomCal(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCustomAdd()}
                    />
                    <button className="btn-primary custom-add-btn" onClick={handleCustomAdd} disabled={!customCal}>
                        Add
                    </button>
                </div>
            </div>

            {/* Exercise List */}
            <div className="exercise-list">
                <h3 className="exercise-list-title">Common Exercises</h3>
                <div className="exercise-items">
                    {exercises.map((ex) => (
                        <button
                            key={ex.name}
                            className="exercise-item glass-card"
                            onClick={() => addExercise(ex.calories)}
                        >
                            <span className="exercise-item-icon">{ex.icon}</span>
                            <div className="exercise-item-info">
                                <span className="exercise-item-name">{ex.name}</span>
                                <span className="exercise-item-duration">{ex.duration}</span>
                            </div>
                            <div className="exercise-item-cal">
                                <span className="exercise-item-cal-value">-{ex.calories}</span>
                                <span className="exercise-item-cal-unit">cal</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
