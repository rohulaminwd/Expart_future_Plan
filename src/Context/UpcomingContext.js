
import React, { createContext, useContext } from "react";
import useMe from "../Hooks/useMe";


const MeContext = createContext();

export const StateContext = ({ children }) => {
  const [me, setMe, loading] = useMe();

  return (
    <MeContext.Provider value={[me, setMe, loading]}>
         {children}
    </MeContext.Provider>
  );
};

export const UseMeContext = () => useContext(MeContext);
