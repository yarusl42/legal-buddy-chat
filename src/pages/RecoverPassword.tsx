import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from 'react-router-dom';
import { authService } from '@/services/authService';
import { toast } from 'react-toastify';
import { useAppSelector } from "@/store/hooks";
import { Spinner } from "@/components/ui/spinner";

const RecoverPassword = () => {
  const { code } = useParams<{ code: string }>(); // Get the code from the URL parameters
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [loading, setLoading] = useState(false); // New loading state
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyCode = async () => {
      setLoading(true); // Set loading to true while verifying
      const isValid = await authService.verifyCode(code); // Call the dummy API to verify the code
      setLoading(false); // Set loading to false after verification
      if (!isValid) {
        toast.error('Invalid code. Redirecting to login.');
        setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
      }
    };
    verifyCode();
  }, [code, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send a request to your backend to update the password
    // Simulate successful password update
    toast.success('Password updated successfully!');
    if (isLoggedIn) {
      navigate('/'); 
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      {loading ? ( // Conditional rendering for loading state
        <div className="flex justify-center items-center h-screen">
          <Spinner size={32} />
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Установите новый пароль</h1>
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <Input
              type="password"
              placeholder="Новый пароль"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mb-4"
            />
            <Input
              type="password"
              placeholder="Повторите новый пароль"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="mb-4"
            />
            <Button type="submit" className="w-full">Сохранить новый пароль</Button>
          </form>
        </>
      )}
    </div>
  );
};

export default RecoverPassword;
