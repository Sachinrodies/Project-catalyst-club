import { Calendar, Clock, Info, ArrowRight, MapPin, Users, Tag, AlertCircle } from 'lucide-react';
import { Announcement } from '../../types/announcement';
import { Link } from 'react-router-dom';

interface AnnouncementCardProps {
  announcement: Announcement;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement }) => {
  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'contest':
        return 'bg-contest-purple/20 text-contest-purple';
      case 'workshop':
        return 'bg-tech-blue/20 text-tech-blue';
      case 'results':
        return 'bg-success/20 text-success';
      case 'hackathon':
        return 'bg-matrix-green-500/20 text-matrix-green-500';
      default:
        return 'bg-announce-orange/20 text-announce-orange';
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-500';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'low':
        return 'bg-green-500/20 text-green-500';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-500/20 text-blue-500';
      case 'ongoing':
        return 'bg-green-500/20 text-green-500';
      case 'completed':
        return 'bg-gray-500/20 text-gray-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="card border-l-4 border-l-announce-orange animate-fade-in group hover:translate-y-[-2px] transition-all duration-300">
      {announcement.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={announcement.imageUrl} 
            alt={announcement.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-matrix-dark-900 to-transparent opacity-60"></div>
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(announcement.category)} flex items-center`}>
              <Info size={12} className="mr-1" />
              {announcement.category ? announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1) : 'Announcement'}
            </span>
            {announcement.priority && (
              <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(announcement.priority)} flex items-center`}>
                <AlertCircle size={12} className="mr-1" />
                {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)} Priority
              </span>
            )}
          </div>
          <span className="text-xs text-gray-400">{announcement.createdAt}</span>
        </div>
        
        <h3 className="text-xl font-semibold text-white mt-2 mb-2 group-hover:text-announce-orange transition-colors">
          {announcement.title}
        </h3>
        
        <p className="text-gray-300 mb-4">
          {announcement.content}
        </p>
        
        <div className="space-y-2 mb-4">
          {announcement.author && (
            <div className="flex items-center text-sm text-gray-400">
              <Users size={14} className="mr-2 text-announce-orange" />
              <span>Posted by: {announcement.author}</span>
            </div>
          )}
          
          {announcement.location && (
            <div className="flex items-center text-sm text-gray-400">
              <MapPin size={14} className="mr-2 text-announce-orange" />
              <span>{announcement.location}</span>
            </div>
          )}
          
          {announcement.contestDate && (
            <div className="flex items-center text-sm text-gray-400">
              <Calendar size={14} className="mr-2 text-announce-orange" />
              <span>Date: {announcement.contestDate}</span>
            </div>
          )}
          
          {announcement.contestTime && (
            <div className="flex items-center text-sm text-gray-400">
              <Clock size={14} className="mr-2 text-announce-orange" />
              <span>Time: {announcement.contestTime}</span>
            </div>
          )}
          
          {announcement.registrationDeadline && (
            <div className="flex items-center text-sm text-gray-400">
              <Calendar size={14} className="mr-2 text-announce-orange" />
              <span>Registration Deadline: {announcement.registrationDeadline}</span>
            </div>
          )}
          
          {announcement.maxParticipants && (
            <div className="flex items-center text-sm text-gray-400">
              <Users size={14} className="mr-2 text-announce-orange" />
              <span>
                {announcement.currentParticipants || 0}/{announcement.maxParticipants} participants
              </span>
            </div>
          )}
        </div>
        
        {announcement.status && (
          <div className="mb-4">
            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(announcement.status)}`}>
              {announcement.status.charAt(0).toUpperCase() + announcement.status.slice(1)}
            </span>
          </div>
        )}
        
        {announcement.topics && announcement.topics.length > 0 && (
          <div className="mt-3 pt-3 border-t border-matrix-dark-700">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Topics:</h4>
            <div className="flex flex-wrap gap-2">
              {announcement.topics.map((topic, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 text-xs rounded-full bg-matrix-dark-700 text-gray-300"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {announcement.tags && announcement.tags.length > 0 && (
          <div className="mt-3 pt-3 border-t border-matrix-dark-700">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Tags:</h4>
            <div className="flex flex-wrap gap-2">
              {announcement.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 text-xs rounded-full bg-matrix-dark-700 text-gray-300 flex items-center"
                >
                  <Tag size={12} className="mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {announcement.readMoreUrl && (
          <div className="mt-4 pt-3 border-t border-matrix-dark-700">
            <Link 
              to={announcement.readMoreUrl}
              className="text-announce-orange hover:text-announce-orange/80 flex items-center text-sm"
            >
              <span>Read More</span>
              <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementCard;