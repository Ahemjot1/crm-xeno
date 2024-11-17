import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  items: Array,
  totalAmount: Number,
  orderDate: String,
});

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
