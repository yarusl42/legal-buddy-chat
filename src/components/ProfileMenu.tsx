import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Book, Settings, CreditCard, LogIn } from "lucide-react";

export const ProfileMenu = () => {
  const [isLoggedIn] = useState(false); // This should be replaced with actual auth state
  const userName = "John Doe"; // This should be replaced with actual user data

  return (
    <div className="fixed bottom-4 left-4">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg border p-2 hover:bg-accent">
          <Avatar>
            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{userName}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>{userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/laws" className="flex w-full items-center gap-2">
              <Book className="h-4 w-4" />
              Laws
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings" className="flex w-full items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/payments" className="flex w-full items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payments
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div className="flex w-full items-center gap-2">
              <LogIn className="h-4 w-4" />
              {isLoggedIn ? "Logout" : "Login"}
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};