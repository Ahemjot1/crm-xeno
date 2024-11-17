import connectDB from '../../utils/db';
import CommunicationLog from '../../models/CommunicationLog';
import Customer from '../../models/Customer';
import Campaign from '../../models/Campaign'; 

export async function POST(request) {
  await connectDB();

  const { audienceIds, messageTemplate, createdBy } = await request.json(); 

  try {
   
    const logs = await Promise.all(
      audienceIds.map(async (customerId) => {
        const customer = await Customer.findById(customerId);
        if (!customer) return null;

        
        const personalizedMessage = messageTemplate.replace('[Name]', customer.name);

        
        const log = new CommunicationLog({
          customerId: customer._id,
          message: personalizedMessage,
        });
        await log.save();

      
        await updateDeliveryStatus(log._id);

        return {
          customerId: customer._id,
          name: customer.name,
          email: customer.email,
          message: personalizedMessage,
          status: 'PENDING',
        };
      })
    );

    
    const campaign = new Campaign({
      message: messageTemplate,
      createdBy,
      recipients: logs.map((log) => ({
        customerId: log.customerId,
        name: log.name,
        email: log.email,
      })),
    });

    await campaign.save();

    return new Response(JSON.stringify({ message: 'Messages sent and campaign logged', campaign }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error sending messages:', error);
    return new Response(JSON.stringify({ error: 'Error sending messages' }), { status: 500 });
  }
}


async function updateDeliveryStatus(logId) {
  const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';

  await fetch(`${process.env.BASE_URL}/api/deliveryReceipt`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ logId, status }),
  });
}
