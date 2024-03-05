import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Room from "./pages/Room";
import User from "./pages/User";
import Lodge from "./pages/Lodge";
import Signin from "./pages/Signin";
// import Ssd from "./pages/Ssd";
import MainNav from "./components/MainNav";
import PrivateRoute from "./components/PrivateRoute";
import { NavbarProvider } from "./context/navbarContext";
function App() {
  return (
    <NavbarProvider>
      <div className=" flex w-full">
        <Router>
          <Navbar/>
          <main className=" w-full lg:w-4/5 overflow-y-scroll h-screen overflow-x-hidden bg-white">
            <MainNav/>
            <Routes>
              <Route path="/" element={<PrivateRoute/>}>
                <Route path="/" element={<User/>}/>
              </Route>
              <Route path="/room" element={<PrivateRoute/>}>
                <Route path="/room" element={<Room/>}/>
              </Route>
              {/* <Route path="/room" element={<Room/>}/> */}
              <Route path="/lodge" element={<Lodge/>}/>
              <Route path="/signin" element={<Signin/>}/>
            </Routes>
          </main>
        </Router>
      </div>
    </NavbarProvider>
  );
}

export default App;
