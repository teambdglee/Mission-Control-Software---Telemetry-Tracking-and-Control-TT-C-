export enum UserRole {
  FLIGHT_DIRECTOR = 'Flight Director',
  OPERATOR = 'Operator',
  SCIENTIST = 'Scientist',
  GUEST = 'Guest',
}

export interface User {
  id: number;
  name: string;
  role: UserRole;
  accessLevel: number;
}

export enum SatelliteStatus {
  NOMINAL = 'Nominal',
  WARNING = 'Warning',
  CRITICAL = 'Critical',
  OFFLINE = 'Offline',
}

export interface SatelliteHealth {
  power: {
    level: number; // percentage
    status: SatelliteStatus;
  };
  temperature: {
    level: number; // Celsius
    status: SatelliteStatus;
  };
  signal: {
    strength: number; // dBm
    status: SatelliteStatus;
  };
}

export interface InstrumentDataPoint {
  time: string;
  value: number;
}

export type ViewType = 'dashboard' | 'cpanel' | 'observation' | 'prediction' | 'digitaltwin';