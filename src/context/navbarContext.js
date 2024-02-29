import { createContext, useState } from "react";
const navbarContext = createContext()

export const NavbarProvider = ({children})=>{


    const [shownav, setShownav] = useState(false)
    
    return <navbarContext.Provider value={{
        shownav,
        setShownav
    }}>
        {children}
    </navbarContext.Provider>
}

export default navbarContext