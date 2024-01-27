import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BugReportForm from './BugReportForm';

const BugTracker = () => {
  const [bugs, setBugs] = useState({
    critical: [],
    major: [],
    medium: [],
    low: [],
  });
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://bugtracker-j5bn.onrender.com/api/bugs');
      const data = response.data;

    
      const bugsBySeverity = data.reduce((acc, bug) => {
        acc[bug.severity.toLowerCase()].push(bug);
        return acc;
      }, { critical: [], major: [], medium: [], low: [] });

      setBugs(bugsBySeverity);
    } catch (error) {
      console.error('Error fetching bug data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReportBug = () => {
    setIsReportModalOpen(true);
  };

  const handleCloseReportModal = () => {
    setIsReportModalOpen(false);
  };

  const handleSubmitBug = async (bugData) => {
    try {
      const response = await axios.post('https://bugtracker-j5bn.onrender.com/api/bugs', bugData);

      const newBug = response.data;
      setBugs((prevBugs) => ({
        ...prevBugs,
        [newBug.severity.toLowerCase()]: [...prevBugs[newBug.severity.toLowerCase()], newBug],
      }));
    } catch (error) {
      console.error('Error reporting bug:', error);
    }
  };

  const handleDeleteBug = async (severity, bugId) => {
    try {
      
      await axios.delete(`https://bugtracker-j5bn.onrender.com/api/bugs/${bugId}`);

      
      setBugs((prevBugs) => ({
        ...prevBugs,
        [severity]: prevBugs[severity].filter((bug) => bug._id !== bugId),
      }));
    } catch (error) {
      console.error('Error deleting bug:', error);
    }
  };

  return (
    <div className="bug-tracker grid grid-cols-4 gap-4 p-4">
      {Object.keys(bugs).map((severity) => (
        <div
          key={severity}
          className={`bug-stack bg-gray-100 p-4 rounded border`}
          style={{ backgroundColor:getBorderColor(severity) }}
        >
          <h2 className="text-lg font-bold mb-4">{severity} Severity</h2>
          <button
            onClick={() => handleReportBug(severity)}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
            Report Bug
          </button>
          {bugs[severity].length > 0 ? (
            <div className="bug-stack-content space-y-4">
              {bugs[severity].map((bug, index) => (
                <div key={bug._id} className="bug-card bg-white p-4 border rounded shadow">
                  <h3 className="text-md font-semibold mb-2">{bug.title}</h3>
                  <p className="text-sm">{bug.description}</p>
                  <button
                    onClick={() => handleDeleteBug(severity, bug._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No bugs reported for {severity} severity.</p>
          )}
        </div>
      ))}
      <BugReportForm
        isOpen={isReportModalOpen}
        onClose={handleCloseReportModal}
        onSubmit={handleSubmitBug}
      />
    </div>
  );
};
const getBorderColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'red-500';
      case 'major':
        return 'orange-500';
      case 'medium':
        return 'blue-500';
      case 'low':
        return 'green-500';
      default:
        return 'gray-500';
    }
  };

export default BugTracker;

