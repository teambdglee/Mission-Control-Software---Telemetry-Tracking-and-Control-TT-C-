
import React, { useState, useEffect } from 'react';
import Widget from '../shared/Widget';
import DataChart from '../shared/DataChart';
import { SatelliteStatus, SatelliteHealth } from '../../types';
import { useClocks } from '../../hooks/useClocks';
import { useMissionTimer } from '../../hooks/useMissionTimer';
import { INSTRUMENT_NAMES, generateMockChartData } from '../../constants';
import { Thermometer, Zap, Wifi } from 'lucide-react';

const HealthMetric: React.FC<{ icon: React.ReactNode; label: string; value: string; status: SatelliteStatus }> = ({ icon, label, value, status }) => {
    const statusColor = {
        [SatelliteStatus.NOMINAL]: 'text-accent-green',
        [SatelliteStatus.WARNING]: 'text-accent-yellow',
        [SatelliteStatus.CRITICAL]: 'text-accent-red',
        [SatelliteStatus.OFFLINE]: 'text-gray-500',
    }[status];

    return (
        <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full bg-widget-bg ${statusColor}`}>{icon}</div>
            <div>
                <p className="text-xs text-gray-400">{label}</p>
                <p className={`font-semibold text-lg ${statusColor}`}>{value}</p>
            </div>
        </div>
    );
};


const Dashboard: React.FC = () => {
    const clocks = useClocks();
    const missionTimer = useMissionTimer();
    const [health, setHealth] = useState<SatelliteHealth>({
        power: { level: 98, status: SatelliteStatus.NOMINAL },
        temperature: { level: -15, status: SatelliteStatus.NOMINAL },
        signal: { strength: -45, status: SatelliteStatus.NOMINAL },
    });

    useEffect(() => {
        // Simulate health changes
        const interval = setInterval(() => {
            setHealth(prev => ({
                power: { ...prev.power, level: Math.max(80, prev.power.level - Math.random() * 0.1) },
                temperature: { ...prev.temperature, level: prev.temperature.level + (Math.random() - 0.5) * 0.5 },
                signal: { ...prev.signal, strength: prev.signal.strength + (Math.random() - 0.5) * 0.2 },
            }));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const chartData = INSTRUMENT_NAMES.map(() => generateMockChartData(50));
    const chartColors = ['#22d3ee', '#34d399', '#fbbf24', '#f87171', '#a78bfa', '#fb923c', '#4ade80', '#60a5fa'];

    return (
        <div className="space-y-6">
            {/* Top Row: Status & Time */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Widget title="Satellite Health Status">
                    <div className="flex justify-around items-center h-full">
                         <HealthMetric icon={<Zap size={24} />} label="Power" value={`${health.power.level.toFixed(1)}%`} status={health.power.status} />
                         <HealthMetric icon={<Thermometer size={24} />} label="Core Temp" value={`${health.temperature.level.toFixed(1)}°C`} status={health.temperature.status} />
                         <HealthMetric icon={<Wifi size={24} />} label="Signal" value={`${health.signal.strength.toFixed(1)} dBm`} status={health.signal.status} />
                    </div>
                </Widget>
                <Widget title="Mission Timing">
                    <div className="flex flex-col justify-center h-full font-mono text-center">
                        <p className="text-3xl font-bold text-accent-cyan">{missionTimer}</p>
                        <p className="text-sm text-gray-400">MISSION DURATION</p>
                    </div>
                </Widget>
                <Widget title="Universal Time Coordinates">
                    <div className="grid grid-cols-2 gap-2 h-full font-mono text-center">
                        <div><p className="text-xs text-gray-400">UTC</p><p className="text-lg">{clocks.utc}</p></div>
                        <div><p className="text-xs text-gray-400">MOON (MET)</p><p className="text-lg">{clocks.moon.split(' ')[2]}</p></div>
                        <div><p className="text-xs text-gray-400">DHAKA (BDT)</p><p className="text-lg">{clocks.bangladesh}</p></div>
                        <div><p className="text-xs text-gray-400">HOUSTON (CDT)</p><p className="text-lg">{clocks.usa}</p></div>
                    </div>
                </Widget>
            </div>

            {/* Instrument Data Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {INSTRUMENT_NAMES.map((name, index) => (
                    <Widget title={name} key={index} className="h-64">
                        <DataChart data={chartData[index]} color={chartColors[index]} />
                    </Widget>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
