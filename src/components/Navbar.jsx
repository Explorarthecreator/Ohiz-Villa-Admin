import { useNavigate, useLocation } from "react-router-dom"
import {FaUser, FaBuilding, FaBed} from 'react-icons/fa'
function Navbar() {
    const navigate = useNavigate() 
    const location = useLocation()

    const pathMatchRoute = (route)=>{
        if (route === location.pathname){
            return true
        }
    }
  return (
        <nav className="w-1/5 h-screen bg-[#6a6969] text-[#323131] flex flex-col items-center py-9 gap-12">
            <div className=" bg-red-500 w-28 h-28 rounded-full"></div>
            <ul className=" w-2/3">
                <li className={`cursor-pointer flex px-4 py-2 gap-4 items-center ${pathMatchRoute('/')?'bg-[#b4cd93] rounded-lg':''}`} onClick={()=>navigate('/')}>
                    {/* <ExploreIcon fill={pathMatchRoute('/')?'#2c2c2c':'#8f8f8f'} width={'36px'} height={'36px'}/> */}
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