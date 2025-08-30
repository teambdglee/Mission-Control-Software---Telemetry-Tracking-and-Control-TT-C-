import React, { useState, useEffect } from 'react';
import Widget from '../shared/Widget';
import StatusIndicator from '../shared/StatusIndicator';
import { SatelliteStatus } from '../../types';

const ML_ALGORITHMS = [
    'Magnetic Anomaly Detection',
    'Subsurface Deposit Prediction',
    'Regolith Composition Analysis',
];

const DATA_LAYERS = [
    'Magnetic Field Strength',
    'Subsurface Water Ice',
    'Ilmenite Deposits',
    'Topographical Overlay',
];

const LunarGlobe: React.FC<{isScanning: boolean}> = ({ isScanning }) => {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
             <style>
                {`
                @keyframes spin {
                    from { transform: rotateY(0deg); }
                    to { transform: rotateY(360deg); }
                }
                @keyframes scan {
                    0% { transform: translateY(-100%); opacity: 0; }
                    10%, 90% { opacity: 1; }
                    100% { transform: translateY(100%); opacity: 0; }
                }
                .globe-transform {
                    transform-style: preserve-3d;
                    animation: spin 40s linear infinite;
                }
                .scan-line {
                    position: absolute;
                    width: 100%;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.7), transparent);
                    box-shadow: 0 0 10px rgba(34, 211, 238, 1);
                    animation: scan 4s ease-in-out infinite;
                }
                `}
            </style>
            <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Globe Background */}
                <circle cx="100" cy="100" r="90" fill="none" stroke="#30363d" strokeWidth="1" />
                
                {/* Grid Lines */}
                {Array.from({ length: 12 }).map((_, i) => (
                    <ellipse key={`lat-${i}`} cx="100" cy="100" rx={Math.cos(i * Math.PI / 24) * 90} ry="90" fill="none" stroke="#30363d" strokeWidth="0.5" transform={`rotate(${i*15} 100 100)`} />
                ))}
                 {Array.from({ length: 12 }).map((_, i) => (
                    <ellipse key={`lon-${i}`} cx="100" cy="100" rx="90" ry={Math.cos(i * Math.PI / 24) * 90} fill="none" stroke="#30363d" strokeWidth="0.5" />
                ))}

                 {/* Anomaly Markers */}
                <circle cx="130" cy="70" r="2" fill="#f87171" className="opacity-80" />
                <circle cx="80" cy="140" r="2.5" fill="#fbbf24" className="opacity-90" />
                <circle cx="150" cy="130" r="1.5" fill="#34d399" className="opacity-70" />
            </svg>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-full">
                {isScanning && <div className="scan-line"></div>}
            </div>
        </div>
    );
};

const DigitalTwin: React.FC = () => {
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(ML_ALGORITHMS[0]);
    const [activeLayers, setActiveLayers] = useState<string[]>([DATA_LAYERS[0], DATA_LAYERS[3]]);
    const [status, setStatus] = useState<SatelliteStatus>(SatelliteStatus.NOMINAL);
    const [findings, setFindings] = useState<string>('System ready. Select an algorithm and run analysis.');
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const handleLayerToggle = (layer: string) => {
        setActiveLayers(prev => 
            prev.includes(layer) ? prev.filter(l => l !== layer) : [...prev, layer]
        );
    };

    const runAnalysis = () => {
        setIsProcessing(true);
        setStatus(SatelliteStatus.WARNING);
        setFindings(`Processing data with "${selectedAlgorithm}"...\nAnalyzing layers: ${activeLayers.join(', ')}`);
        
        setTimeout(() => {
            setStatus(SatelliteStatus.NOMINAL);
            // Mock findings based on algorithm
            let result = '';
            switch (selectedAlgorithm) {
                case ML_ALGORITHMS[0]:
                    result = "Analysis complete. High-confidence magnetic anomaly detected at coordinates 78.5S, 112.0E. Potential for significant metallic deposits. Recommend cross-referencing with Subsurface Ice Mapper data.";
                    break;
                case ML_ALGORITHMS[1]:
                     result = "Prediction model suggests a 78% probability of water ice deposits at depths of 1.5-3 meters in the de Gerlache crater region, correlating with magnetic field dampening.";
                    break;
                case ML_ALGORITHMS[2]:
                     result = "Composition analysis indicates high concentrations of Ilmenite (~12%) mixed with standard regolith in the Shackleton rim area. Ideal for future ISRU oxygen extraction.";
                    break;
                default:
                    result = "Analysis complete. No significant findings to report."
            }
            setFindings(result);
            setIsProcessing(false);
        }, 4000);
    };


    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            <div className="lg:col-span-2 h-full">
                <Widget title="Lunar South Pole - Magnetic Imaging" className="h-full">
                    <LunarGlobe isScanning={isProcessing} />
                </Widget>
            </div>
            <div className="space-y-6">
                <Widget title="Analysis & Controls">
                     <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-400 block mb-2">ML Algorithm</label>
                            <select 
                                value={selectedAlgorithm} 
                                onChange={e => setSelectedAlgorithm(e.target.value)}
                                className="w-full bg-dashboard-bg border border-border-color rounded p-2 text-gray-300 focus:ring-accent-cyan focus:border-accent-cyan"
                            >
                                {ML_ALGORITHMS.map(alg => <option key={alg} value={alg}>{alg}</option>)}
                            </select>
                        </div>
                        <div>
                             <label className="text-sm font-medium text-gray-400 block mb-2">Data Layers</label>
                             <div className="grid grid-cols-2 gap-2">
                                {DATA_LAYERS.map(layer => (
                                    <label key={layer} className="flex items-center space-x-2 text-sm text-gray-300">
                                        <input 
                                            type="checkbox" 
                                            checked={activeLayers.includes(layer)} 
                                            onChange={() => handleLayerToggle(layer)}
                                            className="form-checkbox h-4 w-4 bg-dashboard-bg border-border-color rounded text-accent-cyan focus:ring-accent-cyan"
                                        />
                                        <span>{layer}</span>
                                    </label>
                                ))}
                             </div>
                        </div>
                        <button 
                            onClick={runAnalysis}
                            disabled={isProcessing}
                            className="w-full bg-nasa-blue hover:bg-blue-800 text-white font-bold py-2 px-4 rounded disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                        >
                            {isProcessing ? 'Processing...' : 'Run Analysis'}
                        </button>
                    </div>
                </Widget>
                <Widget title="ML Model Status">
                    <div className="space-y-3">
                        <StatusIndicator status={status} label={isProcessing ? "Analyzing..." : "Idle"} />
                        <div>
                            <h4 className="font-semibold text-gray-300 mb-1">Key Findings:</h4>
                            <div className="h-48 bg-dashboard-bg rounded p-2 overflow-y-auto">
                                <p className="text-sm text-gray-400 whitespace-pre-wrap">{findings}</p>
                            </div>
                        </div>
                    </div>
                </Widget>
            </div>
        </div>
    );
};

export default DigitalTwin;
