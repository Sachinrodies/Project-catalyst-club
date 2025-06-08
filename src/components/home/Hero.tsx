import { Link } from 'react-router-dom';
import { ArrowRight, Users, Code, Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Contest {
  title: string;
  platform: string;
  startTime: number;
  url?: string;
}

const codeText = `# THE CATALYST Coding Club\ndef solve_problem(skill):\n    return skill * practice + teamwork\n\n# Join our next contest!`;

const Hero = () => {
  const [nextContest, setNextContest] = useState<Contest | null>(null);
  const [loading, setLoading] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await fetch('https://competeapi.vercel.app/contests/upcoming');
        if (!response.ok) throw new Error('Failed to fetch contests');
        const data = await response.json();
        const filtered = data
          .filter((c: any) => ['leetcode', 'codeforces', 'codechef'].includes(c.site))
          .sort((a: any, b: any) => a.startTime - b.startTime);
        if (filtered.length > 0) {
          setNextContest({
            title: filtered[0].title,
            platform: filtered[0].site,
            startTime: filtered[0].startTime,
            url: filtered[0].url,
          });
        }
      } catch (err) {
        setNextContest(null);
      } finally {
        setLoading(false);
      }
    };
    fetchContests();
  }, []);

  useEffect(() => {
    if (charIndex < codeText.length) {
      const interval = setInterval(() => {
        setCharIndex((prev) => (prev < codeText.length ? prev + 1 : prev));
      }, 18);
      return () => clearInterval(interval);
    }
  }, [charIndex]);

  return (
    <section className="relative py-16 md:py-24 bg-matrix-dark-900 matrix-grid overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* LEFT: Club Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
              <span className="text-matrix-green-500">THE CATALYST</span> <span className="text-white">Coding Club</span>
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-200 mb-4">
              Maulana Azad National Institute of Technology
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-xl">
              Join our community of passionate MCA students and coding enthusiasts. Participate in contests, collaborate on projects, and grow your technical skills with us.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mb-8">
              <Link
                to="/contests"
                className="px-6 py-3 rounded-lg bg-matrix-green-500 text-matrix-dark-900 font-semibold text-lg flex items-center gap-2 shadow hover:bg-matrix-green-400 transition"
              >
                Explore Contests <ArrowRight size={18} />
              </Link>
              <Link
                to="/register"
                className="px-6 py-3 rounded-lg border-2 border-matrix-green-500 text-matrix-green-500 font-semibold text-lg flex items-center gap-2 hover:bg-matrix-green-500 hover:text-matrix-dark-900 transition"
              >
                Join Our Community <Users size={18} />
              </Link>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-matrix-green-400 text-base font-medium mt-4">
              <span className="flex items-center gap-2"><Trophy size={18}/> Weekly Contests</span>
              <span className="flex items-center gap-2"><Code size={18}/> Coding Challenges</span>
              <span className="flex items-center gap-2"><Users size={18}/> Tech Community</span>
            </div>
          </div>

          {/* RIGHT: Terminal Card */}
          <div className="flex-1 w-full max-w-lg">
            <div className="bg-matrix-dark-800 rounded-xl border border-matrix-dark-700 shadow-lg shadow-matrix-green-500/10 p-0 animate-fade-in">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-error"></div>
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                </div>
                <span className="text-xs text-gray-400 font-mono">The_Catalyst.py</span>
              </div>
              {/* Code Block (Animated) */}
              <pre className="bg-matrix-dark-900 rounded-lg mx-4 mt-2 p-4 font-mono text-left text-sm text-matrix-green-300 overflow-x-auto min-h-[120px]">
                <code>
                  <span className="text-matrix-green-500">{codeText.substring(0, charIndex)}</span>
                  <span className="animate-pulse">|</span>
                </code>
              </pre>
              {/* Next Contest Card */}
              <div className="bg-matrix-dark-900 rounded-lg mx-4 my-4 p-4 flex flex-col gap-2 border border-matrix-dark-700">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="text-matrix-green-400" size={20} />
                  <span className="text-lg font-bold text-matrix-green-400">Next Contest</span>
                </div>
                {loading ? (
                  <span className="text-gray-400 font-mono">Loading...</span>
                ) : nextContest ? (
                  <>
                    <span className="text-white font-mono text-base">{nextContest.title}</span>
                    <span className="text-gray-400 font-mono text-xs">{new Date(nextContest.startTime).toISOString().replace('T', ' ').replace('.000Z', '')}</span>
                    {nextContest.url && (
                      <a
                        href={nextContest.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-matrix-green-400 font-semibold flex items-center gap-1 mt-2 hover:underline text-sm w-fit ml-auto"
                      >
                        Details <ArrowRight size={14} />
                      </a>
                    )}
                  </>
                ) : (
                  <span className="text-gray-400 font-mono">No upcoming contest</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Matrix-style background animation */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-matrix-green-500/20 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-matrix-green-500/10 via-transparent to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero; 