import { useState } from 'react';
import { NutritionProvider } from './context/NutritionContext';
import Header from './components/Header';
import SummaryCard from './components/SummaryCard';
import MacroRow from './components/MacroRow';
import MealCards from './components/MealCards';
import BottomNav from './components/BottomNav';
import LogModal from './components/LogModal';
import GoalModal from './components/GoalModal';
import ProgressPage from './pages/ProgressPage';
import ExercisePage from './pages/ExercisePage';
import './App.css';

function AppContent() {
  const [activeTab, setActiveTab] = useState('home');
  const [logMealType, setLogMealType] = useState(null);
  const [showGoalModal, setShowGoalModal] = useState(false);

  return (
    <div className="app">
      {activeTab === 'home' && (
        <>
          <Header />
          <SummaryCard onEditGoal={() => setShowGoalModal(true)} />
          <MacroRow />
          <MealCards onLogMeal={(type) => setLogMealType(type)} />
        </>
      )}

      {activeTab === 'progress' && <ProgressPage />}
      {activeTab === 'exercise' && <ExercisePage />}

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {logMealType && (
        <LogModal
          mealType={logMealType}
          onClose={() => setLogMealType(null)}
        />
      )}

      {showGoalModal && (
        <GoalModal onClose={() => setShowGoalModal(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <NutritionProvider>
      <AppContent />
    </NutritionProvider>
  );
}
