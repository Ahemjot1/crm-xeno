import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  message: { type: String, required: true }, // The campaign message
  createdBy: { type: String, required: true }, // Email of the user who created the campaign
  recipients: [
    {
      customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
      name: String,
      email: String,
    },
  ], // List of recipients
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

export default mongoose.models.Campaign || mongoose.model('Campaign', campaignSchema);
