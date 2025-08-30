
import React, { useState } from 'react';
import { Power } from 'lucide-react';

const KillSwitchButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isEngaged, setIsEngaged] = useState(false);

  const correctCode = "GLEE_TERMINATE_ALPHA";

  const handleEngage = () => {
    if (confirmationCode === correctCode) {
        setIsEngaged(true);
        // In a real app, this would send a critical command.
        console.log("KILL SWITCH ENGAGED. MISSION TERMINATED.");
        setTimeout(() => setIsModalOpen(false), 2000);
    } else {
        alert("Incorrect confirmation code.");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full flex items-center justify-center space-x-2 bg-red-800 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg border-2 border-red-600"
      >
        <Power size={24} />
        <span>ENGAGE KILL SWITCH</span>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-control-panel border-2 border-red-500 rounded-lg p-8 max-w-lg w-full text-center">
            <h2 className="text-3xl font-bold text-red-500 mb-4">CRITICAL ACTION REQUIRED</h2>
            <p className="text-gray-300 mb-6">
              You are about to engage the mission termination sequence. This action is irreversible and will result in the complete shutdown of all satellite systems.
            </p>
            <p className="text-gray-400 mb-4">
              To confirm, type the authorization code: <strong className="text-white font-mono">{correctCode}</strong>
            </p>
            <input
              type="text"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              className="w-full bg-gray-900 border border-border-color rounded px-4 py-2 text-center font-mono text-white mb-6"
              placeholder="Enter confirmation code"
            />
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded"
              >
                ABORT
              </button>
              <button
                onClick={handleEngage}
                disabled={confirmationCode !== correctCode}
                className={`font-bold py-2 px-6 rounded ${
                  confirmationCode === correctCode
                    ? 'bg-red-600 hover:bg-red-500 text-white'
                    : 'bg-red-900 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isEngaged ? "TERMINATED" : "CONFIRM TERMINATION"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default KillSwitchButton;
