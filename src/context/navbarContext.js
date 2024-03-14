import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const navbarContext = createContext()

export const NavbarProvider = ({children})=>{


    const [shownav, setShownav] = useState(false)
    const [loggedIn, setLoggedIn] = useState()
    const auth = getAuth()

    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
              setLoggedIn(true)
            }
            else{
              setLoggedIn(false)
            //   console.log('Logged out');
            }
           })
           // eslint-disable-next-line
    },[])
    return <navbarContext.Provider value={{
        shownav,
        loggedIn,
        setLoggedIn,
        setShownav
    }}>
        {children}
    </navbarContext.Provider>
}

export default navbarContext