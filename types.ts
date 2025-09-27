export interface User {
  name: string;
  email: string;
  isPremium: boolean;
}

// A single lesson/day within a course
export interface CourseDay {
  day: number;
  topic: string;
  module: string; // Module name is now generic
  notes: string; // Static markdown content
  videoUrl?: string; // Optional URL for an embedded video lesson
  challenge: {
    title:string;
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

// A single coding problem for practice
export interface CodingProblem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  description: string; // Markdown for detailed explanation
  starterCode: string; // Default code to show in the editor
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
}

// The different views the user can be in within the dashboard
export enum View {
  // Main Dashboard Views
  DASHBOARD_HOME,
  COURSE_SELECTION,
  CODING_PRACTICE,
  INTERVIEW_PRACTICE,
  APTITUDE_PRACTICE,
  INTERNSHIP,
  
  // Sub-views within courses
  COURSE_CONTENT,
  QUIZ,
  CERTIFICATE,

  // New view for the coding solver
  CODING_SOLVER,
}

// A message in the AI Tutor chat
export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}