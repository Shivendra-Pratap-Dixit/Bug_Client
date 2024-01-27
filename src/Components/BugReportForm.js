// BugReportForm.js
import React, { useState } from 'react';
import Modal from 'react-modal';

const BugReportForm = ({ isOpen, onClose, onSubmit }) => {
  const [bugData, setBugData] = useState({
    title: '',
    description: '',
    source: '',
    severity: 'Critical',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBugData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(bugData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal">
      <div className="bg-white p-6 rounded-lg w-96 mx-auto">
        <h2 className="text-2xl font-bold mb-4">Report Bug</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-600">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={bugData.title}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-600">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={bugData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="source" className="block text-sm font-semibold text-gray-600">
              Source:
            </label>
            <input
              type="text"
              id="source"
              name="source"
              value={bugData.source}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="severity" className="block text-sm font-semibold text-gray-600">
              Severity:
            </label>
            <select
              id="severity"
              name="severity"
              value={bugData.severity}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="Critical">Critical</option>
              <option value="Major">Major</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default BugReportForm;
