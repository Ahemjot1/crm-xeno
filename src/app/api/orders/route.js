// src/app/api/orders/route.js
import connectDB from '../../utils/db';
import Order from '../../models/Order';

export async function POST(request) {
  await connectDB();

  const { customerId, items, totalAmount, orderDate } = await request.json();

  await new Order({ customerId, items, totalAmount, orderDate }).save();

  return new Response(JSON.stringify({ message: 'Order added successfully!' }), {
    status: 201,
  });
}
