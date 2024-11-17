'use client';

import { useEffect, useState } from 'react';

export default function CampaignHistory() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const response = await fetch('/api/campaign');
        const data = await response.json();
        setCampaigns(data.campaigns);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        setLoading(false);
      }
    }

    fetchCampaigns();
  }, []);

  if (loading) return <p>Loading campaigns...</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Campaign History</h2>
      {campaigns.length === 0 ? (
        <p>No campaigns found.</p>
      ) : (
        <ul className="space-y-4">
          {campaigns.map((campaign) => (
            <li key={campaign._id} className="p-4 bg-gray-100 rounded-lg shadow">
              <p><strong>Name:</strong> {campaign.name}</p>
              <p><strong>Message:</strong> {campaign.message}</p>
              <p><strong>Audience Size:</strong> {campaign.audienceSize}</p>
              <p><strong>Success:</strong> {campaign.successCount} | <strong>Failed:</strong> {campaign.failedCount}</p>
              <p><strong>Created At:</strong> {new Date(campaign.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
