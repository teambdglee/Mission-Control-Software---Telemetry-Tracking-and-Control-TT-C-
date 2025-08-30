
import { User, UserRole } from './types';

export const MISSION_EPOCH = new Date('2024-10-31T00:00:00Z').getTime();

export const INITIAL_USERS: User[] = [
  { id: 1, name: 'Dr. Anika Rahman', role: UserRole.FLIGHT_DIRECTOR, accessLevel: 5 },
  { id: 2, name: 'Zayan Chowdhury', role: UserRole.OPERATOR, accessLevel: 4 },
  { id: 3, name: 'Farah Hossain', role: UserRole.SCIENTIST, accessLevel: 3 },
  { id: 4, name: 'Guest User', role: UserRole.GUEST, accessLevel: 1 },
];

export const INSTRUMENT_NAMES = [
    'Lunar Regolith Spectrometer (LRS)',
    'Subsurface Ice Mapper (SIM)',
    'Plasma & Dust Analyzer (PDA)',
    'High-Gain Antenna (HGA)',
    'Solar Array Imager (SAI)',
    'Thermal Radiometer (TRM)',
    'Inertial Measurement Unit (IMU)',
    'Radiation Monitor (RM)',
];

export const KEY_INSTRUMENTS = [
    { name: 'LRS', power: 410 },
    { name: 'SIM', power: 320 },
    { name: 'PDA', power: 290 },
    { name: 'HGA', power: 210 },
    { name: 'Comms', power: 180 },
];

export const generateMockChartData = (points: number) => {
    return Array.from({ length: points }, (_, i) => ({
      time: `T+${i * 5}s`,
      value: Math.random() * 100 + Math.sin(i / 10) * 20,
    }));
};
