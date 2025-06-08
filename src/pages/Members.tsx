import { useState, useEffect } from 'react';
import { Filter, Search, Users } from 'lucide-react';
import MemberCard from '../components/members/MemberCard';

type RoleType = 'all'  | 'lead' | 'core' | 'member' | 'new-recruit';

interface Member {
  id: string;
  name: string;
  role:  'lead' | 'core' | 'member' | 'new-recruit';
  image: string;
  github?: string;
  linkedin?: string;
  email?: string;
  bio: string;
}

// Sample data - replace with actual data from your backend
const members: Member[] = [
 
  
    {
      id: '1',
      name: 'Sachin ',
      role: 'member',
      image: 'https://avatars.githubusercontent.com/u/97837770?v=4',
      github: 'https://github.com/Sachinrodies',
      linkedin: 'https://www.linkedin.com/in/sachin-jha-b25a71174/?original_referer=',
      email: 'sahilrodies@gmail.com',
      bio: 'Team member'
    },
    {
      id: '2',
      name: 'Avinash Chaturvedi ',
      role: 'member',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQGl0xVYtlFQVg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1673625479670?e=1755129600&v=beta&t=QI1a59NKZr-mBf-N2ix4KcgYd_l0RbKh3-N_1JG9GDk',
      github: 'https://github.com/avinashchaturvedi2002',
      linkedin: 'https://www.linkedin.com/in/avinash-chaturvedi/ ',
      email: 'avinashchaturvedi2002@gmail.com',
      bio: 'Team member'
    },
    {
      id: '3',
      name: 'Mukesh Pradhan ',
      role: 'member',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQFrXNfWI-8B-w/profile-displayphoto-shrink_400_400/B4DZTWPfuYHIAg-/0/1738761175226?e=1755129600&v=beta&t=rT6f7hk2ApGp7EdiU0mu_D2-5kYP3d1IlqnThdE34jU',
      linkedin: 'https://www.linkedin.com/in/mukesh-pradhan-879543321/',
      email: 'mukesh.dev.2003@gmail.com',
      bio: 'Team member'
    },

   
  
  
];

// New recruits data


const Members = () => {
  const [roleFilter, setRoleFilter] = useState<RoleType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredMembers = members.filter(member => {
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    const matchesSearch = !searchTerm || 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.bio.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });
  
  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Our Team</h1>
          <p className="text-gray-300 max-w-3xl">
            Meet the talented individuals who make our club thrive. From leadership to core members, 
            each person brings unique skills and passion to our community.
          </p>
        </div>
        
        <div className="bg-matrix-dark-800 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex-grow">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-matrix-dark-700 border border-matrix-dark-600 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-matrix-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter size={18} className="text-gray-400" />
              <span className="text-gray-400">Filter:</span>
              <div className="flex rounded-md overflow-hidden">
                <button
                  onClick={() => setRoleFilter('all')}
                  className={`px-4 py-2 text-sm font-medium ${
                    roleFilter === 'all' 
                      ? 'bg-matrix-green-500 text-matrix-dark-900' 
                      : 'bg-matrix-dark-700 text-gray-300 hover:bg-matrix-dark-600'
                  } transition-colors`}
                >
                  All
                </button>
                <button
                  onClick={() => setRoleFilter('lead')}
                  className={`px-4 py-2 text-sm font-medium ${
                    roleFilter === 'lead'
                      ? 'bg-matrix-green-500 text-matrix-dark-900' 
                      : 'bg-matrix-dark-700 text-gray-300 hover:bg-matrix-dark-600'
                  } transition-colors`}
                >
                 
                  Leads
                </button>
                <button
                  onClick={() => setRoleFilter('core')}
                  className={`px-4 py-2 text-sm font-medium ${
                    roleFilter === 'core'
                      ? 'bg-matrix-green-500 text-matrix-dark-900' 
                      : 'bg-matrix-dark-700 text-gray-300 hover:bg-matrix-dark-600'
                  } transition-colors`}
                >
                  Core
                </button>
                <button
                  onClick={() => setRoleFilter('member')}
                  className={`px-4 py-2 text-sm font-medium ${
                    roleFilter === 'member'
                      ? 'bg-matrix-green-500 text-matrix-dark-900' 
                      : 'bg-matrix-dark-700 text-gray-300 hover:bg-matrix-dark-600'
                  } transition-colors`}
                >
                  Members
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {filteredMembers.length === 0 ? (
          <div className="text-center py-12 bg-matrix-dark-800 rounded-lg">
            <Users size={48} className="mx-auto text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No members found</h3>
            <p className="text-gray-400">
              {searchTerm 
                ? 'No members matching your search criteria. Try a different search term.'
                : 'No members are available in this category.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map(member => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Members; 