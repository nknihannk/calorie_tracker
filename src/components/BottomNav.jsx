import './BottomNav.css';

const tabs = [
    {
        id: 'home',
        label: 'Home',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
    },
    {
        id: 'progress',
        label: 'Progress',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
        ),
    },
    {
        id: 'exercise',
        label: 'Exercise',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                <path d="M6 8H5a4 4 0 0 0 0 8h1" />
                <line x1="6" y1="12" x2="18" y2="12" />
                <line x1="8" y1="8" x2="8" y2="16" />
                <line x1="16" y1="8" x2="16" y2="16" />
            </svg>
        ),
    },
];

export default function BottomNav({ activeTab, onTabChange }) {
    return (
        <nav className="bottom-nav glass-card">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => onTabChange(tab.id)}
                >
                    <div className="nav-icon-wrap">
                        {tab.icon}
                        {activeTab === tab.id && <div className="nav-indicator"></div>}
                    </div>
                    <span className="nav-label">{tab.label}</span>
                </button>
            ))}
        </nav>
    );
}
