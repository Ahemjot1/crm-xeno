'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function AddCustomer() {
  const { data: session } = useSession(); // Access the authenticated user's session
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    totalSpending: '',
    visits: '',
    lastVisit: '',
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      alert('You need to be signed in to add a customer.');
      return;
    }

    setLoading(true);
    setSuccessMessage('');

    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          addedBy: session.user.email, // Include the email of the authenticated user
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        setSuccessMessage('Customer added successfully!');
        setFormData({
          name: '',
          email: '',
          totalSpending: '',
          visits: '',
          lastVisit: '',
        });
      } else {
        console.error('Failed to add customer');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Add a Customer</h2>
      {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Customer name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Customer email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="totalSpending">
            Total Spending:
          </label>
          <input
            type="number"
            id="totalSpending"
            name="totalSpending"
            value={formData.totalSpending}
            onChange={handleChange}
            placeholder="e.g., 10000"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="visits">
            Visits:
          </label>
          <input
            type="number"
            id="visits"
            name="visits"
            value={formData.visits}
            onChange={handleChange}
            placeholder="e.g., 5"
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
            value={formData.lastVisit}
            onChange={handleChange}
            placeholder="e.g., 3"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Customer'}
        </button>
      </form>
    </div>
  );
}
