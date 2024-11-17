// src/app/api/deliveryReceipt/route.js
import connectDB from '../../utils/db';
import CommunicationLog from '../../models/CommunicationLog';

export async function PATCH(request) {
  await connectDB();

  const { logId, status } = await request.json();

  try {
    const log = await CommunicationLog.findByIdAndUpdate(logId, { status }, { new: true });
    if (!log) {
      return new Response(JSON.stringify({ error: 'Log not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Status updated', log }), { status: 200 });
  } catch (error) {
    console.error('Error updating delivery status:', error);
    return new Response(JSON.stringify({ error: 'Error updating delivery status' }), { status: 500 });
  }
}
