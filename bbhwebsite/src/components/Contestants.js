import React, { useState, useEffect } from 'react';

function ContestantsList() {
  const [contestants, setContestants] = useState({}); // Using an object to store contestants keyed by their ID

  useEffect(() => {
    const fetchContestants = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/contestants');
        if (!response.ok) {
          throw new Error('Failed to fetch contestants');
        }
        const data = await response.json();
        const contestantsDict = data.reduce((acc, contestant) => {
          acc[contestant.id] = contestant;
          return acc;
        }, {});
        setContestants(contestantsDict);
      } catch (error) {
        console.error('Error fetching contestants:', error);
      }
    };

    fetchContestants();
  }, []); // The empty dependency array ensures this effect runs once on mount

  return (
    <div>
      <h1>Contestants</h1>
      <ul>
        {Object.values(contestants).map((contestant) => (
          <li key={contestant.id}>
            {contestant.name} - Status: {contestant.status}
            {/* Render additional contestant details here */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContestantsList;
