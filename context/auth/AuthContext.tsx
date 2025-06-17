import { createContext } from 'react';
import { UserCRMInterface } from '@/interface/user';

export interface AuthContextProps {
  isLoggedIn: boolean;
  user: UserCRMInterface;
  loggingIn: boolean;
  modalBackgroundOpen: boolean;

  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => Promise<void>;
  openModalBackground: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);
