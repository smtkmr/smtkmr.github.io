export interface SessionRecord {
  id: string;
  name: string;
  day: string;
  entryTime: string;
  prepareIndexTime: string;
  prepareIndexTimestamp: number;
  exitTime?: string;
  exitTrigger?: 'screen_switch' | 'window_blur' | 'tab_hidden' | 'completed' | 'manual_exit';
  exitTriggerReason?: string;
  screenTimeSeconds: number;
  screenTimeFormatted: string;
  firstAttemptTotal: number;
  firstAttemptCorrect: number;
  firstAttemptWrong: number;
  accuracy: number;
  sessionStatus: 'active' | 'screen_switched_closed' | 'completed';
  createdAt: string;
  updatedAt?: string;
}

export interface FirstAttemptEntry {
  questionId: number | string;
  type: 'concept' | 'test';
  selectedOption: number;
  correctOption: number;
  isCorrect: boolean;
  answeredAt: string;
}

export interface ConceptQuestion {
  id: number;
  sub: string;
  q: string;
  hi: string;
  opts: string[];
  ans: number;
  expl: string;
}

export interface TestQuestion {
  id: number;
  unit: 'kinds' | 'agreement' | 'position' | 'traps' | 'order';
  label: string;
  q: string;
  hi: string;
  opts: string[];
  ans: number;
  expl: string;
}
