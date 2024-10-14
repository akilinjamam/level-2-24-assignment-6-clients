/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { createContext, ReactNode, useContext, useState } from "react"


const AppContext = createContext<any>(undefined);

export const AppWrapper = ({children} : {children: ReactNode}) => {
    const [open, setOpen] = useState(false);
    return (
        <AppContext.Provider value={{open, setOpen}}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}