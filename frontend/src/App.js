import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Creator from "./pages/Creator";

function App() {

  return (
    <div className="App">
      <Router>
         <Routes>
           <Route exact path="/" element={<Home />}/>
           <Route exact path="/creator" element={<Creator />}/>
         </Routes>
      </Router>
    </div>
  );
}

export default App;
