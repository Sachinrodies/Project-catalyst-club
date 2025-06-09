export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  category?: 'contest' | 'workshop' | 'results' | 'hackathon' | 'general';
  priority?: 'high' | 'medium' | 'low';
  contestDate?: string;
  contestTime?: string;
  topics?: string[];
  readMoreUrl?: string;
  imageUrl?: string;
  author?: string;
  location?: string;
  registrationDeadline?: string;
  maxParticipants?: number;
  currentParticipants?: number;
  status?: 'upcoming' | 'ongoing' | 'completed';
  tags?: string[];
}