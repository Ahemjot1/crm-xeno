// src/models/CommunicationLog.js
import mongoose from 'mongoose';

const communicationLogSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ['PENDING', 'SENT', 'FAILED'],
    default: 'PENDING',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.CommunicationLog || mongoose.model('CommunicationLog', communicationLogSchema);
