import { useState, useRef, useEffect } from 'react';
import { useNutrition } from '../context/NutritionContext';
import { searchFoods } from '../data/foodDatabase';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './LogModal.css';

// Initialize Gemini with API Key from Environment Variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const mealLabels = {
    breakfast: 'Breakfast',
    lunch: 'Lunch',
    dinner: 'Dinner',
    snacks: 'Snacks',
};

export default function LogModal({ mealType, onClose }) {
    const [activeTab, setActiveTab] = useState('search');
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [servings, setServings] = useState(1);
    const [imagePreview, setImagePreview] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [imageResult, setImageResult] = useState(null);
    const [manualEntry, setManualEntry] = useState({ name: '', calories: '', protein: '', carbs: '', fats: '' });
    const { dispatch, selectedDate } = useNutrition();
    const inputRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (activeTab === 'search' && inputRef.current) {
            inputRef.current.focus();
        }
    }, [activeTab]);

    useEffect(() => {
        if (query.length >= 2) {
            const found = searchFoods(query);
            setResults(found);
        } else {
            setResults([]);
        }
    }, [query]);

    const handleAddFood = (food, qty = 1) => {
        const finalFood = {
            name: food.name,
            calories: Math.round(food.calories * qty),
            protein: Math.round(food.protein * qty),
            carbs: Math.round(food.carbs * qty),
            fats: Math.round(food.fats * qty),
        };

        dispatch({
            type: 'ADD_FOOD',
            payload: { date: selectedDate, mealType, food: finalFood },
        });

        onClose();
    };

    const handleManualAdd = () => {
        if (!manualEntry.name || !manualEntry.calories) return;

        const food = {
            name: manualEntry.name,
            calories: parseInt(manualEntry.calories) || 0,
            protein: parseInt(manualEntry.protein) || 0,
            carbs: parseInt(manualEntry.carbs) || 0,
            fats: parseInt(manualEntry.fats) || 0,
        };

        dispatch({
            type: 'ADD_FOOD',
            payload: { date: selectedDate, mealType, food },
        });

        onClose();
    };

    const analyzeImageWithAI = async (base64Data) => {
        setAnalyzing(true);
        setImageResult(null);

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            // Extract the base64 content
            const base64Content = base64Data.split(',')[1];

            const prompt = "Identify the food in this image. Provide the nutrition info per standard serving. Return ONLY a JSON object in this format: { \"name\": \"Food Name\", \"calories\": 400, \"protein\": 15, \"carbs\": 50, \"fats\": 10 }. Do not include any other text or markdown formatting.";

            const result = await model.generateContent([
                prompt,
                {
                    inlineData: {
                        data: base64Content,
                        mimeType: "image/jpeg"
                    }
                }
            ]);

            const response = await result.response;
            const text = response.text();

            // Basic cleanup
            const cleanText = text.replace(/```json|```/g, "").trim();
            const data = JSON.parse(cleanText);

            setImageResult(data);
        } catch (error) {
            console.error("AI Analysis failed:", error);
            alert("Sorry, I couldn't analyze that image. Please try again or use manual entry.");
        } finally {
            setAnalyzing(false);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
            setImagePreview(ev.target.result);
            analyzeImageWithAI(ev.target.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-handle"></div>

                <div className="modal-header">
                    <h3 className="modal-title">
                        Log {mealLabels[mealType]}
                    </h3>
                    <button className="modal-close" onClick={onClose}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Tab Switcher */}
                <div className="modal-tabs">
                    <button
                        className={`modal-tab ${activeTab === 'search' ? 'active' : ''}`}
                        onClick={() => setActiveTab('search')}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        Search Food
                    </button>
                    <button
                        className={`modal-tab ${activeTab === 'manual' ? 'active' : ''}`}
                        onClick={() => setActiveTab('manual')}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        Manual Entry
                    </button>
                    <button
                        className={`modal-tab ${activeTab === 'image' ? 'active' : ''}`}
                        onClick={() => setActiveTab('image')}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                        </svg>
                        Image Scan
                    </button>
                </div>

                {/* Search Tab */}
                {activeTab === 'search' && (
                    <div className="tab-content animate-fade-in-up">
                        <div className="search-input-wrap">
                            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                ref={inputRef}
                                type="text"
                                className="search-input"
                                placeholder="Search food (e.g., rice, chicken biryani...)"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            {query && (
                                <button className="search-clear" onClick={() => { setQuery(''); setSelectedFood(null); }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="15" y1="9" x2="9" y2="15" />
                                        <line x1="9" y1="9" x2="15" y2="15" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        {selectedFood ? (
                            <div className="food-detail-card">
                                <h4 className="food-detail-name">{selectedFood.name}</h4>
                                <p className="food-detail-serving">Serving: {selectedFood.serving}</p>

                                <div className="food-detail-macros">
                                    <div className="food-macro">
                                        <span className="food-macro-val" style={{ color: 'var(--primary-green)' }}>{Math.round(selectedFood.calories * servings)}</span>
                                        <span className="food-macro-label">Calories</span>
                                    </div>
                                    <div className="food-macro">
                                        <span className="food-macro-val" style={{ color: 'var(--accent-blue)' }}>{Math.round(selectedFood.protein * servings)}g</span>
                                        <span className="food-macro-label">Protein</span>
                                    </div>
                                    <div className="food-macro">
                                        <span className="food-macro-val" style={{ color: 'var(--accent-yellow)' }}>{Math.round(selectedFood.carbs * servings)}g</span>
                                        <span className="food-macro-label">Carbs</span>
                                    </div>
                                    <div className="food-macro">
                                        <span className="food-macro-val" style={{ color: 'var(--accent-orange)' }}>{Math.round(selectedFood.fats * servings)}g</span>
                                        <span className="food-macro-label">Fats</span>
                                    </div>
                                </div>

                                <div className="servings-row">
                                    <span className="servings-label">Servings:</span>
                                    <div className="servings-control">
                                        <button className="serving-btn" onClick={() => setServings(Math.max(0.5, servings - 0.5))}>−</button>
                                        <span className="serving-value">{servings}</span>
                                        <button className="serving-btn" onClick={() => setServings(servings + 0.5)}>+</button>
                                    </div>
                                </div>

                                <div className="food-detail-actions">
                                    <button className="btn-secondary" onClick={() => setSelectedFood(null)}>Back</button>
                                    <button className="btn-primary" onClick={() => handleAddFood(selectedFood, servings)}>
                                        Add to {mealLabels[mealType]}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="search-results">
                                {results.length === 0 && query.length >= 2 && (
                                    <div className="no-results">
                                        <span className="no-results-emoji">🔍</span>
                                        <p>No foods found for "{query}"</p>
                                        <p className="no-results-hint">Try a different search or use Manual Entry</p>
                                    </div>
                                )}
                                {results.length === 0 && query.length < 2 && (
                                    <div className="search-hint">
                                        <span className="search-hint-emoji">💡</span>
                                        <p>Type at least 2 characters to search</p>
                                        <div className="search-suggestions">
                                            <span className="suggestion-label">Popular:</span>
                                            {['rice', 'chapati', 'chicken', 'dal', 'banana'].map(s => (
                                                <button key={s} className="suggestion-chip" onClick={() => setQuery(s)}>{s}</button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {results.map((food) => (
                                    <button
                                        key={food.id}
                                        className="search-result-item"
                                        onClick={() => { setSelectedFood(food); setServings(1); }}
                                    >
                                        <div className="result-info">
                                            <span className="result-name">{food.name}</span>
                                            <span className="result-serving">{food.serving}</span>
                                        </div>
                                        <div className="result-cal">
                                            <span className="result-cal-value">{food.calories}</span>
                                            <span className="result-cal-unit">cal</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Manual Entry Tab */}
                {activeTab === 'manual' && (
                    <div className="tab-content animate-fade-in-up">
                        <div className="manual-form">
                            <div className="form-group">
                                <label className="form-label">Food Name *</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="e.g., Homemade Pasta"
                                    value={manualEntry.name}
                                    onChange={(e) => setManualEntry({ ...manualEntry, name: e.target.value })}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Calories *</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        placeholder="0"
                                        value={manualEntry.calories}
                                        onChange={(e) => setManualEntry({ ...manualEntry, calories: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Protein (g)</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        placeholder="0"
                                        value={manualEntry.protein}
                                        onChange={(e) => setManualEntry({ ...manualEntry, protein: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Carbs (g)</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        placeholder="0"
                                        value={manualEntry.carbs}
                                        onChange={(e) => setManualEntry({ ...manualEntry, carbs: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Fats (g)</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        placeholder="0"
                                        value={manualEntry.fats}
                                        onChange={(e) => setManualEntry({ ...manualEntry, fats: e.target.value })}
                                    />
                                </div>
                            </div>

                            <button
                                className="btn-primary btn-full"
                                onClick={handleManualAdd}
                                disabled={!manualEntry.name || !manualEntry.calories}
                            >
                                Add to {mealLabels[mealType]}
                            </button>
                        </div>
                    </div>
                )}

                {/* Image Tab */}
                {activeTab === 'image' && (
                    <div className="tab-content animate-fade-in-up">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                        />

                        {!imagePreview ? (
                            <div className="image-upload-area">
                                <div className="upload-icon">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary-green)" strokeWidth="1.5" strokeLinecap="round">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                        <circle cx="8.5" cy="8.5" r="1.5" />
                                        <polyline points="21 15 16 10 5 21" />
                                    </svg>
                                </div>
                                <p className="upload-title">Scan Your Food</p>
                                <p className="upload-desc">AI-powered nutrition detection. Just upload a photo of your meal.</p>

                                <div className="upload-buttons">
                                    <button className="btn-primary" onClick={() => fileInputRef.current?.click()}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="17 8 12 3 7 8" />
                                            <line x1="12" y1="3" x2="12" y2="15" />
                                        </svg>
                                        Upload Image
                                    </button>
                                    <button className="btn-secondary" onClick={() => fileInputRef.current?.click()}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                            <circle cx="12" cy="13" r="4" />
                                        </svg>
                                        Take Photo
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="image-result-area">
                                <div className="image-preview-wrap">
                                    <img src={imagePreview} alt="Food" className="image-preview" />
                                    <button className="image-change-btn" onClick={() => { setImagePreview(null); setImageResult(null); }}>
                                        Change
                                    </button>
                                </div>

                                {analyzing && (
                                    <div className="analyzing-state">
                                        <div className="analyzing-spinner"></div>
                                        <p className="analyzing-text">Analyzing your food...</p>
                                        <p className="analyzing-hint">AI is detecting nutritional content</p>
                                    </div>
                                )}

                                {imageResult && (
                                    <div className="image-detected">
                                        <div className="detected-header">
                                            <span className="detected-badge">✨ Detected</span>
                                            <h4 className="detected-name">{imageResult.name}</h4>
                                        </div>

                                        <div className="food-detail-macros">
                                            <div className="food-macro">
                                                <span className="food-macro-val" style={{ color: 'var(--primary-green)' }}>{imageResult.calories}</span>
                                                <span className="food-macro-label">Calories</span>
                                            </div>
                                            <div className="food-macro">
                                                <span className="food-macro-val" style={{ color: 'var(--accent-blue)' }}>{imageResult.protein}g</span>
                                                <span className="food-macro-label">Protein</span>
                                            </div>
                                            <div className="food-macro">
                                                <span className="food-macro-val" style={{ color: 'var(--accent-yellow)' }}>{imageResult.carbs}g</span>
                                                <span className="food-macro-label">Carbs</span>
                                            </div>
                                            <div className="food-macro">
                                                <span className="food-macro-val" style={{ color: 'var(--accent-orange)' }}>{imageResult.fats}g</span>
                                                <span className="food-macro-label">Fats</span>
                                            </div>
                                        </div>

                                        <button className="btn-primary btn-full" onClick={() => handleAddFood(imageResult)}>
                                            Add to {mealLabels[mealType]}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
