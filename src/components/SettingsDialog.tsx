import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, Check, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsDialog = ({ isOpen, onClose }: SettingsDialogProps) => {
  const userDetails = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 8900",
  };

  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [phoneValue, setPhoneValue] = useState(userDetails.phone);
  const [tempPhone, setTempPhone] = useState(userDetails.phone);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userDetails.name);

  const handleSavePhone = () => {
    setPhoneValue(tempPhone);
    setIsEditingPhone(false);
    // Here you would typically make an API call to update the phone number
  };

  const handleCancelEdit = () => {
    setTempPhone(phoneValue);
    setIsEditingPhone(false);
  };

  const handleSaveName = () => {
    setTempName(tempName);
    setIsEditingName(false);
    // Here you would typically make an API call to update the name
  };

  const handleCancelNameEdit = () => {
    setTempName(userDetails.name);
    setIsEditingName(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl" closeButton={false}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Settings</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          <div className="rounded-lg border p-6 w-full">
            <h2 className="mb-4 text-xl font-semibold">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Name</label>
                {isEditingName ? (
                  <div className="mt-1 flex items-center gap-2">
                    <Input
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="max-w-[200px]"
                      autoFocus
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={handleSaveName}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={handleCancelNameEdit}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <p 
                      className="mt-1 cursor-pointer hover:text-primary transition-colors"
                      onClick={() => setIsEditingName(true)}
                    >
                      {userDetails.name || "-"}
                    </p>
                    <Pencil className="h-4 w-4 text-gray-500 cursor-pointer" onClick={() => setIsEditingName(true)} />
                  </div>
                )}
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Phone</label>
                {isEditingPhone ? (
                  <div className="mt-1 flex items-center gap-2">
                    <Input
                      value={tempPhone}
                      onChange={(e) => setTempPhone(e.target.value)}
                      className="max-w-[200px]"
                      autoFocus
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={handleSavePhone}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={handleCancelEdit}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <p 
                      className="mt-1 cursor-pointer hover:text-primary transition-colors min-w-[100px]"
                      onClick={() => setIsEditingPhone(true)}
                    >
                      {phoneValue || "-"}
                    </p>
                    <Pencil className="h-4 w-4 text-gray-500 cursor-pointer" onClick={() => setIsEditingPhone(true)} />
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="mt-1">{userDetails.email}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-semibold">Legal</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Terms of Use</span>
                <Link 
                  to="/terms"
                  onClick={onClose}
                >
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-between">
                <span>Privacy Policy</span>
                <Link
                  to="/privacy" 
                  onClick={onClose}
                >
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
