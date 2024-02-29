import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Room from "./pages/Room";
import User from "./pages/User";
import Lodge from "./pages/Lodge";
function App() {
  return (
    <div className=" flex w-full">
      <Router>
        <Navbar/>
        <main className=" w-4/5 overflow-y-scroll h-screen overflow-x-hidden">
          <Routes>
            <Route path="/" element={<User/>}/>
            <Route path="/room" element={<Room/>}/>
            <Route path="/lodge" element={<Lodge/>}/>
          </Routes>
        </main>
      </Router>
      
    </div>
  );
}

export default App;
