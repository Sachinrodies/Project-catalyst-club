import { useState, useEffect } from 'react';
import { Calendar, ExternalLink } from 'lucide-react';

interface Contest {
  id: string;
  title: string;
  platform: string;
  startTime: number;
  duration: number;
  url: string;
}

const platformIcons: Record<string, string> = {
  'leetcode': 'https://leetcode.com/favicon.ico',
  'codeforces': 'https://codeforces.org/s/0/favicon-96x96.png',
  'codechef': 'https://www.codechef.com/favicon.ico',
};

const formatDuration = (durationMs: number): string => {
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours === 0) {
    return `${minutes} minutes`;
  }
  return `${hours} hour${hours > 1 ? 's' : ''} ${minutes > 0 ? `${minutes} minutes` : ''}`;
};

const formatTimeUntil = (startTime: number): string => {
  const now = Date.now();
  const diff = startTime - now;
  
  if (diff < 0) return 'Starting soon';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) return `Starts in ${days}d ${hours}h`;
  if (hours > 0) return `Starts in ${hours}h ${minutes}m`;
  return `Starts in ${minutes}m`;
};

const UpcomingContestsCard = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await fetch('https://competeapi.vercel.app/contests/upcoming');
        if (!response.ok) {
          throw new Error('Failed to fetch contests');
        }
        
        const data = await response.json();
        
        // Format and filter contests
        const formattedContests: Contest[] = data
          .filter((contest: any) => ['leetcode', 'codeforces', 'codechef'].includes(contest.site))
          .map((contest: any) => ({
            id: `${contest.site}-${contest.title}`,
            title: contest.title,
            platform: contest.site,
            startTime: contest.startTime,
            duration: contest.duration,
            url: contest.url,
          }))
          .sort((a: Contest, b: Contest) => a.startTime - b.startTime)
          .slice(0, 3); // Show only the next 3 contests

        setContests(formattedContests);
      } catch (err) {
        setError('Failed to fetch contests');
        console.error('Error fetching contests:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  if (loading) {
    return (
      <div className="bg-matrix-dark-800 rounded-lg p-6 animate-pulse">
        <div className="h-6 w-48 bg-matrix-dark-700 rounded mb-4"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-matrix-dark-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-matrix-dark-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-white">Upcoming Contests</h2>
        <p className="text-red-500">Failed to load contests</p>
      </div>
    );
  }

  return (
    <div className="bg-matrix-dark-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Calendar className="text-matrix-green-500" />
          Upcoming Contests
        </h2>
        <a 
          href="/contests" 
          className="text-matrix-green-500 hover:text-matrix-green-400 text-sm flex items-center gap-1"
        >
          View All
          <ExternalLink size={14} />
        </a>
      </div>
      
      <div className="space-y-4">
        {contests.map((contest) => (
          <div
            key={contest.id}
            className="bg-matrix-dark-700 rounded-lg p-4 hover:bg-matrix-dark-600 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <img 
                    src={platformIcons[contest.platform]} 
                    alt={contest.platform} 
                    className="w-5 h-5 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://codeforces.org/s/0/favicon-96x96.png';
                    }}
                  />
                  <span className="text-sm text-gray-400 capitalize">{contest.platform}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{contest.title}</h3>
                <div className="text-sm text-gray-400 space-y-1">
                  <p>Start: {new Date(contest.startTime).toLocaleString()}</p>
                  <p>Duration: {formatDuration(contest.duration)}</p>
                  <p className="text-matrix-green-500">{formatTimeUntil(contest.startTime)}</p>
                </div>
              </div>
              <a
                href={contest.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-matrix-green-500 hover:text-matrix-green-400 flex items-center gap-1 ml-4"
              >
                <ExternalLink size={16} />
                <span>Join</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingContestsCard; 