import Customer from '../models/Customer';

export const getSegmentedAudience = async (criteria) => {
  const query = {};

  if (criteria.totalSpending) query.totalSpending = { $gt: criteria.totalSpending };
  if (criteria.visits) query.visits = { $lte: criteria.visits };
  if (criteria.lastVisit) query.lastVisit = { $lt: new Date(Date.now() - criteria.lastVisit) };

  return await Customer.find(query);
};
