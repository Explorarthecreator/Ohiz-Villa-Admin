import { Navigate, Outlet } from "react-router-dom"
import { useAuthStatus } from "../hooks/useAuthStatus"
import Spinner from "./Spinner"
const PrivateRoute = ()=> {
  const{loggedIn, checkingStatus} = useAuthStatus()
// const loggedIn = false
// const checkingStatus = true

  if(checkingStatus){
    return <Spinner/>
  }

  return loggedIn ? <Outlet/>: <Navigate to={'/signin'}/>
}

export default PrivateRoute