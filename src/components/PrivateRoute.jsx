import { Navigate, Outlet } from "react-router-dom"
import { useAuthStatus } from "../hooks/useAuthStatus"
const PrivateRoute = ()=> {
  const{loggedIn, checkingStatus} = useAuthStatus()
// const loggedIn = false

  if(checkingStatus){
    return <p>
        Loading yen yen
    </p>
  }

  return loggedIn ? <Outlet/>: <Navigate to={'/signin'}/>
}

export default PrivateRoute