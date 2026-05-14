export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  level: string;
  duration: string;
  instructor: string;
  icon?: string;
  logoSize?: number;
  logoWidth?: number;
  logoHeight?: number;
  content?: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  instructions?: string;
  challenge?: string;
  initialCode?: string;
  solution?: string;
  duration?: string;
}

export interface CourseProgress {
  courseName: string;
  progress: number;
  lastLesson: string;
}

export interface StudentActivity {
  id: string;
  studentName: string;
  action: string;
  timestamp: string;
}

export interface Student {
  id: string | number;
  name: string;
  email: string;
  code?: string;
  courses_progress?: Record<string, number>;
  progress?: number;
  lastActivity?: string;
}

export interface DataStructure {
  courses: Course[];
  students: Student[];
}
