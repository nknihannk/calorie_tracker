import { useState } from 'react';
import { useNutrition } from '../context/NutritionContext';
import './GoalModal.css';

export default function GoalModal({ onClose }) {
    const { goals, dispatch } = useNutrition();
    const [form, setForm] = useState({ ...goals });

    const handleSave = () => {
        dispatch({
            type: 'UPDATE_GOALS',
            payload: {
                calories: parseInt(form.calories) || 1360,
                protein: parseInt(form.protein) || 68,
                carbs: parseInt(form.carbs) || 170,
                fats: parseInt(form.fats) || 46,
            },
        });
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="goal-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-handle"></div>

                <div className="modal-header">
                    <h3 className="modal-title">Edit Goals</h3>
                    <button className="modal-close" onClick={onClose}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <div className="goal-form">
                    <div className="goal-field">
                        <div className="goal-field-header">
                            <span className="goal-field-icon" style={{ background: 'var(--primary-green-subtle)' }}>🔥</span>
                            <label className="goal-field-label">Daily Calories</label>
                        </div>
                        <div className="goal-input-wrap">
                            <input
                                type="number"
                                className="goal-input"
                                value={form.calories}
                                onChange={(e) => setForm({ ...form, calories: e.target.value })}
                            />
                            <span className="goal-input-unit">cal</span>
                        </div>
                    </div>

                    <div className="goal-field">
                        <div className="goal-field-header">
                            <span className="goal-field-icon" style={{ background: 'var(--accent-blue-bg)' }}>💪</span>
                            <label className="goal-field-label">Protein</label>
                        </div>
                        <div className="goal-input-wrap">
                            <input
                                type="number"
                                className="goal-input"
                                value={form.protein}
                                onChange={(e) => setForm({ ...form, protein: e.target.value })}
                            />
                            <span className="goal-input-unit">g</span>
                        </div>
                    </div>

                    <div className="goal-field">
                        <div className="goal-field-header">
                            <span className="goal-field-icon" style={{ background: 'var(--accent-yellow-bg)' }}>🌾</span>
                            <label className="goal-field-label">Carbs</label>
                        </div>
                        <div className="goal-input-wrap">
                            <input
                                type="number"
                                className="goal-input"
                                value={form.carbs}
                                onChange={(e) => setForm({ ...form, carbs: e.target.value })}
                            />
                            <span className="goal-input-unit">g</span>
                        </div>
                    </div>

                    <div className="goal-field">
                        <div className="goal-field-header">
                            <span className="goal-field-icon" style={{ background: 'var(--accent-orange-bg)' }}>🥑</span>
                            <label className="goal-field-label">Fats</label>
                        </div>
                        <div className="goal-input-wrap">
                            <input
                                type="number"
                                className="goal-input"
                                value={form.fats}
                                onChange={(e) => setForm({ ...form, fats: e.target.value })}
                            />
                            <span className="goal-input-unit">g</span>
                        </div>
                    </div>

                    <button className="btn-primary btn-full" onClick={handleSave}>
                        Save Goals
                    </button>
                </div>
            </div>
        </div>
    );
}
