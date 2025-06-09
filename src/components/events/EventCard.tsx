import React from 'react';
import { Calendar, Users, Trophy, ExternalLink } from 'lucide-react';

interface EventCardProps {
  time: string;
  image: string;
  title: string;
  description: string;
  sessionLink?: string;
  notesLink?: string;
  type?: 'workshop' | 'hackathon' | 'lecture';
  participants?: number;
  prizePool?: string;
  registrationDeadline?: string;
  themes?: string[];
}

const EventCard: React.FC<EventCardProps> = ({ 
  time, 
  image, 
  title, 
  description, 
  sessionLink, 
  notesLink,
  type = 'workshop',
  participants,
  prizePool,
  registrationDeadline,
  themes = []
}) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hackathon':
        return 'bg-contest-purple/20 text-contest-purple';
      case 'workshop':
        return 'bg-tech-blue/20 text-tech-blue';
      case 'lecture':
        return 'bg-matrix-green-500/20 text-matrix-green-500';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="bg-matrix-dark-900 rounded-lg shadow-lg border border-matrix-dark-700 flex flex-col overflow-hidden w-full max-w-xs mx-auto group hover:border-matrix-green-500 transition-all duration-200">
      <div className="bg-matrix-dark-800 px-4 py-2 text-center text-xs text-gray-300 font-semibold border-b border-matrix-dark-700 flex justify-between items-center">
        <span>{time}</span>
        <span className={`px-2 py-1 rounded-full ${getTypeColor(type)}`}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </div>
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-matrix-green-500 transition-colors">{title}</h3>
        <p className="text-gray-300 text-sm mb-4 flex-1">{description}</p>
        
        {type === 'hackathon' && (
          <div className="space-y-2 mb-4 text-sm">
            {participants && (
              <div className="flex items-center text-gray-400">
                <Users size={16} className="mr-2 text-matrix-green-500" />
                <span>{participants}+ participants</span>
              </div>
            )}
            {prizePool && (
              <div className="flex items-center text-gray-400">
                <Trophy size={16} className="mr-2 text-matrix-green-500" />
                <span>Prize Pool: {prizePool}</span>
              </div>
            )}
            {registrationDeadline && (
              <div className="flex items-center text-gray-400">
                <Calendar size={16} className="mr-2 text-matrix-green-500" />
                <span>Register by: {registrationDeadline}</span>
              </div>
            )}
            {themes.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {themes.map((theme, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 text-xs rounded-full bg-matrix-dark-700 text-gray-300"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
        
        <div className="flex gap-2 mt-auto">
          {sessionLink && (
            <a 
              href={sessionLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-3 py-1 rounded bg-matrix-green-500 text-matrix-dark-900 font-semibold text-xs hover:bg-matrix-green-400 transition flex items-center"
            >
              {type === 'hackathon' ? 'Apply Now' : 'Session Link'}
              <ExternalLink size={14} className="ml-1" />
            </a>
          )}
          {notesLink && (
            <a 
              href={notesLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-3 py-1 rounded bg-matrix-dark-700 text-matrix-green-400 border border-matrix-green-400 font-semibold text-xs hover:bg-matrix-green-500 hover:text-matrix-dark-900 transition"
            >
              Notes
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard; 