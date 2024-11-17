import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  message: { type: String, required: true }, 
  createdBy: { type: String, required: true }, 
  recipients: [
    {
      customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
      name: String,
      email: String,
    },
  ], 
  createdAt: { type: Date, default: Date.now }, 
});

export default mongoose.models.Campaign || mongoose.model('Campaign', campaignSchema);
