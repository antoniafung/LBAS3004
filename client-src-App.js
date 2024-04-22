import { BrowserRouter, Routes, Route } from "react-router-dom";
import Display from "./mottak/Display"; // mappas navn i egen pc -> jsx fils navn
import Add from "./mottak/Add";
import Update from "./mottak/Update";
import SearchBar from "./mottak/SearchBar";
import "./style.css"


/*
1. taste inn "npm start" i terminal etter å ha gått inn de riktige filene - backend/frontend
2. Kodene her er vist i "localhost:3000"
*/
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Display/>} /> 
          <Route path="/add" element={<Add/>} />
          <Route path="/search" element={<SearchBar/>} />
          <Route path="/update/:id" element={<Update/>} />  {/*remember to specific "id" in the link of update*/}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
