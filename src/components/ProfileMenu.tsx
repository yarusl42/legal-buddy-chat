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
import SettingsDialog from "./SettingsDialog";

export const ProfileMenu = () => {
  const [isLoggedIn] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const userName = "John Doe";

  return (
    <div className="fixed bottom-4 left-4">
      <SettingsDialog 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg border bg-white p-2 pr-3 hover:bg-accent">
          <Avatar>
            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{userName}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>{userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <a 
              href="https://adilet.zan.kz/rus" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex w-full items-center gap-2 cursor-pointer"
            >
              <Book className="h-4 w-4" />
              Laws
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsSettingsOpen(true)}>
            <div className="flex w-full items-center gap-2 cursor-pointer">
              <Settings className="h-4 w-4" />
              Settings
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/payments" className="flex w-full items-center gap-2 cursor-pointer">
              <CreditCard className="h-4 w-4" />
              Payments
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div className="flex w-full items-center gap-2 cursor-pointer">
              <LogIn className="h-4 w-4" />
              {isLoggedIn ? "Logout" : "Login"}
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};