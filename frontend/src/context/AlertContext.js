import React, { createContext, useState } from 'react';

const AlertContext = createContext();

const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState(null);

    return (
      <AlertContext.Provider value={{ alert, setAlert }}>
        {children}
      </AlertContext.Provider>
    );
  };

  export { AlertContext, AlertProvider };