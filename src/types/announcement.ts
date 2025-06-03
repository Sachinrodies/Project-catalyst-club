export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  contestDate?: string;
  contestTime?: string;
  topics?: string[];
}