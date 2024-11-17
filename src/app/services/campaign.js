import CommunicationLog from '@/models/CommunicationLog';

export const sendCampaignMessage = async (audience, message) => {
  const logs = await Promise.all(audience.map(async (member) => {
    const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';
    const log = new CommunicationLog({
      customerId: member._id,
      message,
      status,
      timestamp: new Date(),
    });
    await log.save();
    return log;
  }));

  return logs;
};
