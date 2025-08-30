
import React, { useState } from 'react';
import { ShieldCheck, LogIn } from 'lucide-react';

interface LoginPageProps {
  onLogin: (id: string, passcode: string) => boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [id, setId] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onLogin(id, passcode)) {
      setError('Invalid ID or Passcode. Access Denied.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-widget-bg rounded-lg shadow-2xl border border-border-color">
        <div className="text-center">
            <ShieldCheck className="mx-auto h-16 w-16 text-accent-cyan" />
            <h1 className="text-2xl font-bold text-white mt-4">GLEE Mission Control</h1>
            <p className="text-gray-400">Bangladesh Mission Team</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="id" className="block text-sm font-medium text-gray-400">
              Operator ID
            </label>
            <input
              id="id"
              name="id"
              type="text"
              autoComplete="username"
              required
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-dashboard-bg border border-border-color rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-accent-cyan focus:border-accent-cyan"
              placeholder="GLEE_BD_OPS"
            />
          </div>
          <div>
            <label htmlFor="passcode" className="block text-sm font-medium text-gray-400">
              Passcode
            </label>
            <input
              id="passcode"
              name="passcode"
              type="password"
              autoComplete="current-password"
              required
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-dashboard-bg border border-border-color rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-accent-cyan focus:border-accent-cyan"
              placeholder="••••••••••••••••"
            />
          </div>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-nasa-blue hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dashboard-bg focus:ring-accent-cyan"
            >
              <LogIn className="mr-2 h-5 w-5" />
              Establish Connection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
