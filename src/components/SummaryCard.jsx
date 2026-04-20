import { useState } from 'react';
import { useNutrition } from '../context/NutritionContext';
import './SummaryCard.css';

export default function SummaryCard({ onEditGoal }) {
    const { goals, dayTotals, remaining, selectedDayData } = useNutrition();

    const totalIntake = dayTotals.calories;
    const exercise = selectedDayData.exercise || 0;
    const progress = Math.min((totalIntake / goals.calories) * 100, 100);

    // SVG Donut chart params
    const size = 160;
    const strokeWidth = 14;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="summary-card glass-card animate-fade-in-up">
            <div className="summary-header">
                <div className="summary-goal-row">
                    <span className="summary-goal-label">Calorie Goal:</span>
                    <span className="summary-goal-value">{goals.calories} cal</span>
                    <button className="edit-goal-btn" onClick={onEditGoal} aria-label="Edit calorie goal">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="summary-body">
                <div className="donut-container">
                    <svg width={size} height={size} className="donut-svg">
                        {/* Background circle */}
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="none"
                            stroke="#E8F5E9"
                            strokeWidth={strokeWidth}
                        />
                        {/* Progress circle */}
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="none"
                            stroke="url(#progressGradient)"
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            className="donut-progress"
                            style={{ '--circumference': circumference }}
                            transform={`rotate(-90 ${size / 2} ${size / 2})`}
                        />
                        <defs>
                            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#27C04D" />
                                <stop offset="100%" stopColor="#4DD86E" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="donut-center">
                        <span className="donut-label">Remaining</span>
                        <span className="donut-value">{remaining}</span>
                        <span className="donut-unit">cal</span>
                    </div>
                </div>

                <div className="quick-stats">
                    <div className="stat-item stat-intake">
                        <div className="stat-icon-wrap stat-icon-yellow">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFD54F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z" />
                                <circle cx="12" cy="9" r="2.5" fill="#FFD54F" stroke="none" />
                            </svg>
                        </div>
                        <div className="stat-info">
                            <span className="stat-label">Food Intake</span>
                            <span className="stat-value">{totalIntake} <small>cal</small></span>
                        </div>
                    </div>

                    <div className="stat-divider"></div>

                    <div className="stat-item stat-burn">
                        <div className="stat-icon-wrap stat-icon-orange">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M12 22c-4.97 0-7-3.58-7-7 0-2.79 1.64-5.15 2.14-5.72.16-.18.4-.28.66-.28.42 0 .78.34.78.76 0 .46.1 1.4.54 2.24.14-.76.52-1.78 1.32-2.74C12.04 7.28 13 4 13 2c0 0 6 3.5 6 11 0 4.42-3.03 9-7 9z" fill="#FF8A65" />
                                <path d="M12 22c-2.49 0-3.5-1.79-3.5-3.5 0-1.4.82-2.58 1.07-2.86.08-.09.2-.14.33-.14.21 0 .39.17.39.38 0 .23.05.7.27 1.12.07-.38.26-.89.66-1.37.3-.38.78-1.02.78-2.63 0 0 3 1.75 3 5.5c0 2.21-1.51 3.5-3 3.5z" fill="#FFCC80" />
                            </svg>
                        </div>
                        <div className="stat-info">
                            <span className="stat-label">Exercise Burn</span>
                            <span className="stat-value">{exercise} <small>cal</small></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
