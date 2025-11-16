import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { MainInterface } from './components/MainInterface';
import { RatingInterface } from './components/RatingInterface';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<'login' | 'main' | 'rating' | 'admin'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView('main');
  };

  const handleRateItem = (item: any) => {
    setSelectedItem(item);
    setCurrentView('rating');
  };

  const handleBackToMain = () => {
    setCurrentView('main');
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      {isLoggedIn && (
        <nav className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-blue-600">Peli</h1>
              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentView('main')}
                  className={`px-4 py-2 rounded-lg ${
                    currentView === 'main' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Menu
                </button>
                <button
                  onClick={() => setCurrentView('admin')}
                  className={`px-4 py-2 rounded-lg ${
                    currentView === 'admin' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">kyue@seas.upenn.edu</span>
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setCurrentView('login');
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      {currentView === 'login' && <LoginPage onLogin={handleLogin} />}
      {currentView === 'main' && <MainInterface onRateItem={handleRateItem} />}
      {currentView === 'rating' && (
        <RatingInterface item={selectedItem} onBack={handleBackToMain} onSubmit={handleBackToMain} />
      )}
      {currentView === 'admin' && <AdminDashboard />}
    </div>
  );
}
