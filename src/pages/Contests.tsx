import { useContext, useEffect, useState } from 'react';
import { Filter, Calendar, Trophy, Clock } from 'lucide-react';
import { useContest } from '../contexts/ContestContext';
import ContestCard from '../components/contests/ContestCard';
import ExternalContests from '../components/contests/ExternalContests';
import { Contest } from '../types/contest';

type FilterType = 'all' | 'upcoming';

const Contests = () => {
  const { contests, setContests, isLoading, upcomingContests } = useContest();
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);

    const getContests = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        // Data is already loaded in the context
      } catch (err) {
        setError('Failed to load contests');
      }
    };

    getContests();
  }, [setContests]);
  
  const filteredContests = (() => {
    if (filter === 'all') return contests;
    if (filter === 'upcoming') return upcomingContests;
    return contests;
  })();
  
  const searchedContests = searchTerm
    ? filteredContests.filter((contest: Contest) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          contest.title.toLowerCase().includes(searchLower) ||
          (contest.description && contest.description.toLowerCase().includes(searchLower)) ||
          (contest.platform && contest.platform.toLowerCase().includes(searchLower))
        );
      })
    : filteredContests;
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-matrix-dark-900 pt-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-white">Contests</h1>
        
        {/* Filter and Search Section */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md ${
                filter === 'all' 
                  ? 'bg-matrix-green-500 text-white' 
                  : 'bg-matrix-dark-700 text-gray-300 hover:bg-matrix-dark-600'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-4 py-2 rounded-md ${
                filter === 'upcoming' 
                  ? 'bg-matrix-green-500 text-white' 
                  : 'bg-matrix-dark-700 text-gray-300 hover:bg-matrix-dark-600'
              }`}
            >
              Upcoming
            </button>
          </div>
          
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search contests by title, description, or platform..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-matrix-dark-700 placeholder-gray-400"
            />
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        
        {/* External Contests Section */}
        <div className="mb-12">
          <ExternalContests searchTerm={searchTerm} />
        </div>
        
        {/* Internal Contests Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
            <Trophy className="text-matrix-green-500" />
            Club Contests
          </h2>
          
          {/* Contests Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchedContests.map((contest: Contest) => (
              <ContestCard key={contest.id} contest={contest} />
            ))}
          </div>
          
          {searchedContests.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No contests found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contests;