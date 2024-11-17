import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  totalSpending: { type: Number, required: true },
  visits: { type: Number, required: true },
  lastVisit: { type: Number, required: true },
  addedBy: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Customer || mongoose.model('Customer', customerSchema);
