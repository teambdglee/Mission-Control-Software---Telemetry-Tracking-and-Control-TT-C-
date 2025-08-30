
import React, { useState } from 'react';
import Widget from '../shared/Widget';
import KillSwitchButton from '../shared/KillSwitchButton';
import { User, UserRole } from '../../types';
import { INITIAL_USERS } from '../../constants';
import { Users, Trash2, Edit } from 'lucide-react';

const ControlPanel: React.FC = () => {
    const [users, setUsers] = useState<User[]>(INITIAL_USERS);
    const [isDbConnected, setIsDbConnected] = useState<boolean>(true);
    const [cliInput, setCliInput] = useState<string>('');
    const [cliHistory, setCliHistory] = useState<string[]>(['GLEE Mission Control CLI v1.0', 'Type "help" for a list of commands.']);

    const handleCliSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newHistory = [...cliHistory, `> ${cliInput}`];
        // Mock command processing
        switch (cliInput.toLowerCase()) {
            case 'help':
                newHistory.push('Commands: status, clear, reboot --subsystem [pwr|comms]');
                break;
            case 'status':
                newHistory.push('System status: NOMINAL. All subsystems functional.');
                break;
            case 'clear':
                setCliHistory([]);
                return;
            case 'reboot --subsystem pwr':
                newHistory.push('Executing reboot on power subsystem... Command acknowledged.');
                break;
            default:
                newHistory.push(`Error: Command not recognized: "${cliInput}"`);
        }
        setCliHistory(newHistory);
        setCliInput('');
    };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <Widget title="Manage Users">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-400">
                        <thead className="text-xs text-gray-300 uppercase bg-widget-bg">
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Role</th>
                                <th scope="col" className="px-6 py-3">Access Level</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="border-b border-border-color hover:bg-dashboard-bg">
                                    <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                                    <td className="px-6 py-4">{user.role}</td>
                                    <td className="px-6 py-4">{user.accessLevel}</td>
                                    <td className="px-6 py-4 flex space-x-2">
                                        <button className="text-blue-400 hover:text-blue-300"><Edit size={16} /></button>
                                        <button className="text-red-500 hover:text-red-400"><Trash2 size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Widget>
            <Widget title="Command Line Interface">
                <div className="h-64 bg-black rounded p-2 font-mono text-sm flex flex-col">
                    <div className="flex-grow overflow-y-auto">
                        {cliHistory.map((line, i) => <p key={i} className={line.startsWith('>') ? 'text-green-400' : 'text-gray-300'}>{line}</p>)}
                    </div>
                    <form onSubmit={handleCliSubmit}>
                        <div className="flex items-center">
                            <span className="text-green-400 mr-2">{'>'}</span>
                            <input
                                type="text"
                                value={cliInput}
                                onChange={(e) => setCliInput(e.target.value)}
                                className="w-full bg-transparent outline-none text-green-400"
                                autoFocus
                            />
                        </div>
                    </form>
                </div>
            </Widget>
        </div>
        <div className="space-y-6">
            <Widget title="System Controls">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="font-medium">Data Gateway</span>
                         <label className="inline-flex relative items-center cursor-pointer">
                            <input type="checkbox" checked={isDbConnected} onChange={() => setIsDbConnected(!isDbConnected)} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                            <span className="ml-3 text-sm font-medium">{isDbConnected ? 'Connected' : 'Disconnected'}</span>
                        </label>
                    </div>
                     <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
                        Export Mission Log
                    </button>
                </div>
            </Widget>
             <Widget title="Instrument Control Unit">
                <div className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-400">HGA Power Level</label>
                        <input type="range" min="0" max="100" defaultValue="75" className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                    </div>
                    <div>
                        <label className="text-sm text-gray-400">SIM Scan Depth</label>
                        <input type="range" min="0" max="10" defaultValue="5" className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                    </div>
                </div>
            </Widget>
            <Widget title="Emergency Protocol">
                <KillSwitchButton />
            </Widget>
        </div>
    </div>
  );
};

export default ControlPanel;
