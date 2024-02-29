import { useNavigate, useLocation } from "react-router-dom"
function Navbar() {
    const navigate = useNavigate() 
    const location = useLocation()

    const pathMatchRoute = (route)=>{
        if (route === location.pathname){
            return true
        }
    }
  return (
    <div className=" w-1/5 bg-orange-300 h-screen">
        <nav className="navbarNav">
            <ul className="navbarListItems">
                <li className="navbarListItem" onClick={()=>navigate('/')}>
                    {/* <ExploreIcon fill={pathMatchRoute('/')?'#2c2c2c':'#8f8f8f'} width={'36px'} height={'36px'}/> */}
                    <p className={pathMatchRoute('/')?'navbarListItemNameActive':'navbarListItemName'}>
                        User
                    </p>
                </li>
                <li className="navbarListItem cursor-pointer" onClick={()=>navigate('/room')}>
                    {/* <OfferIcon fill={pathMatchRoute('/offers')?'#2c2c2c':'#8f8f8f'} width={'36px'} height={'36px'}/> */}
                    <p className={pathMatchRoute('/offers')?'navbarListItemNameActive':'navbarListItemName'}>
                        Room
                    </p>
                </li>
                <li className="navbarListItem" onClick={()=>navigate('/lodge')}>
                    {/* <PersonOutlineIcon fill={pathMatchRoute('/profile')?'#2c2c2c':'#8f8f8f'} width={'36px'} height={'36px'}/> */}
                    <p className={pathMatchRoute('/profile')?'navbarListItemNameActive':'navbarListItemName'}>
                        Lodge
                    </p>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar