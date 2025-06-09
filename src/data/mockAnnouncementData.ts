import { Announcement } from '../types/announcement';

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Catalyst Hackathon 2024 Registration Open',
    content: 'Join us for the biggest hackathon of the year! Build innovative solutions, win exciting prizes, and network with industry experts.',
    createdAt: '2024-03-15',
    category: 'hackathon',
    priority: 'high',
    imageUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    author: 'Admin',
    location: 'MANIT Campus',
    contestDate: '2024-04-15',
    contestTime: '10:00 AM',
    registrationDeadline: '2024-04-10',
    maxParticipants: 100,
    currentParticipants: 45,
    status: 'upcoming',
    topics: ['Web Development', 'Mobile Apps', 'AI/ML', 'Blockchain'],
    tags: ['Hackathon', 'Innovation', 'Tech', 'Competition'],
    readMoreUrl: '/announcements/hackathon-2024'
  },
  {
    id: '2',
    title: 'DSA Workshop Series - Week 3 Results',
    content: 'Congratulations to all participants! Check out the top performers and their solutions in this week\'s DSA workshop.',
    createdAt: '2024-03-14',
    category: 'results',
    priority: 'medium',
    author: 'DSA Team Lead',
    topics: ['Data Structures', 'Algorithms', 'Problem Solving'],
    tags: ['DSA', 'Workshop', 'Results'],
    readMoreUrl: '/announcements/dsa-workshop-results'
  },
  {
    id: '3',
    title: 'Web Development Workshop - React.js Fundamentals',
    content: 'Learn the fundamentals of React.js in our upcoming workshop. Perfect for beginners and intermediate developers.',
    createdAt: '2024-03-13',
    category: 'workshop',
    priority: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    author: 'Web Dev Team',
    location: 'Room 302, CS Department',
    contestDate: '2024-03-20',
    contestTime: '2:00 PM',
    maxParticipants: 30,
    currentParticipants: 25,
    status: 'upcoming',
    topics: ['React.js', 'JavaScript', 'Frontend Development'],
    tags: ['Workshop', 'Web Development', 'React'],
    readMoreUrl: '/announcements/react-workshop'
  }
];