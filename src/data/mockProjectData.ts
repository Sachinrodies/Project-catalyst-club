import { ProjectIdea } from '../types/project';

export const mockProjects: ProjectIdea[] = [
  {
    id: 'project-9',
    title: 'MANIT TYPE',
    description: 'A typing speed test platform exclusively for MANIT students. Challenge yourself and compete with fellow students to see who\'s the fastest typer in MANIT. Track your progress, check your rank on the leaderboard, and improve your typing skills.',
    difficulty: 'Intermediate',
    category: 'Web Development',
    tags: ['Typing Test', 'Leaderboard', 'Student Platform', 'Progress Tracking'],
    githubUrl: 'https://github.com/avinashchaturvedi2002/MANIT-TYPE.git',
    websiteUrl: 'https://manit-type-mftz.vercel.app',
    requirements: [
      'MANIT email authentication',
      'Customizable time duration for tests',
      'Real-time typing speed calculation',
      'Global and category-wise leaderboards',
      'User profile with progress tracking',
      'Responsive design for optimal experience'
    ]
  }
];