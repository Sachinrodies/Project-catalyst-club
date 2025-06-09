import React from 'react';
import EventCard from './EventCard';

const mockEvents = [
  {
    time: 'March 20, 2024',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'DSA Sprint',
    description: 'A competitive coding event focusing on Data Structures and Algorithms. Test your problem-solving skills!',
    sessionLink: 'https://meet.google.com/abc-defg-hij',
    notesLink: 'https://docs.google.com/document/d/xyz',
    type: 'workshop'
  },
  {
    time: 'March 25, 2024',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Web Development Workshop',
    description: 'Learn modern web development techniques and best practices. Perfect for beginners and intermediate developers.',
    sessionLink: 'https://meet.google.com/klm-nopq-rst',
    notesLink: 'https://docs.google.com/document/d/uvw',
    type: 'workshop'
  },
  {
    time: 'April 5, 2024',
    image: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'AI/ML Workshop',
    description: 'Introduction to Artificial Intelligence and Machine Learning. Hands-on experience with popular frameworks.',
    sessionLink: 'https://meet.google.com/uvw-xyz-abc',
    notesLink: 'https://docs.google.com/document/d/def',
    type: 'workshop'
  },
  {
    time: 'June 15-30, 2024',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Catalyst Hackathon 2024',
    description: 'Join us for the biggest hackathon of the year! Build innovative solutions, win exciting prizes, and network with industry experts.',
    sessionLink: 'https://hackathon.catalystclub.com',
    type: 'hackathon',
    participants: 100,
    prizePool: '₹50,000',
    registrationDeadline: 'June 10, 2024',
    themes: ['Web Development', 'Mobile Apps', 'AI/ML', 'Blockchain']
  }
];

const EventsSection = () => {
  return (
    <div className="py-16 bg-matrix-dark-900 matrix-grid">
      <div className="container-custom">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Upcoming Events</h2>
          <p className="text-gray-400">Join our exciting events and enhance your skills</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockEvents.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsSection; 