import * as React from "react";
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastViewport,
} from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ErrorBannerProps {
  message: string;
  onClose: () => void;
}

const ErrorBanner: React.FC<ErrorBannerProps> = ({ message, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 600000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <>
      <Toast className="bg-destructive text-destructive-foreground border-none w-[90vw] sm:w-auto">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 sm:right-4 sm:top-4"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
        <div className="grid gap-1 p-2 sm:p-4">
          <ToastTitle className="text-base sm:text-lg font-bold">Error</ToastTitle>
          <ToastDescription className="mt-2 text-sm sm:text-base">{message}</ToastDescription>
        </div>
      </Toast>
      <ToastViewport />
    </>
  );
};

export default ErrorBanner;