import React, { useContext } from 'react'
import { FaHamburger } from 'react-icons/fa'
import navbarContext from '../context/navbarContext'

function MainNav() {
    const {shownav, setShownav} = useContext(navbarContext)
    // const [displayNav, setDisplayNav] = useState(false)
  return (
    <div className='w-full h-16 lg:h-24 mb-2 lg:mb-6 flex items-center px-3'>
        <button className='btn btn-outline block lg:hidden  ' onClick={()=>{
            console.log(shownav);
            setShownav(!shownav)
            }}>
            <FaHamburger size={25} color='black'/>
        </button>
    </div>
  )
}

export default MainNav