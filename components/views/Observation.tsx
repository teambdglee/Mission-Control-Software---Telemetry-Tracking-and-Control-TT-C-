
import React, { useState, useEffect, useCallback } from 'react';
import Widget from '../shared/Widget';
import { KEY_INSTRUMENTS } from '../../constants';
import { getCorrelationAnalysis } from '../../services/geminiService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, Cell } from 'recharts';
import { Thermometer, Gauge, Zap, Signal, Sun, Activity, Magnet, Waves, Scale, BrainCircuit, ChevronDown, ChevronUp } from 'lucide-react';

// --- Reusable Components defined locally ---
const StatItem: React.FC<{ icon: React.ReactNode, label: string, value: string | number, unit: string, color?: string }> = ({ icon, label, value, unit, color = 'text-gray-300' }) => (
    <div className="flex items-center space-x-2 text-sm">
        <div className="text-gray-500">{icon}</div>
        <span className="text-gray-400 flex-1">{label}</span>
        <span className={`font-mono font-semibold ${color}`}>{value}</span>
        <span className="text-gray-500 w-8">{unit}</span>
    </div>
);

interface MultiLineDataPoint { time: string; x: number; y: number; z: number; }
const MultiLineDataChart: React.FC<{ data: MultiLineDataPoint[] }> = ({ data }) => (
    <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
            <XAxis dataKey="time" stroke="#888" style={{ fontSize: '10px' }} tick={{ fill: '#a0aec0' }} interval={5} />
            <YAxis stroke="#888" style={{ fontSize: '10px' }} tick={{ fill: '#a0aec0' }} />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(22, 27, 34, 0.8)', borderColor: '#30363d' }} labelStyle={{ color: '#8b949e' }} />
            <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} iconSize={10} />
            <Line type="monotone" dataKey="x" name="X" stroke="#f87171" dot={false} />
            <Line type="monotone" dataKey="y" name="Y" stroke="#34d399" dot={false} />
            <Line type="monotone" dataKey="z" name="Z" stroke="#60a5fa" dot={false} />
        </LineChart>
    </ResponsiveContainer>
);
// --- End of local components ---

