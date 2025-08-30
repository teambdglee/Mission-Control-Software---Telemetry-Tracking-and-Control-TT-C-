import React, { useState } from 'react';
import { LayoutDashboard, SlidersHorizontal, BarChart2, BrainCircuit, LogOut, Globe } from 'lucide-react';
import { ViewType } from '../types';
import Dashboard from './views/Dashboard';
import ControlPanel from './views/ControlPanel';
import Observation from './views/Observation';
import Prediction from './views/Prediction';
import DigitalTwin from './views/DigitalTwin';
import NasaLogo from './shared/NasaLogo';

interface MissionControlProps {
  onLogout: () => void;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-3 w-full px-3 py-3 rounded-md transition-colors duration-200 ${
      isActive ? 'bg-nasa-blue text-white' : 'text-gray-400 hover:bg-widget-bg hover:text-white'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

const MissionControl: React.FC<MissionControlProps> = ({ onLogout }) => {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'cpanel':
        return <ControlPanel />;
      case 'observation':
        return <Observation />;
      case 'prediction':
        return <Prediction />;
      case 'digitaltwin':
        return <DigitalTwin />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-dashboard-bg">
      {/* Sidebar */}
      <aside className="w-64 bg-control-panel p-4 flex flex-col justify-between border-r border-border-color">
        <div>
          <div className="text-center mb-8">
            <NasaLogo />
            <h1 className="text-2xl font-bold text-white">GLEE</h1>
            <p className="text-sm text-gray-400">MISSION CONTROL</p>
          </div>
          <nav className="space-y-2">
            <NavItem
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              isActive={activeView === 'dashboard'}
              onClick={() => setActiveView('dashboard')}
            />
            <NavItem
              icon={<SlidersHorizontal size={20} />}
              label="C-Panel"
              isActive={activeView === 'cpanel'}
              onClick={() => setActiveView('cpanel')}
            />
            <NavItem
              icon={<BarChart2 size={20} />}
              label="Observation"
              isActive={activeView === 'observation'}
              onClick={() => setActiveView('observation')}
            />
            <NavItem
              icon={<BrainCircuit size={20} />}
              label="Prediction"
              isActive={activeView === 'prediction'}
              onClick={() => setActiveView('prediction')}
            />
            <NavItem
              icon={<Globe size={20} />}
              label="Digital Twin"
              isActive={activeView === 'digitaltwin'}
              onClick={() => setActiveView('digitaltwin')}
            />
          </nav>
        </div>
        <div>
           <button
            onClick={onLogout}
            className="flex items-center space-x-3 w-full px-3 py-3 rounded-md text-gray-400 hover:bg-nasa-red hover:text-white transition-colors duration-200"
           >
            <LogOut size={20} />
            <span className="font-medium">Disconnect</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-control-panel p-4 border-b border-border-color text-right">
            <span className="text-sm text-gray-300">Operator: <span className="font-semibold text-accent-cyan">Zahid Hasan Shovon (FLIGHT)</span></span>
        </header>
        <div className="flex-1 p-6 overflow-y-auto">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default MissionControl;