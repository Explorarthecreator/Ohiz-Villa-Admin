import React, { useContext } from 'react'
import { FaHamburger } from 'react-icons/fa'
import navbarContext from '../context/navbarContext'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
// import { useState } from 'react'

function MainNav() {
    const {shownav, setShownav, loggedIn,setLoggedIn} = useContext(navbarContext)
     const auth = getAuth()
    
    //  const user = auth.currentUser
     const navigate = useNavigate()
    // const [displayNav, setDisplayNav] = useState(false)

    const logOut = ()=>{
      auth.signOut()
      navigate('/signin')
      console.log(auth.currentUser);
      onAuthStateChanged(auth,(user)=>{
        if(user){
          setLoggedIn(true)
        }
        else{
          setLoggedIn(false)
          console.log('Logged out');
        }
       })
    }
  return (
    <div className='w-full h-16 lg:h-24 mb-2 lg:mb-6 flex justify-between items-center px-3 border-b-2 shadow-lg'>
        <button className='btn btn-outline block lg:hidden  ' onClick={()=>{
            console.log(shownav);
            setShownav(!shownav)
            }}>
            <FaHamburger size={25} color='black'/>
        </button>

        <button className={`btn btn-md ${loggedIn?'block':'hidden'} text-white bg-black`} onClick={logOut}>
          Logout
        </button>
    </div>
  )
}

export default MainNav