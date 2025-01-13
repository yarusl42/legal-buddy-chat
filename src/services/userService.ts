import { store } from "@/store";
import { setCurrentPlan } from "@/store/slices/plansSlice";
import { setOnboardingDone, setName, setPhone, setUser } from "@/store/slices/userSlice";

const initIser = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1234567890',
  doneOnboarding: true
};
const initPlan = 'Free';

const validatePassword = (password: string) => {
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    throw new Error('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    throw new Error('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    throw new Error('Password must contain at least one digit');
  }
}

export const userService = {
  me: async () => {
    const responseData = { user: initIser, plan: initPlan }
    const { user, plan } = responseData;
    store.dispatch(setUser(user))
    store.dispatch(setCurrentPlan(plan))
    return responseData
  },
  signup: async (userName: string, email: string, password: string, repeatPassword: string) => {
    // Dummy function for signup
    if (password !== repeatPassword) {
      throw new Error('Passwords do not match');
    }
    validatePassword(password);
    const token = 'dummy_token'; // Simulate a token
    localStorage.setItem('token', token); // Store the dummy token in local storage
    return token;
  },
  login: async (email: string, password: string) => {
    const token = 'dummy_token'; // Simulate a token
    localStorage.setItem('token', token); // Store the dummy token in local storage
    return token;
  },
  setOnboardingDone: async (value: boolean = true) => {
    store.dispatch(setOnboardingDone(value))
  },
  updateMe: async (name: string, phone: string) => {
    store.dispatch(setName(name))
    store.dispatch(setPhone(phone))
    return {
      name,
      phone,
    };
  },
  deleteMe: async () => {
    return {
      status: 'ok'
    };
  },
  resetPassword: async (oldPassword: string, newPassword: string, repeatPassword: string) => {
    validatePassword(newPassword);
    if (newPassword !== repeatPassword) {
      throw new Error('Passwords do not match');
    }
    return {
      status: 'ok'
    };
  }
};
