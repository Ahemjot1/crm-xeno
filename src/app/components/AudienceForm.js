'use client';

import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // For client-side navigation
import { useState } from 'react';

export default function AudienceForm() {
  const { data: session } = useSession();
  const router = useRouter();

  const [criteria, setCriteria] = useState({
    totalSpending: '',
    visits: '',
    lastVisit: '',
    operator: 'AND', // Default to AND logic
  });

  const [messageTemplate, setMessageTemplate] = useState('');
  const [audience, setAudience] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!session) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold">You need to sign in to create audience segments.</h2>
        <button
          onClick={() => signIn()}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Sign In
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCriteria({ ...criteria, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/audience-segments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(criteria),
      });

      if (response.ok) {
        const data = await response.json();
        setAudience(data.audience);
      } else {
        console.error('Failed to fetch audience');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessages = async () => {
    if (!messageTemplate.trim()) {
      alert('Please enter a message template.');
      return;
    }

    const audienceIds = audience.map((person) => person._id);

    try {
      const response = await fetch('/api/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audienceIds,
          messageTemplate,
          createdBy: session.user.email, // Pass the logged-in user's email
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Messages sent and campaign logged:', data);
        alert('Messages sent successfully!');
      } else {
        console.error('Failed to send messages');
        alert('Failed to send messages');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending messages');
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Create Audience Segment</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="totalSpending">
            Total Spending Greater Than:
          </label>
          <input
            type="number"
            id="totalSpending"
            name="totalSpending"
            value={criteria.totalSpending}
            onChange={handleChange}
            placeholder="e.g., 10000"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="visits">
            Visits Less Than or Equal To:
          </label>
          <input
            type="number"
            id="visits"
            name="visits"
            value={criteria.visits}
            onChange={handleChange}
            placeholder="e.g., 3"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="lastVisit">
            Last Visit (Months Ago):
          </label>
          <input
            type="number"
            id="lastVisit"
            name="lastVisit"
            value={criteria.lastVisit}
            onChange={handleChange}
            placeholder="e.g., 3"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="operator">
            Logic Operator:
          </label>
          <select
            id="operator"
            name="operator"
            value={criteria.operator}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="AND">AND</option>
            <option value="OR">OR</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Create Segment'}
        </button>
      </form>

      {audience.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Audience List</h2>
          <table className="w-full text-left border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {audience.map((person) => (
                <tr key={person._id}>
                  <td className="border border-gray-300 px-4 py-2">{person.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{person.email}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6">
            <label className="block text-gray-700 font-medium mb-2">
              Message Template:
            </label>
            <textarea
              value={messageTemplate}
              onChange={(e) => setMessageTemplate(e.target.value)}
              placeholder="e.g., Hi [Name], here’s 10% off on your next order!"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            onClick={handleSendMessages}
            className="mt-4 w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            Send Messages
          </button>
        </div>
      )}
    </div>
  );
}
