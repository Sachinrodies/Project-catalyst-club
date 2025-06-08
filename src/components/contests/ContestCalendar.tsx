import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface Contest {
  name: string;
  url: string;
  site: string;
  start_time: string;
  end_time: string;
}

const ContestCalendar: React.FC = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://kontests.net/api/v1/all')
      .then(res => res.json())
      .then(data => {
        setContests(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load contests.');
        setLoading(false);
      });
  }, []);

  // Filter contests for the selected date and only for LeetCode, Codeforces, CodeChef
  const contestsForDate = selectedDate
    ? contests.filter(contest => {
        const contestDate = new Date(contest.start_time);
        return (
          ['LeetCode', 'Codeforces', 'CodeChef'].includes(contest.site) &&
          contestDate.getFullYear() === selectedDate.getFullYear() &&
          contestDate.getMonth() === selectedDate.getMonth() &&
          contestDate.getDate() === selectedDate.getDate()
        );
      })
    : [];

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Contest Calendar</h2>
      {loading ? (
        <div>Loading contests...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          <Calendar onClickDay={setSelectedDate} />
          {selectedDate && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold">
                Contests on {selectedDate.toDateString()}
              </h3>
              {contestsForDate.length === 0 ? (
                <p>No contests on this day.</p>
              ) : (
                <ul>
                  {contestsForDate.map(contest => (
                    <li key={contest.name + contest.start_time}>
                      <span className="font-bold">{contest.site}:</span>{' '}
                      <a
                        href={contest.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-matrix-green-500 hover:underline"
                      >
                        {contest.name}
                      </a>{' '}
                      ({new Date(contest.start_time).toLocaleTimeString()} -{' '}
                      {new Date(contest.end_time).toLocaleTimeString()})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ContestCalendar; 