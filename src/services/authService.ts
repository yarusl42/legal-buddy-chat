const API_URL = 'https://your-api-url.com'; // Replace with your actual API URL

export const authService = {
  login: async (email: string, password: string) => {
    // Dummy function for login
    const token = 'dummy_token'; // Simulate a token
    localStorage.setItem('token', token); // Store the dummy token in local storage
    return token;
  },

  signup: async (userName: string, email: string, password: string) => {
    // Dummy function for signup
    const token = 'dummy_token'; // Simulate a token
    localStorage.setItem('token', token); // Store the dummy token in local storage
    return token;
  },

  forgotPassword: async (email: string) => {
    // Dummy function for forgot password
    return true; // Simulate successful password recovery request
  },

  verifyCode: async (code: string) => {
    // Dummy function to verify the recovery code
    // Simulate verification logic
    return code === '123456'; // Simulate valid code
  },
};
