import { createContext, useContext, useReducer, useEffect } from 'react';

const NutritionContext = createContext();

const STORAGE_KEY = 'nutritrack_data';

function getToday() {
    return new Date().toISOString().split('T')[0];
}

function loadFromStorage() {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            const data = localStorage.getItem(STORAGE_KEY);
            if (data) {
                const parsed = JSON.parse(data);
                // Basic validation
                if (parsed && typeof parsed === 'object' && parsed.goals) {
                    return parsed;
                }
            }
        }
    } catch (e) {
        console.warn('LocalStorage load failed:', e);
    }
    return null;
}

function saveToStorage(state) {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        }
    } catch (e) {
        console.warn('LocalStorage save failed:', e);
    }
}

const defaultGoals = {
    calories: 1360,
    protein: 68,
    carbs: 170,
    fats: 46,
};

function getInitialState() {
    const saved = loadFromStorage();
    const today = getToday();

    if (saved) {
        return {
            ...saved,
            selectedDate: today,
        };
    }

    return {
        goals: { ...defaultGoals },
        // { [date]: { meals: { breakfast: [], lunch: [], dinner: [], snacks: [] }, exercise: number } }
        dailyData: {},
        selectedDate: today,
        weeklyHistory: [],
    };
}

function getDayData(state, date) {
    if (!state || !state.dailyData) return {
        meals: { breakfast: [], lunch: [], dinner: [], snacks: [] },
        exercise: 0,
    };

    return state.dailyData[date] || {
        meals: { breakfast: [], lunch: [], dinner: [], snacks: [] },
        exercise: 0,
    };
}

function calculateDayTotals(dayData) {
    const totals = { calories: 0, protein: 0, carbs: 0, fats: 0 };

    if (!dayData || !dayData.meals) return totals;

    Object.values(dayData.meals).forEach(mealItems => {
        if (Array.isArray(mealItems)) {
            mealItems.forEach(item => {
                if (item) {
                    totals.calories += Number(item.calories) || 0;
                    totals.protein += Number(item.protein) || 0;
                    totals.carbs += Number(item.carbs) || 0;
                    totals.fats += Number(item.fats) || 0;
                }
            });
        }
    });

    return totals;
}

function nutritionReducer(state, action) {
    switch (action.type) {
        case 'ADD_FOOD': {
            const { date, mealType, food } = action.payload;
            const dayData = getDayData(state, date);
            const foodWithId = { ...food, logId: Date.now() + Math.random() };

            const newDayData = {
                ...dayData,
                meals: {
                    ...dayData.meals,
                    [mealType]: [...dayData.meals[mealType], foodWithId],
                },
            };

            return {
                ...state,
                dailyData: {
                    ...state.dailyData,
                    [date]: newDayData,
                },
            };
        }

        case 'REMOVE_FOOD': {
            const { date, mealType, logId } = action.payload;
            const dayData = getDayData(state, date);

            return {
                ...state,
                dailyData: {
                    ...state.dailyData,
                    [date]: {
                        ...dayData,
                        meals: {
                            ...dayData.meals,
                            [mealType]: dayData.meals[mealType].filter(f => f.logId !== logId),
                        },
                    },
                },
            };
        }

        case 'SET_EXERCISE': {
            const { date, calories } = action.payload;
            const dayData = getDayData(state, date);

            return {
                ...state,
                dailyData: {
                    ...state.dailyData,
                    [date]: { ...dayData, exercise: calories },
                },
            };
        }

        case 'UPDATE_GOALS': {
            return {
                ...state,
                goals: { ...state.goals, ...action.payload },
            };
        }

        case 'SET_DATE': {
            return {
                ...state,
                selectedDate: action.payload,
            };
        }

        default:
            return state;
    }
}

export function NutritionProvider({ children }) {
    const [state, dispatch] = useReducer(nutritionReducer, undefined, getInitialState);

    // Save to localStorage on state change
    useEffect(() => {
        saveToStorage(state);
    }, [state]);

    const selectedDayData = getDayData(state, state.selectedDate);
    const dayTotals = calculateDayTotals(selectedDayData);

    // Get weekly data for charts
    const getWeeklyData = () => {
        const days = [];
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            const data = getDayData(state, dateStr);
            const totals = calculateDayTotals(data);
            days.push({
                date: dateStr,
                day: date.toLocaleDateString('en', { weekday: 'short' }),
                ...totals,
                exercise: data.exercise || 0,
                goal: state.goals.calories,
            });
        }
        return days;
    };

    const value = {
        state,
        dispatch,
        goals: state.goals,
        selectedDate: state.selectedDate,
        selectedDayData,
        dayTotals,
        getWeeklyData,
        remaining: Math.max(0, state.goals.calories - dayTotals.calories + (selectedDayData.exercise || 0)),
    };

    return (
        <NutritionContext.Provider value={value}>
            {children}
        </NutritionContext.Provider>
    );
}

export function useNutrition() {
    const ctx = useContext(NutritionContext);
    if (!ctx) throw new Error('useNutrition must be used within NutritionProvider');
    return ctx;
}
