import { jsx as _jsx } from "react/jsx-runtime";
import { Login, Logout, GetCurrentUser } from '../Auth';
import { createContext, useState, useEffect } from 'react';
export const UserContext = createContext({});
const UserContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [loggedUser, setLoggedUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const user = GetCurrentUser();
        if (user) {
            setIsLoggedIn(true);
        }
    }, []);
    const handleLogin = async (email, password, rememberMe) => {
        try {
            const response = await Login(email, password, rememberMe);
            setIsLoggedIn(true);
            setLoggedUser(response?.user);
            return response;
        }
        catch (error) {
            throw { message: error?.message };
        }
    };
    const handleLogout = () => {
        setToken(null);
        setLoggedUser(null);
        setIsLoggedIn(false);
        Logout();
    };
    const contextValue = {
        isLoggedIn,
        loggedUser,
        handleLogin,
        handleLogout,
        setLoggedUser,
        setToken,
    };
    return _jsx(UserContext.Provider, { value: contextValue, children: children });
};
export default UserContextProvider;
