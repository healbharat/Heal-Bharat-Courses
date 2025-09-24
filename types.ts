export interface User {
  name: string;
}

// A single lesson/day within a course
export interface CourseDay {
  day: number;
  topic: string;
  module: string; // Module name is now generic
  notes: string; // Static markdown content
  videoUrl?: string; // Optional URL for an embedded video lesson
  challenge: {
    title: string;
    description: string;
  };
  isProject?: boolean;
}

// A single quiz question
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

// A full course
export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string; // Reference to the icon component name
  badge: string; // Badge component name for completion
  imageUrl: string;
  structure: CourseDay[];
  quiz: QuizQuestion[];
}

// The different views the user can be in within the dashboard
export enum View {
  COURSE_SELECTION,
  COURSE_CONTENT,
  QUIZ,
  CERTIFICATE,
}

// A message in the AI Tutor chat
export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}