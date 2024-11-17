// src/components/Campaigns.js
import { useEffect, useState } from 'react';

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    // Fetch campaign history from API
    async function fetchCampaigns() {
      const response = await fetch('/api/campaigns');
      const data = await response.json();
      setCampaigns(data.campaigns);
    }

    fetchCampaigns();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Campaign History</h2>
      {campaigns.length === 0 ? (
        <p className="text-gray-500">No campaigns found.</p>
      ) : (
        <ul className="space-y-4">
          {campaigns.map((campaign) => (
            <li key={campaign._id} className="border-b pb-4">
              <p className="text-lg font-medium text-gray-800">
                <span className="font-semibold">Message:</span> {campaign.message}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Sent to:</span> {campaign.audienceSize} customers
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Success:</span> <span className="text-green-500">{campaign.successCount}</span> |{' '}
                <span className="font-semibold">Failed:</span> <span className="text-red-500">{campaign.failedCount}</span>
              </p>
              <p className="text-gray-500">
                <span className="font-semibold">Sent Date:</span> {new Date(campaign.timestamp).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
