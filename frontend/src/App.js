import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Creator from "./pages/Creator";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {

  return (
    <div className="App">
      <Router>
         <Routes>
           <Route exact path="/" element={<Home />}/>
           <Route exact path="/creator" element={<Creator />}/>
           <Route exact path="/signup" element={<Signup />}/>
           <Route exact path="/login" element={<Login />}/>
           <Route exact path="/profile" element={<Profile />}/>
           <Route exact path="*" element={<NotFound />} />
         </Routes>
      </Router>
    </div>
  );
}

export default App;
