import React, {useState} from 'react'

export const Context = React.createContext();

export const ContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
  
    return (
        <Context.Provider value={{ loading, setLoading }}>
            {children}
        </Context.Provider>
    );
};