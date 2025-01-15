import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  advisorId: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'closed'],
    default: 'active'
  }
}, {
  timestamps: true
});

export default mongoose.model('Chat', chatSchema);
