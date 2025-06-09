import { ProjectIdea } from '../types/project';

export const mockProjects: ProjectIdea[] = [
  {
    id: 'project-10',
    title: 'DebtDesk',
    description: 'A comprehensive debt management platform built with Expo and React Native. Track your debts, manage payments, and stay on top of your financial obligations with an intuitive mobile interface.',
    difficulty: 'Intermediate',
    category: 'Mobile Development',
    tags: ['React Native', 'Expo', 'Debt Management', 'Mobile App', 'Finance'],
    githubUrl: 'https://github.com/Debashish-C/DebtDesk',
    websiteUrl: 'https://expo.dev/artifacts/eas/rQpX9FZAwwBfPrQZL6nLJU.apk',
    requirements: [
      'React Native and Expo development environment',
      'Mobile app development experience',
      'Understanding of state management',
      'Knowledge of mobile UI/UX principles',
      'Basic understanding of financial concepts'
    ]
  },
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