import { useNutrition } from '../context/NutritionContext';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import './ProgressPage.css';

export default function ProgressPage() {
    const { getWeeklyData, goals, dayTotals } = useNutrition();
    const weeklyData = getWeeklyData();

    // Calculate weekly averages
    const daysWithData = weeklyData.filter(d => d.calories > 0);
    const avgCalories = daysWithData.length > 0
        ? Math.round(daysWithData.reduce((s, d) => s + d.calories, 0) / daysWithData.length)
        : 0;
    const avgProtein = daysWithData.length > 0
        ? Math.round(daysWithData.reduce((s, d) => s + d.protein, 0) / daysWithData.length)
        : 0;
    const totalDays = daysWithData.length;
    const daysOnTrack = daysWithData.filter(d => d.calories <= d.goal * 1.1).length;

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="chart-tooltip">
                    <p className="tooltip-label">{label}</p>
                    {payload.map((entry, idx) => (
                        <p key={idx} className="tooltip-value" style={{ color: entry.color }}>
                            {entry.name}: {entry.value}{entry.unit || ''}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="progress-page">
            <div className="progress-header">
                <h2 className="progress-title">Weekly Progress</h2>
                <p className="progress-subtitle">Your nutrition trends this week</p>
            </div>

            {/* Summary Stats */}
            <div className="progress-stats">
                <div className="progress-stat glass-card">
                    <span className="progress-stat-icon">📊</span>
                    <span className="progress-stat-value">{avgCalories}</span>
                    <span className="progress-stat-label">Avg. Calories</span>
                </div>
                <div className="progress-stat glass-card">
                    <span className="progress-stat-icon">💪</span>
                    <span className="progress-stat-value">{avgProtein}g</span>
                    <span className="progress-stat-label">Avg. Protein</span>
                </div>
                <div className="progress-stat glass-card">
                    <span className="progress-stat-icon">🎯</span>
                    <span className="progress-stat-value">{daysOnTrack}/{totalDays}</span>
                    <span className="progress-stat-label">Days on Track</span>
                </div>
            </div>

            {/* Calorie Trend Chart */}
            <div className="chart-card glass-card animate-fade-in-up">
                <h3 className="chart-title">Calorie Intake</h3>
                <p className="chart-subtitle">Daily calories vs. goal</p>
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                            <defs>
                                <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#27C04D" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#27C04D" stopOpacity={0.02} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                            <XAxis
                                dataKey="day"
                                tick={{ fontSize: 11, fill: '#7D7D7D' }}
                                axisLine={{ stroke: 'rgba(0,0,0,0.06)' }}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fontSize: 11, fill: '#7D7D7D' }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <ReferenceLine
                                y={goals.calories}
                                stroke="#FF8A65"
                                strokeDasharray="6 4"
                                strokeWidth={1.5}
                                label={{ value: 'Goal', position: 'right', fill: '#FF8A65', fontSize: 10 }}
                            />
                            <Area
                                type="monotone"
                                dataKey="calories"
                                stroke="#27C04D"
                                strokeWidth={2.5}
                                fill="url(#colorCalories)"
                                name="Calories"
                                dot={{ r: 4, fill: '#27C04D', stroke: 'white', strokeWidth: 2 }}
                                activeDot={{ r: 6, fill: '#27C04D', stroke: 'white', strokeWidth: 2 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Macros Chart */}
            <div className="chart-card glass-card animate-fade-in-up stagger-2">
                <h3 className="chart-title">Macro Breakdown</h3>
                <p className="chart-subtitle">Daily protein, carbs & fats</p>
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                            <XAxis
                                dataKey="day"
                                tick={{ fontSize: 11, fill: '#7D7D7D' }}
                                axisLine={{ stroke: 'rgba(0,0,0,0.06)' }}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fontSize: 11, fill: '#7D7D7D' }}
                                axisLine={false}
                                tickLine={false}
                                unit="g"
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                iconType="circle"
                                iconSize={8}
                                wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                            />
                            <Bar dataKey="protein" fill="#64B5F6" name="Protein" radius={[4, 4, 0, 0]} barSize={14} />
                            <Bar dataKey="carbs" fill="#FFD54F" name="Carbs" radius={[4, 4, 0, 0]} barSize={14} />
                            <Bar dataKey="fats" fill="#FF8A65" name="Fats" radius={[4, 4, 0, 0]} barSize={14} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Today's Breakdown */}
            <div className="chart-card glass-card animate-fade-in-up stagger-3">
                <h3 className="chart-title">Today's Breakdown</h3>
                <div className="today-breakdown">
                    <div className="breakdown-item">
                        <div className="breakdown-left">
                            <div className="breakdown-dot" style={{ background: 'var(--primary-green)' }}></div>
                            <span className="breakdown-label">Calories</span>
                        </div>
                        <div className="breakdown-right">
                            <span className="breakdown-value">{dayTotals.calories}</span>
                            <span className="breakdown-goal">/ {goals.calories} cal</span>
                        </div>
                        <div className="breakdown-bar">
                            <div className="breakdown-bar-fill" style={{
                                width: `${Math.min((dayTotals.calories / goals.calories) * 100, 100)}%`,
                                background: 'var(--primary-green)'
                            }}></div>
                        </div>
                    </div>

                    <div className="breakdown-item">
                        <div className="breakdown-left">
                            <div className="breakdown-dot" style={{ background: 'var(--accent-blue)' }}></div>
                            <span className="breakdown-label">Protein</span>
                        </div>
                        <div className="breakdown-right">
                            <span className="breakdown-value">{dayTotals.protein}g</span>
                            <span className="breakdown-goal">/ {goals.protein}g</span>
                        </div>
                        <div className="breakdown-bar">
                            <div className="breakdown-bar-fill" style={{
                                width: `${Math.min((dayTotals.protein / goals.protein) * 100, 100)}%`,
                                background: 'var(--accent-blue)'
                            }}></div>
                        </div>
                    </div>

                    <div className="breakdown-item">
                        <div className="breakdown-left">
                            <div className="breakdown-dot" style={{ background: 'var(--accent-yellow)' }}></div>
                            <span className="breakdown-label">Carbs</span>
                        </div>
                        <div className="breakdown-right">
                            <span className="breakdown-value">{dayTotals.carbs}g</span>
                            <span className="breakdown-goal">/ {goals.carbs}g</span>
                        </div>
                        <div className="breakdown-bar">
                            <div className="breakdown-bar-fill" style={{
                                width: `${Math.min((dayTotals.carbs / goals.carbs) * 100, 100)}%`,
                                background: 'var(--accent-yellow)'
                            }}></div>
                        </div>
                    </div>

                    <div className="breakdown-item">
                        <div className="breakdown-left">
                            <div className="breakdown-dot" style={{ background: 'var(--accent-orange)' }}></div>
                            <span className="breakdown-label">Fats</span>
                        </div>
                        <div className="breakdown-right">
                            <span className="breakdown-value">{dayTotals.fats}g</span>
                            <span className="breakdown-goal">/ {goals.fats}g</span>
                        </div>
                        <div className="breakdown-bar">
                            <div className="breakdown-bar-fill" style={{
                                width: `${Math.min((dayTotals.fats / goals.fats) * 100, 100)}%`,
                                background: 'var(--accent-orange)'
                            }}></div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ height: '20px' }}></div>
        </div>
    );
}
