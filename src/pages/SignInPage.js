import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { FadeLoader } from 'react-spinners';
import { SignUpForm } from '../components/SignUpForm';
import { SignInForm } from '../components/SignInForm';
const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
};
export const SignInPage = () => {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [showRegister, setShowRegister] = useState(false);
    useEffect(() => {
        setLoading(false);
    }, []);
    const handleShowRegister = () => {
        setShowRegister(!showRegister);
    };
    return loading ? (_jsx("div", { className: 'mt-60 flex justify-center text-center text-sky-400 ', children: _jsx(FadeLoader, { color: '#00a8e8', loading: loading, css: override, size: 150 }) })) : (_jsx(_Fragment, { children: showRegister ? (_jsx(SignUpForm, { handleShowRegister: handleShowRegister, setMessage: setMessage })) : (_jsx(SignInForm, { handleShowRegister: handleShowRegister, message: message })) }));
};
