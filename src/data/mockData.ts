
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorId: string;
  price: number;
  image: string;
  rating: number;
  students: number;
  duration: string;
  category: string;
  level: string;
  modules: Module[];
  approved: boolean;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  videos: Video[];
  courseId: string;
}

export interface Video {
  id: string;
  title: string;
  youtubeUrl: string;
  duration: string;
  moduleId: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: Date;
  progress: number;
  completed: boolean;
  watchedVideos: string[];
}

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Complete React Development',
    description: 'Master React from basics to advanced concepts with hands-on projects',
    instructor: 'Sarah Johnson',
    instructorId: 'edu1',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
    rating: 4.8,
    students: 1247,
    duration: '12 hours',
    category: 'Technology',
    level: 'Intermediate',
    approved: true,
    modules: [
      {
        id: 'm1',
        title: 'Introduction to React',
        description: 'Getting started with React fundamentals',
        courseId: '1',
        videos: [
          {
            id: 'v1',
            title: 'What is React?',
            youtubeUrl: 'https://www.youtube.com/watch?v=dGcsHMXbSOA',
            duration: '10:30',
            moduleId: 'm1'
          },
          {
            id: 'v2',
            title: 'Setting up Development Environment',
            youtubeUrl: 'https://www.youtube.com/watch?v=dGcsHMXbSOA',
            duration: '15:20',
            moduleId: 'm1'
          },
          {
            id: 'v3',
            title: 'Creating Your First Component',
            youtubeUrl: 'https://www.youtube.com/watch?v=dGcsHMXbSOA',
            duration: '12:45',
            moduleId: 'm1'
          }
        ]
      },
      {
        id: 'm2',
        title: 'Advanced React Concepts',
        description: 'Learn hooks, context, and advanced patterns',
        courseId: '1',
        videos: [
          {
            id: 'v4',
            title: 'Understanding React Hooks',
            youtubeUrl: 'https://www.youtube.com/watch?v=dGcsHMXbSOA',
            duration: '18:30',
            moduleId: 'm2'
          },
          {
            id: 'v5',
            title: 'Context API Deep Dive',
            youtubeUrl: 'https://www.youtube.com/watch?v=dGcsHMXbSOA',
            duration: '22:15',
            moduleId: 'm2'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'JavaScript ES6+ Masterclass',
    description: 'Deep dive into modern JavaScript features and best practices',
    instructor: 'Mike Chen',
    instructorId: 'edu2',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=250&fit=crop',
    rating: 4.9,
    students: 856,
    duration: '8 hours',
    category: 'Technology',
    level: 'Advanced',
    approved: true,
    modules: [
      {
        id: 'm3',
        title: 'ES6 Fundamentals',
        description: 'Learn the core ES6 features',
        courseId: '2',
        videos: [
          {
            id: 'v6',
            title: 'Arrow Functions and Template Literals',
            youtubeUrl: 'https://www.youtube.com/watch?v=dGcsHMXbSOA',
            duration: '14:20',
            moduleId: 'm3'
          },
          {
            id: 'v7',
            title: 'Destructuring and Spread Operator',
            youtubeUrl: 'https://www.youtube.com/watch?v=dGcsHMXbSOA',
            duration: '16:45',
            moduleId: 'm3'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn design principles and create stunning user interfaces',
    instructor: 'Emily Davis',
    instructorId: 'edu3',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop',
    rating: 4.7,
    students: 643,
    duration: '15 hours',
    category: 'Design',
    level: 'Beginner',
    approved: false,
    modules: [
      {
        id: 'm4',
        title: 'Design Principles',
        description: 'Understanding fundamental design concepts',
        courseId: '3',
        videos: [
          {
            id: 'v8',
            title: 'Color Theory Basics',
            youtubeUrl: 'https://www.youtube.com/watch?v=dGcsHMXbSOA',
            duration: '20:30',
            moduleId: 'm4'
          }
        ]
      }
    ]
  }
];

export const mockEnrollments: Enrollment[] = [
  {
    id: 'e1',
    studentId: 'student1',
    courseId: '1',
    enrolledAt: new Date('2024-01-15'),
    progress: 65,
    completed: false,
    watchedVideos: ['v1', 'v2']
  },
  {
    id: 'e2',
    studentId: 'student1',
    courseId: '2',
    enrolledAt: new Date('2024-02-01'),
    progress: 100,
    completed: true,
    watchedVideos: ['v6', 'v7']
  }
];

export const mockStudents = [
  {
    id: 'student1',
    name: 'John Doe',
    email: 'john@example.com',
    enrolledCourses: 2,
    completedCourses: 1,
    joinedAt: '2024-01-01'
  },
  {
    id: 'student2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    enrolledCourses: 3,
    completedCourses: 2,
    joinedAt: '2024-01-15'
  }
];
