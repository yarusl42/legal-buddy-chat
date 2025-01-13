import { userService } from '@/services/userService';
import { chatService } from '@/services/chatService';
import { useAppDispatch } from '@/store/hooks';
import { setIsLoggedIn } from '@/store/slices/userSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const checkAuth = async () => {
    const token = localStorage.getItem('token'); 

    if (!token) {
      dispatch(setIsLoggedIn(false)); 
    } else {
      try {
        await userService.me(); 
        dispatch(setIsLoggedIn(true)); 
      } catch (error) {
        console.error('Error fetching user info:', error);
        dispatch(setIsLoggedIn(false)); 
      }

      try {
        await chatService.loadChats();
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    }
  };

  return checkAuth;
};