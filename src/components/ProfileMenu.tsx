import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Book, Settings, CreditCard, LogIn, LogOut } from "lucide-react";
import SettingsDialog from "./SettingsDialog";
import { useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { setIsLoggedIn } from '@/store/slices/userSlice';
import { useAppDispatch } from '@/store/hooks';
import { clearAllUser } from '@/store/slices/userSlice';
import { clearAllChats } from '@/store/slices/chatsSlice';
import { clearAllAdvisors } from '@/store/slices/advisorsSlice';
import { clearAllBillingState } from '@/store/slices/billingSlice';
import { clearAllMessages } from '@/store/slices/messagesSlice';
import { clearAllPaymentMethods } from '@/store/slices/paymentMethodsSlice';
import { clearAllPlans } from '@/store/slices/plansSlice';

export const ProfileMenu = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const userName = useAppSelector((state) => state.user.name);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      {!isLoggedIn && (location.pathname == "/" || location.pathname == "/login" || location.pathname == "/signup" || location.pathname == "/forgot-password")  ? (<></>) : (
        <div className="z-50">
          <SettingsDialog 
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
          />
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg border bg-white p-2 pr-3 hover:bg-accent shadow-sm">
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                <AvatarFallback className="text-sm sm:text-base">{userName?.charAt(0) ?? "A"}</AvatarFallback>
              </Avatar>
              <span className="text-sm sm:text-base hidden sm:inline">{userName ?? "Anon"}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel className="text-sm sm:text-base">{userName ?? "Anon"}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <a 
                  href="https://adilet.zan.kz/rus" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex w-full items-center gap-2 cursor-pointer text-sm sm:text-base"
                >
                  <Book className="h-4 w-4" />
                  Laws
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setIsSettingsOpen(true)} className="text-sm sm:text-base">
                <div className="flex w-full items-center gap-2 cursor-pointer">
                  <Settings className="h-4 w-4" />
                  Settings
                </div>
              </DropdownMenuItem>
              {isLoggedIn && (
                <DropdownMenuItem asChild>
                  <Link to="/payments" className="flex w-full items-center gap-2 cursor-pointer text-sm sm:text-base">
                    <CreditCard className="h-4 w-4" />
                    Payments
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-sm sm:text-base">
                { isLoggedIn ? (
                  <div onClick={() => {
                    dispatch(logout());
                    dispatch(setIsLoggedIn(false));
                    dispatch(clearAllUser()); 
                    dispatch(clearAllChats())
                    dispatch(clearAllAdvisors())
                    dispatch(clearAllMessages())
                    dispatch(clearAllPaymentMethods())
                    dispatch(clearAllPlans())
                    dispatch(clearAllBillingState())
                    navigate('/login', { replace: true });
                  }} className="flex w-full items-center gap-2 cursor-pointer">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </div>
                ) : (
                  <Link to="/login" className="flex w-full items-center gap-2 cursor-pointer">
                    <LogIn className="h-4 w-4" />
                    Login
                  </Link>
                )}
                
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </>
  );
};