import { UserCRMInterface } from '@/interface/user';
import { AuthState } from './AuthProvider';


type AuthActionType =
    | { type: '[Auth] - Login', payload: UserCRMInterface }
    | { type: '[Auth] - Update User', payload: Partial<UserCRMInterface> }
    | { type: '[Auth] - Logout', user: UserCRMInterface }


export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {

    switch (action.type) {
        case '[Auth] - Login':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            }

        case '[Auth] - Update User':
            return {
                ...state,
                user: {
                    ...state.user as UserCRMInterface,
                }
            }

        case '[Auth] - Logout':
            return {
                ...state,
                isLoggedIn: false,
                user: action.user
            }

        default:
            return state;
    }

}