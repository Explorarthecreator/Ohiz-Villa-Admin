import { useEffect, useState, useRef } from "react";
// import { initializeApp } from "firebase/app";
import {getAuth, onAuthStateChanged} from 'firebase/auth'

export const useAuthStatus = ()=>{
    const [loggedIn, setLoggedIn] = useState(false)

    const [checkingStatus, setCheckingStatus] = useState(true)

    const isMounted = useRef(true)

    useEffect(()=>{

        if(isMounted){
            try {
                const auth = getAuth()

            onAuthStateChanged(auth, (user)=>{
                if(user){
                    setLoggedIn(true)
                }

                setCheckingStatus(false)
            })
            } catch (error) {
                console.log(error);
            }
        }

        return ()=>{
            isMounted.current = false
        }
    },[isMounted])

    return {loggedIn,checkingStatus}
}