const Observation: React.FC = () => {
    // State for all sensor data
    const [health, setHealth] = useState({ health: 98.7, power: 1250.5, temp: -18.3, latency: 134, packetLoss: 0.02, solar: 'Active' });
    const [sensorData, setSensorData] = useState({ temp: -18.3, capacitance: 1.23, solarWind: 450.1 });
    const [tempStats, setTempStats] = useState({ high: 5.2, low: -150.8, avg: -72.1, day: -10.5, night: -130.2 });
    const [quakeStats, setQuakeStats] = useState({ lastIntensity: 2.1, lastTime: 'T+012:08:15:22', highestIntensity: 4.3, nextTime: 'T+015:01:00:00 (Est)' });
    
    const [accelData, setAccelData] = useState<MultiLineDataPoint[]>([]);
    const [magnetoData, setMagnetoData] = useState<MultiLineDataPoint[]>([]);

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState('');
    const [analysisParams, setAnalysisParams] = useState({
        factor1: 'Temp-Increasing',
        factor2: 'Magnetic field-Decreasing',
        target: 'Radio Communication'
    });

    const generateAxisData = (time: number) => ({
        time: `+${time}s`,
        x: Math.sin(time / 10) * 5 + (Math.random() - 0.5) * 0.5,
        y: Math.cos(time / 10) * 5 + (Math.random() - 0.5) * 0.5,
        z: Math.sin(time / 5 + 1) * 3 + (Math.random() - 0.5) * 0.5,
    });

    // Simulate live data updates
    useEffect(() => {
        let time = 0;
        const interval = setInterval(() => {
            time++;
            setHealth(prev => ({...prev, power: prev.power + (Math.random() - 0.5) * 5, temp: prev.temp + (Math.random() - 0.5) * 0.1, latency: 134 + Math.random()*2, packetLoss: Math.max(0.01, prev.packetLoss + (Math.random() - 0.6) * 0.01)}));
            setSensorData(prev => ({...prev, temp: prev.temp + (Math.random() - 0.5) * 0.1, capacitance: 1.23 + (Math.random() - 0.5) * 0.01, solarWind: 450 + Math.random() * 20}));
            setAccelData(d => [...d.slice(-29), generateAxisData(time)]);
            setMagnetoData(d => [...d.slice(-29), { time: `+${time}s`, x: 50 + Math.cos(time/15)*5 + (Math.random()-0.5), y: 20 + Math.sin(time/15)*2 + (Math.random()-0.5), z: -30 + Math.cos(time/20)*3 + (Math.random()-0.5) }]);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleRunAnalysis = async () => {
        setIsAnalyzing(true);
        setAnalysisResult('Analyzing correlation... Please wait.');
        const { factor1, factor2, target } = analysisParams;
        const result = await getCorrelationAnalysis([factor1, factor2, target]);
        setAnalysisResult(result);
        setIsAnalyzing(false);
    };

    const factorOptions = [
        "Temp-Increasing", "Temp-Decreasing",
        "Magnetic field-Increasing", "Magnetic field-Decreasing",
        "Accelerometer-Increasing", "Accelerometer-Decreasing",
    ];

    const targetOptions = ["Radio Communication", "Magnetic field", "Power Systems"];

    return (
    <div className="grid grid-cols-12 gap-4">
        {/* Col 1: Health & Power */}
        <div className="col-span-12 lg:col-span-3 space-y-4">
            <Widget title="Overall Satellite Health">
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="text-5xl font-bold text-accent-green">{health.health.toFixed(1)}%</div>
                    <div className="text-sm text-gray-400">STATUS: NOMINAL</div>
                </div>
            </Widget>
            <Widget title="Health Parameters">
                <div className="space-y-2">
                    <StatItem icon={<Zap size={14}/>} label="Total Power" value={health.power.toFixed(1)} unit="W" color="text-accent-yellow"/>
                    <StatItem icon={<Thermometer size={14}/>} label="Internal Temp" value={health.temp.toFixed(1)} unit="°C" color={health.temp > 0 ? 'text-accent-red' : 'text-accent-cyan'}/>
                    <StatItem icon={<Signal size={14}/>} label="Latency" value={health.latency.toFixed(0)} unit="ms"/>
                    <StatItem icon={<Signal size={14}/>} label="Packet Loss" value={`${health.packetLoss.toFixed(2)}%`} unit=""/>
                    <StatItem icon={<Sun size={14}/>} label="Solar Panel" value={health.solar} unit="" color={health.solar === 'Active' ? 'text-accent-green' : 'text-accent-red'}/>
                </div>
            </Widget>
            <Widget title="Instrument Power (W)">
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={KEY_INSTRUMENTS} layout="vertical" margin={{top: 5, right: 10, left: -20, bottom: 5}}>
                        <XAxis type="number" hide />
                        <YAxis type="category" dataKey="name" stroke="#a0aec0" fontSize="12" width={50} />
                        <Tooltip cursor={{fill: '#30363d50'}} contentStyle={{ backgroundColor: 'rgba(22, 27, 34, 0.8)', borderColor: '#30363d' }}/>
                        <Bar dataKey="power" fill="#8884d8" background={{ fill: '#ffffff10' }}>
                            {KEY_INSTRUMENTS.map((entry, index) => (<Cell key={`cell-${index}`} fill={`hsl(200, 80%, ${60 - index*5}%)`}/>))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Widget>
        </div>

        {/* Col 2: Sensors */}
        <div className="col-span-12 lg:col-span-5 space-y-4">
            <Widget title="Accelerometer (m/s²)" className="h-64">
                <MultiLineDataChart data={accelData} />
            </Widget>
            <Widget title="Magnetometer (μT)" className="h-64">
                <MultiLineDataChart data={magnetoData} />
            </Widget>
             <Widget title="Sensor Telemetry">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-semibold text-gray-300 mb-2">Moonquake Monitoring</h4>
                        <StatItem icon={<Activity size={14}/>} label="Last Intensity" value={quakeStats.lastIntensity} unit="Richter"/>
                        <StatItem icon={<Activity size={14}/>} label="Last Event" value={quakeStats.lastTime} unit=""/>
                        <StatItem icon={<Activity size={14}/>} label="Highest Rec." value={quakeStats.highestIntensity} unit="Richter"/>
                        <StatItem icon={<Activity size={14}/>} label="Next (Est.)" value={quakeStats.nextTime.split(' ')[0]} unit=""/>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-300 mb-2">Environment</h4>
                        <StatItem icon={<Waves size={14}/>} label="Solar Wind" value={sensorData.solarWind.toFixed(1)} unit="km/s"/>
                        <StatItem icon={<Scale size={14}/>} label="Capacitance" value={sensorData.capacitance.toFixed(3)} unit="pF"/>
                        <StatItem icon={<Thermometer size={14}/>} label="Surface Temp" value={sensorData.temp.toFixed(1)} unit="°C"/>
                    </div>
                </div>
            </Widget>
        </div>

        {/* Col 3: Analysis */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
             <Widget title="Temperature Analysis (°C)">
                <div className="grid grid-cols-2 gap-2 text-center">
                    <div><p className="text-xs text-red-400">Highest</p><p className="font-mono text-lg">{tempStats.high}</p></div>
                    <div><p className="text-xs text-blue-400">Lowest</p><p className="font-mono text-lg">{tempStats.low}</p></div>
                    <div><p className="text-xs text-gray-400">Average</p><p className="font-mono text-lg">{tempStats.avg}</p></div>
                    <div><p className="text-xs text-yellow-400">Avg. Daytime</p><p className="font-mono text-lg">{tempStats.day}</p></div>
                    <div className="col-span-2"><p className="text-xs text-purple-400">Avg. Nighttime</p><p className="font-mono text-lg">{tempStats.night}</p></div>
                </div>
            </Widget>
            <Widget title="Cross-Correlation Analysis">
                <div className="space-y-3">
                     <p className="text-xs text-gray-400">Select two influencing factors and a target system to predict the outcome using the Gemini model.</p>
                    <div>
                        <label className="text-sm font-medium text-gray-300">Factor 1</label>
                        <select value={analysisParams.factor1} onChange={e => setAnalysisParams({...analysisParams, factor1: e.target.value})} className="w-full mt-1 bg-widget-bg border border-border-color rounded p-1.5 text-sm">
                            {factorOptions.map(o => <option key={o} value={o}>{o.replace('-', ' ')}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-300">Factor 2</label>
                        <select value={analysisParams.factor2} onChange={e => setAnalysisParams({...analysisParams, factor2: e.target.value})} className="w-full mt-1 bg-widget-bg border border-border-color rounded p-1.5 text-sm">
                            {factorOptions.filter(o => o !== analysisParams.factor1).map(o => <option key={o} value={o}>{o.replace('-', ' ')}</option>)}
                        </select>
                    </div>
                     <div>
                        <label className="text-sm font-medium text-gray-300">Target for Prediction</label>
                        <select value={analysisParams.target} onChange={e => setAnalysisParams({...analysisParams, target: e.target.value})} className="w-full mt-1 bg-widget-bg border border-border-color rounded p-1.5 text-sm">
                            {targetOptions.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                    </div>
                    <button onClick={handleRunAnalysis} disabled={isAnalyzing} className="w-full flex justify-center items-center py-2 px-4 rounded-md text-white bg-nasa-blue hover:bg-blue-800 disabled:bg-gray-600">
                        <BrainCircuit size={16} className="mr-2"/>{isAnalyzing ? "Analyzing..." : "Run AI Analysis"}
                    </button>
                    <div className="h-48 bg-dashboard-bg rounded p-2 overflow-y-auto mt-2">
                        <p className="text-sm text-gray-300 whitespace-pre-wrap font-sans">{analysisResult || "Awaiting analysis..."}</p>
                    </div>
                </div>
            </Widget>
        </div>
    </div>
  );
};

export default Observation;
