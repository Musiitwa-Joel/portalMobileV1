export interface ScheduleEvent {
  id: string;
  time: string;
  title: string;
  participants?: Array<{
    id: string;
    avatar: string;
  }>;
}

export interface ReminderItem {
  id: string;
  title: string;
  timeRange: string;
}

export interface DayItem {
  date: number;
  day: string;
  isSelected?: boolean;
}

export interface FormData {
  program: string;
  reason: string;
}

// Keep other type definitions as they were
export interface ThemeColors {
  background: string;
  text: string;
  border: string;
  primary: string;
}
