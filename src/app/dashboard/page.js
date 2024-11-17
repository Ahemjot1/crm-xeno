// src/app/dashboard/page.js
'use client';

import { useState } from 'react';
import Auth from '@/app/components/Auth';
import AudienceForm from '@/app/components/AudienceForm';
import Campaigns from '../components/campaigns';

export default function Dashboard() {
  const [audience, setAudience] = useState([]);

  const handleSegmentSubmit = async (criteria) => {
    try {
      const response = await fetch('/api/audience-segments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(criteria),
      });
      const data = await response.json();
      setAudience(data.audience);
    } catch (error) {
      console.error('Error fetching audience:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 text-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white text-gray-900 shadow-2xl rounded-2xl p-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-indigo-600">Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">Manage your campaigns and audience effortlessly.</p>
        </header>

        {/* Audience Form */}
        <section className="mb-10">
          <AudienceForm onSubmit={handleSegmentSubmit} />
        </section>

        {/* Campaigns Section */}
        <section className="mb-10">
          <Campaigns />
        </section>

        {/* Segmented Audience */}
        {audience.length > 0 && (
          <section className="bg-gray-50 rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Segmented Audience</h3>
            <ul className="divide-y divide-gray-200">
              {audience.map((customer) => (
                <li
                  key={customer._id}
                  className="flex justify-between items-center py-4 px-6 bg-white rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 transition duration-300"
                >
                  <div>
                    <p className="font-medium text-gray-800">{customer.name}</p>
                    <p className="text-sm text-gray-600">{customer.email}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
