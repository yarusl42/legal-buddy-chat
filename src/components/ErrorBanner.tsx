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
      <Toast className="bg-destructive text-destructive-foreground border-none">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
        <div className="grid gap-1">
          <ToastTitle className="text-lg font-bold">Error</ToastTitle>
          <ToastDescription className="mt-2">{message}</ToastDescription>
        </div>
      </Toast>
      <ToastViewport />
    </>
  );
};

export default ErrorBanner;
