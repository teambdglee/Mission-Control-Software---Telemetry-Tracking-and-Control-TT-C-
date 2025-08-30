
import React, { useState, useCallback } from 'react';
import LoginPage from './components/LoginPage';
import MissionControl from './components/MissionControl';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLogin = useCallback((id: string, passcode: string): boolean => {
    // In a real application, this would involve an API call.
    // For this demo, we'll use a simple check.
    if (id === 'GLEE_BD_OPS' && passcode === 'LUNAR_GATEWAY_24') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  return (
    <div className="min-h-screen bg-dashboard-bg text-gray-200 font-sans">
      {isAuthenticated ? (
        <MissionControl onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
