import { useNavigate, useLocation } from "react-router-dom"
import {FaUser, FaBuilding, FaBed, FaTimes} from 'react-icons/fa'
import { useContext } from "react"
import navbarContext from "../context/navbarContext"
function Navbar() {
    const navigate = useNavigate() 
    const location = useLocation()

    const pathMatchRoute = (route)=>{
        if (route === location.pathname){
            return true
        }
    }
    const {shownav,setShownav} = useContext(navbarContext)
  return (
        <nav className={` ${shownav?'absolute top-0 left-0 z-40':'hidden lg:flex'} w-2/3 md:w-1/2 lg:w-1/5 h-screen bg-[#f2f4f8] text-[#323131] flex flex-col items-center py-9 gap-12`}>
            <p className="absolute top-5 right-4 cursor-pointer text-2xl lg:hidden" onClick={()=>{setShownav(!shownav  )}}>
                <FaTimes />
            </p>
            <div className=" border-b-4 w-full"> 
                <div className=" bg-red-500 h-20 w-20 lg:w-28 lg:h-28  rounded-full m-auto"></div>
                <h1 className=" text-center my-5 font-semibold text-xl lg:text-3xl">
                    Ohiz Villa
                </h1>
            </div>
            <ul className=" w-4/5 md:w-4/5 lg:w-2/3">
                <li className={`cursor-pointer flex px-4 py-2 gap-4 items-center ${pathMatchRoute('/')?'bg-[#b4cd93] rounded-lg':''}`} onClick={()=>navigate('/')}>
                    <FaUser size={25}/>
                    <p className=' font-medium'>
                        User
                    </p>
                </li>
                <li className={`cursor-pointer flex px-4 py-2 gap-4 items-center ${pathMatchRoute('/room')?'bg-[#b4cd93] rounded-lg':''}`} onClick={()=>navigate('/room')}>
                    {/* <OfferIcon fill={pathMatchRoute('/offers')?'#2c2c2c':'#8f8f8f'} width={'36px'} height={'36px'}/> */}
                    <FaBed size={25}/>
                    <p className='font-medium'>
                        Room
                    </p>
                </li>
                <li className={`cursor-pointer flex px-4 py-2 gap-4 items-center ${pathMatchRoute('/lodge')?'bg-[#b4cd93] rounded-lg':''}`} onClick={()=>navigate('/lodge')}>
                    <FaBuilding size={25}/>
                    {/* <PersonOutlineIcon fill={pathMatchRoute('/profile')?'#2c2c2c':'#8f8f8f'} width={'36px'} height={'36px'}/> */}
                    <p className='font-medium'>
                        Lodge
                    </p>
                </li>
            </ul>
        </nav>
  )
}

export default Navbar