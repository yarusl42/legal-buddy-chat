import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BackButton } from "@/components/BackButton";
import { Separator } from "@/components/ui/separator";
import { useGoogleLogin } from '@react-oauth/google';
import { userService } from '@/services/userService';
import { useToast } from "@/components/ui/use-toast";

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await userService.signup(userName, email, password);
      navigate('/chat');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign up. Please try again.",
      });
    }
  };

  const googleSignup = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        // In a real app, you would send this token to your backend
        console.log('Google OAuth token:', response.access_token);
        // For demo purposes, we'll just sign up the user
        await userService.signup('Demo User', 'demo@example.com', 'password');
        navigate('/chat');
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to sign up with Google.",
        });
      }
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Google sign up failed.",
      });
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <BackButton />
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-600 mt-2">Create your account to get started.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full">Sign Up</Button>
        </form>

        <div className="relative">
          <Separator className="my-4" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-gray-50 px-2 text-sm text-gray-500">Or continue with</span>
          </div>
        </div>

        <Button 
          type="button" 
          variant="outline" 
          className="w-full"
          onClick={() => googleSignup()}
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4 mr-2" />
          Sign up with Google
        </Button>

        <div className="text-center">
          <Link to="/login" className="text-sm text-primary hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;