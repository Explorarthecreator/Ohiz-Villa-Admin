import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Room from "./pages/Room";
import User from "./pages/User";
import Lodge from "./pages/Lodge";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import MainNav from "./components/MainNav";
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
              <Route path="/" element={<User/>}/>
              <Route path="/room" element={<Room/>}/>
              <Route path="/lodge" element={<Lodge/>}/>
              <Route path="/signin" element={<Signin/>}/>
              <Route path="/signup" element={<Signup/>}/>
            </Routes>
          </main>
        </Router>
      </div>
    </NavbarProvider>
  );
}

export default App;
