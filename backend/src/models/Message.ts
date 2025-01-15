import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    enum: ['user', 'advisor'],
    required: true
  },
  liked: {
    type: Boolean,
    default: null
  }
}, {
  timestamps: true
});

export default mongoose.model('Message', messageSchema);
