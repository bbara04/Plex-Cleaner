import { createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";

const MediaContext = createContext(null);

export function useFunctionContext() {
  return useContext(MediaContext);
}

export function MediaProvider({children}) {
    
    
    return (
        <MediaContext.Provider value={{}}>
        {children}
        </MediaContext.Provider>
    );
}