export interface Team {
  id: string;
  name: string;
  description: string;
  patients: number;
  compliance: number;
  symptomsHigh: number;
  symptomsModerate: number;
  symptomsLow: number;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  compliance: number;
  lastReading: string;
  vitals: {
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    oxygenSat: number;
  };
}

export interface HealthMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  scheduled: boolean;
  taken: boolean;
  nextDose: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  type: 'patient' | 'nurse' | 'system';
}

export const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Cardiac Care Unit',
    description: 'Specialized cardiac monitoring and care team',
    patients: 45,
    compliance: 89,
    symptomsHigh: 3,
    symptomsModerate: 12,
    symptomsLow: 30
  },
  {
    id: '2',
    name: 'Diabetes Management',
    description: 'Comprehensive diabetes monitoring and education',
    patients: 78,
    compliance: 92,
    symptomsHigh: 5,
    symptomsModerate: 18,
    symptomsLow: 55
  },
  {
    id: '3',
    name: 'Hypertension Clinic',
    description: 'Blood pressure monitoring and medication management',
    patients: 134,
    compliance: 76,
    symptomsHigh: 8,
    symptomsModerate: 31,
    symptomsLow: 95
  },
  {
    id: '4',
    name: 'Chronic Pain Unit',
    description: 'Pain management and quality of life improvement',
    patients: 56,
    compliance: 83,
    symptomsHigh: 12,
    symptomsModerate: 24,
    symptomsLow: 20
  }
];

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'John Smith',
    age: 65,
    condition: 'Hypertension',
    riskLevel: 'Medium',
    compliance: 87,
    lastReading: '2 hours ago',
    vitals: {
      bloodPressure: '140/90',
      heartRate: 78,
      temperature: 98.6,
      oxygenSat: 97
    }
  },
  {
    id: '2',
    name: 'Maria Garcia',
    age: 52,
    condition: 'Type 2 Diabetes',
    riskLevel: 'High',
    compliance: 94,
    lastReading: '30 minutes ago',
    vitals: {
      bloodPressure: '130/85',
      heartRate: 82,
      temperature: 99.1,
      oxygenSat: 98
    }
  },
  {
    id: '3',
    name: 'Robert Johnson',
    age: 71,
    condition: 'Heart Failure',
    riskLevel: 'High',
    compliance: 76,
    lastReading: '1 hour ago',
    vitals: {
      bloodPressure: '110/70',
      heartRate: 95,
      temperature: 98.2,
      oxygenSat: 94
    }
  }
];

export const mockHealthMetrics: HealthMetric[] = [
  {
    id: '1',
    name: 'Blood Pressure',
    value: 140,
    unit: 'mmHg',
    status: 'warning',
    trend: 'up',
    lastUpdated: '2 hours ago'
  },
  {
    id: '2',
    name: 'Heart Rate',
    value: 78,
    unit: 'bpm',
    status: 'normal',
    trend: 'stable',
    lastUpdated: '2 hours ago'
  },
  {
    id: '3',
    name: 'Blood Glucose',
    value: 145,
    unit: 'mg/dL',
    status: 'warning',
    trend: 'down',
    lastUpdated: '3 hours ago'
  },
  {
    id: '4',
    name: 'Oxygen Saturation',
    value: 97,
    unit: '%',
    status: 'normal',
    trend: 'stable',
    lastUpdated: '2 hours ago'
  }
];

export const mockMedications: Medication[] = [
  {
    id: '1',
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    scheduled: true,
    taken: true,
    nextDose: '8:00 AM tomorrow'
  },
  {
    id: '2',
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    scheduled: true,
    taken: false,
    nextDose: '6:00 PM today'
  },
  {
    id: '3',
    name: 'Atorvastatin',
    dosage: '20mg',
    frequency: 'Once daily',
    scheduled: true,
    taken: true,
    nextDose: '9:00 PM today'
  }
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'John Smith',
    message: 'I\'ve been feeling a bit dizzy this morning.',
    timestamp: '10:30 AM',
    type: 'patient'
  },
  {
    id: '2',
    sender: 'Nurse Sarah',
    message: 'Let me check your latest readings. Have you taken your morning medication?',
    timestamp: '10:32 AM',
    type: 'nurse'
  },
  {
    id: '3',
    sender: 'John Smith',
    message: 'Yes, I took it at 8 AM as scheduled.',
    timestamp: '10:33 AM',
    type: 'patient'
  },
  {
    id: '4',
    sender: 'System',
    message: 'Blood pressure reading recorded: 145/92 mmHg',
    timestamp: '10:35 AM',
    type: 'system'
  }
];