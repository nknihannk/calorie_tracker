import React from 'react';
import { useNutrition } from '../context/NutritionContext';
import './Header.css';

export default function Header() {
    const { selectedDate, dispatch, user, login, logout } = useNutrition();
    const [showUserMenu, setShowUserMenu] = React.useState(false);

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
                        <h1 className="header-title">{user ? `Hello, ${user.displayName.split(' ')[0]}` : 'NutriTrack'}</h1>
                        <p className="header-subtitle">{user ? "You're doing great today!" : "Calorie & Nutrition Tracker"}</p>
                    </div>
                    <div className="header-actions">
                        {user ? (
                            <div className="user-nav-container">
                                <div className="user-profile" onClick={() => setShowUserMenu(!showUserMenu)}>
                                    <img src={user.photoURL} alt={user.displayName} className="user-avatar-img" />
                                </div>

                                {showUserMenu && (
                                    <div className="user-dropdown-overlay" onClick={() => setShowUserMenu(false)}>
                                        <div className="user-dropdown" onClick={(e) => e.stopPropagation()}>
                                            <div className="user-dropdown-header">
                                                <img src={user.photoURL} alt={user.displayName} className="dropdown-avatar" />
                                                <div className="dropdown-info">
                                                    <p className="dropdown-name">{user.displayName}</p>
                                                    <p className="dropdown-email">{user.email}</p>
                                                </div>
                                            </div>
                                            <div className="user-dropdown-body">
                                                <button className="dropdown-item" onClick={login}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                                    Switch Account
                                                </button>
                                                <button className="dropdown-item logout-item" onClick={() => { logout(); setShowUserMenu(false); }}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                                                    Log Out
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button className="btn-signin" onClick={login}>
                                👋 Get Started
                            </button>
                        )}
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
