import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BackButton } from "@/components/BackButton";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <BackButton />
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4"
        />
        <Button type="submit" className="w-full mb-4">Login</Button>
        <Link to="/" className="text-blue-500 hover:underline mb-4">Назад</Link>
        <Link to="/signup" className="text-blue-500 hover:underline">Create an account</Link>
        <Link to="/forgot-password" className="text-blue-500 hover:underline mt-2">Забыли пароль?</Link>
      </form>
    </div>
  );
};

export default Login;
