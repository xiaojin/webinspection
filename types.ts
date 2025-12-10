export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'action' | 'warning' | 'error';
}

export enum TestType {
  STANDARD = 'STANDARD',
  NAMED = 'NAMED',
  POPUP = 'POPUP',
  SELF = 'SELF',
  STRESS = 'STRESS',
}