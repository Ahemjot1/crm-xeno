'use client';

import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';

export default function CampaignHistory() {
    const { data: session } = useSession();
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchCampaigns() {
            try {
                const response = await fetch('/api/campaign');
                if (response.ok) {
                    const data = await response.json();
                    setCampaigns(data.campaigns);
                } else {
                    console.error('Failed to fetch campaigns');
                    setError('Failed to fetch campaigns. Please try again later.');
                }
            } catch (err) {
                console.error('Error fetching campaigns:', err);
                setError('An unexpected error occurred.');
            } finally {
                setLoading(false);
            }
        }

        fetchCampaigns();
    }, [session]);

    if (loading) {
        return <p className="text-center mt-10">Loading campaigns...</p>;
    }

    if (error) {
        return (
            <div className="text-center mt-10">
                <p className="text-red-600">{error}</p>
                {!session && (
                    <button
                        onClick={() => signIn()}
                        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Sign In
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">My Campaigns</h2>

            {campaigns.length === 0 ? (
                <p>No campaigns found.</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Message</th>
                            <th className="border border-gray-300 px-4 py-2">Recipients</th>
                            <th className="border border-gray-300 px-4 py-2">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns.map((campaign) => (
                            <tr key={campaign._id}>
                                <td className="border border-gray-300 px-4 py-2">{campaign.message}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {campaign.recipients.length} recipients
                                    <details>
                                        <summary className="text-blue-600 cursor-pointer">View Recipients</summary>
                                        <ul className="list-disc pl-6">
                                            {campaign.recipients.map((recipient) => (
                                                <li key={recipient.customerId}>
                                                    {recipient.name} ({recipient.email})
                                                </li>
                                            ))}
                                        </ul>
                                    </details>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {new Date(campaign.createdAt).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
