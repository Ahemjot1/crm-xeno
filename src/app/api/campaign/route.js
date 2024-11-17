import connectDB from '../../utils/db';
import Campaign from '../../models/Campaign';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  await connectDB();
  const session = await getServerSession(authOptions);
  console.log(session.user)
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const campaigns = await Campaign.find({ createdBy: session.user.email }).sort({ createdAt: -1 });
    return new Response(JSON.stringify({ campaigns }), { status: 200 });
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return new Response(JSON.stringify({ error: 'Error fetching campaigns' }), { status: 500 });
  }
}
