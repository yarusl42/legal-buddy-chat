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
import { useAppSelector } from "@/store/hooks";
import { userService } from "@/services/userService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "react-toastify";

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsDialog = ({ isOpen, onClose }: SettingsDialogProps) => {
  const userName = useAppSelector((state) => state.user.name);
  const userPhone = useAppSelector((state) => state.user.phone);
  const userEmail = useAppSelector((state) => state.user.email);
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  const [tempPhone, setTempPhone] = useState(userPhone);
  const [tempName, setTempName] = useState(userName);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);

  const handleSavePhone = () => {
    userService.updateMe(userName, tempPhone);
    setIsEditingPhone(false);
  };

  const handleCancelEdit = () => {
    setTempPhone(userPhone);
    setIsEditingPhone(false);
  };

  const handleSaveName = () => {
    userService.updateMe(tempName, userPhone);
    setIsEditingName(false);
  };

  const handleCancelNameEdit = () => {
    setTempName(userName);
    setIsEditingName(false);
  };

  const handlePasswordReset = async () => {
    if (newPassword !== repeatPassword) {
      toast.error("New passwords don't match");
      return;
    }

    try {
      await userService.resetPassword(oldPassword, newPassword, repeatPassword);
      toast.success("Password updated successfully");
      setOldPassword("");
      setNewPassword("");
      setRepeatPassword("");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred while updating the password");
      }
    }
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

        <Tabs defaultValue="general" className="w-full">
          {isLoggedIn && (
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
          )}

          <TabsContent value="general" className="space-y-6">
            {isLoggedIn ? (
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
                          {userName || "-"}
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
                          {userPhone || "-"}
                        </p>
                        <Pencil className="h-4 w-4 text-gray-500 cursor-pointer" onClick={() => setIsEditingPhone(true)} />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="mt-1">{userEmail}</p>
                  </div>
                </div>
              </div>
            ) : ''}
            
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
          </TabsContent>
          {isLoggedIn && (
            <TabsContent value="security" className="space-y-6">
              <div className="rounded-lg border p-6">
                <h2 className="mb-4 text-xl font-semibold">Change Password</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Current Password</label>
                    <Input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">New Password</label>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Repeat New Password</label>
                    <Input
                      type="password"
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <Button 
                    onClick={handlePasswordReset}
                    className="w-full"
                  >
                    Update Password
                  </Button>
                </div>
              </div>
              <div className="text-center mt-4">
                <Link onClick={onClose} to="/forgot-password" className="text-blue-500 hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;