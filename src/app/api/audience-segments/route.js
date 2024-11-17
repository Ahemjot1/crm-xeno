import connectDB from '../../utils/db';
import Customer from '../../models/Customer';

export async function POST(request) {
    await connectDB();

    const { totalSpending, visits, lastVisit, operator } = await request.json();

    let query = {};

    const conditions = [];
    if (totalSpending) conditions.push({ totalSpending: { $gt: totalSpending } });
    if (visits) conditions.push({ visits: { $lte: visits } });
    if (lastVisit) {
        const date = new Date();
        date.setMonth(date.getMonth() - lastVisit);
        conditions.push({ lastVisit: { $lt: date } });
    }

    if (operator === 'OR') {
        query = { $or: conditions };
    } else {
        query = { $and: conditions };
    }

    try {

        const audience = await Customer.find(query);
        return new Response(JSON.stringify({ audience }), { status: 200 });
    } catch (error) {
        console.error('Error fetching audience segment:', error);
        return new Response(JSON.stringify({ error: 'Error fetching audience segment' }), { status: 500 });
    }
}
