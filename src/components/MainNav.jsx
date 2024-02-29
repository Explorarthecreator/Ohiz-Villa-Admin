import React, { useContext } from 'react'
import navbarContext from '../context/navbarContext'

function MainNav() {
    const {shownav, setShownav} = useContext(navbarContext)
    // const [displayNav, setDisplayNav] = useState(false)
  return (
    <div>
        <button className='btn block lg:hidden' onClick={()=>{
            console.log(shownav);
            setShownav(!shownav)
            }}>
            Click me
        </button>
    </div>
  )
}

export default MainNav