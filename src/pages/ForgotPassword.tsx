import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MailOpen } from 'lucide-react';
import { BackButton } from "@/components/BackButton";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState(''); // New state variable
  const [isSubmitted, setIsSubmitted] = useState(false); // New state variable

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedEmail(email); // Set submittedEmail to the current email
    setEmail(''); // Clear the email input after submission
    setIsSubmitted(true); // Set the submitted state to true
  };

  const debuggSetEmail = (value: string) => {
    setEmail(value);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <BackButton />
      {isSubmitted ? (
        <div className="text-center">
          <div className="flex items-center justify-center">
            <MailOpen className="h-12 w-12 text-blue-500 mb-4" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Проверьте свой email</h1>
          <p>Инструкции по восстановлению пароля были отправлены на {submittedEmail}</p>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Забыли пароль?</h1>
          <form onSubmit={handleForgotPassword} className="w-full max-w-sm">
            <Input
              type="email"
              placeholder="Введите ваш email"
              value={email}
              onChange={(e) => (debuggSetEmail(e.target.value))}
              className="mb-4"
            />
            <Button type="submit" className="w-full">Отправить инструкции</Button>
          </form>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
