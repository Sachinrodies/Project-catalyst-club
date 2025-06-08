import { useState, useEffect } from 'react';
import { Calendar, ExternalLink } from 'lucide-react';

interface ExternalContest {
  id: string;
  title: string;
  platform: string;
  startTime: number;
  duration: number;
  endTime: number;
  url: string;
}

interface ExternalContestsProps {
  searchTerm: string;
}

const platformIcons: Record<string, string> = {
  'leetcode': 'https://leetcode.com/favicon.ico',
  'codeforces': 'https://codeforces.org/s/0/favicon-96x96.png',
  'codechef': 'https://www.codechef.com/favicon.ico',
  'atcoder': 'https://atcoder.jp/favicon.ico',
  'hackerrank': 'https://www.hackerrank.com/favicon.ico',
  'hackerearth': 'https://www.hackerearth.com/favicon.ico',
};

const formatDuration = (durationMs: number): string => {
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours === 0) {
    return `${minutes} minutes`;
  }
  return `${hours} hour${hours > 1 ? 's' : ''} ${minutes > 0 ? `${minutes} minutes` : ''}`;
};

const ExternalContests = ({ searchTerm }: ExternalContestsProps) => {
  const [contests, setContests] = useState<ExternalContest[]>([]);
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
        
        // Format and sort contests
        const formattedContests: ExternalContest[] = data
          .map((contest: any) => ({
            id: `${contest.site}-${contest.title}`,
            title: contest.title,
            platform: contest.site,
            startTime: contest.startTime,
            duration: contest.duration,
            endTime: contest.endTime,
            url: contest.url,
          }))
          .sort((a: ExternalContest, b: ExternalContest) => a.startTime - b.startTime);

        setContests(formattedContests);
      } catch (err) {
        setError('Failed to fetch contests. Please try again later.');
        console.error('Error fetching contests:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  const filteredContests = searchTerm
    ? contests.filter(contest => {
        const searchLower = searchTerm.toLowerCase();
        return (
          contest.title.toLowerCase().includes(searchLower) ||
          contest.platform.toLowerCase().includes(searchLower)
        );
      })
    : contests;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-matrix-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-matrix-dark-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Calendar className="text-matrix-green-500" />
        External Contests
      </h2>
      
      <div className="space-y-4">
        {filteredContests.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No contests found.
          </div>
        ) : (
          filteredContests.map((contest) => (
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
                  <h3 className="text-lg font-semibold mb-2">{contest.title}</h3>
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>Start: {new Date(contest.startTime).toLocaleString()}</p>
                    <p>Duration: {formatDuration(contest.duration)}</p>
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
          ))
        )}
      </div>
    </div>
  );
};

export default ExternalContests; 