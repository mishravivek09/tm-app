import { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginContextProvider = ({ children }) => {
    const getCookie = (name) => {
        const cookieString = document.cookie;
        const cookies = cookieString.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                const value = cookie.substring(name.length + 1);
                return decodeURIComponent(value);
            }
        }
        return null;
    }
    const setCookie=(data)=> {
        let date = new Date(data);
        date.setTime(date.getTime() + 86400000);
        document.cookie = `tmuser=${JSON.stringify(
            data
        )};expires=${date.toUTCString()};path=/`;
    }
    const cookie = getCookie("tmuser");

    const [login, setLogin] = useState(JSON.parse(cookie));
    const handleLoginUpdate = (value) => {
        setCookie(value);
        setLogin(value);
    }
    return <LoginContext.Provider value={{ login, handleLoginUpdate }}>{children}</LoginContext.Provider>
}