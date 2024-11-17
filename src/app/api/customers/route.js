import connectDB from '../../utils/db';
import Customer from '../../models/Customer';

export async function POST(request) {
  await connectDB();

  const { name, email, totalSpending, visits, lastVisit, addedBy } = await request.json();

  const customer = new Customer({ name, email, totalSpending, visits, lastVisit, addedBy });

  await customer.save();
  return new Response(JSON.stringify({ message: 'Customer added successfully!' }), {
    status: 201,
  });
}

