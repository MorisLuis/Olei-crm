import { createContext } from 'react';
import { UserCRMInterface } from '@/interface/user';

interface ContextProps {
  isLoggedIn: boolean;
  user: UserCRMInterface;
  loggingIn: boolean;
  modalBackgroundOpen: boolean;

  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => Promise<void>;
  openModalBackground: () => void;
}

export const AuthContext = createContext({} as ContextProps);
