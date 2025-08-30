
import React, { useState } from 'react';
import Widget from '../shared/Widget';
import { getLunarPrediction } from '../../services/geminiService';
import { Sparkles } from 'lucide-react';

const Prediction: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('Based on GLEE subsurface ice mapping data, predict the viability of establishing a long-term human outpost near the Shackleton crater.');
    const [prediction, setPrediction] = useState<string>('');
    const [isLoading, setIsLoading] =useState<boolean>(false);

    const handleGeneratePrediction = async () => {
        if (!prompt) return;
        setIsLoading(true);
        setPrediction('');
        try {
            const result = await getLunarPrediction(prompt);
            setPrediction(result);
        } catch (error) {
            setPrediction('An error occurred while generating the prediction.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
                <Widget title="Predicting the Future of the Moon">
                    <div className="space-y-4">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            rows={5}
                            className="w-full bg-dashboard-bg border border-border-color rounded p-2 text-gray-300 focus:ring-accent-cyan focus:border-accent-cyan"
                            placeholder="Enter your query for predictive analysis..."
                        />
                        <button
                            onClick={handleGeneratePrediction}
                            disabled={isLoading}
                            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-nasa-blue hover:bg-blue-800 disabled:bg-gray-600 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Analyzing...' : <><Sparkles size={16} className="mr-2" /> Generate Prediction</>}
                        </button>
                    </div>
                </Widget>
                 <Widget title="Gemini AI Prediction Result">
                    <div className="h-96 overflow-y-auto p-2 bg-dashboard-bg rounded">
                        {isLoading && <p className="text-gray-400">Generating prediction, please wait...</p>}
                        {prediction && <pre className="text-gray-300 whitespace-pre-wrap font-sans">{prediction}</pre>}
                         {!isLoading && !prediction && <p className="text-gray-500">Prediction result will be displayed here.</p>}
                    </div>
                </Widget>
            </div>
            <div>
                 <Widget title="Comparative Analysis">
                    <div className="space-y-4 text-gray-400">
                        <h4 className="font-bold text-white">vs. Apollo Missions</h4>
                        <p>GLEE's regolith spectrometer offers 100x greater resolution than Apollo-era instruments, enabling precise identification of volatiles and minerals essential for ISRU (In-Situ Resource Utilization).</p>
                        
                        <h4 className="font-bold text-white">vs. Chandrayaan-3</h4>
                        <p>While Chandrayaan-3 confirmed the presence of sulfur, GLEE's Plasma & Dust Analyzer can differentiate between surface and exospheric plasma, providing critical data for understanding lunar weather and its impact on surface electronics.</p>

                        <h4 className="font-bold text-white">vs. Commercial Missions (Intuitive Machines, etc.)</h4>
                        <p>GLEE's mission focuses on long-duration scientific observation, contrasting with the primarily landing-and-delivery objectives of early commercial missions. GLEE's data on subsurface ice distribution will be foundational for future commercial resource extraction.</p>
                    </div>
                </Widget>
            </div>
        </div>
    );
};

export default Prediction;
