import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  doneOnboarding: {
    type: Boolean,
    default: false
  },
  currentPlan: {
    type: String,
    default: 'Free'
  }
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);
