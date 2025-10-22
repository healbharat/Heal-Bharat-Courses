export interface User {
  name: string;
  email: string;
  isPremium: boolean;
}

// A single quiz question (Kept for Aptitude Practice)
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface CourseSectionQuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface CourseSection {
  id: string;
  title: string;
  duration: string;
  youtubeId: string;
  description: string;
  quiz: CourseSectionQuizQuestion[];
}


// A single coding problem for practice
export interface CodingProblem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  description: string; // Markdown for detailed explanation
  starterCode: string; // Default code to show in the editor
  functionName: string; // The name of the function to call for testing
  examples: Array<{
    input: any[]; // Array of arguments for the function
    inputText: string; // The string representation for display
    output: string; // Expected output as a string for comparison
    explanation?: string;
  }>;
}

// A single chat message for the AI Chatbot
export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
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
  AI_CHATBOT,
  
  // Sub-view for the coding solver
  CODING_SOLVER,

  // Heal Bharat Course
  PYTHON_COURSE,
  CERTIFICATE,
}