import { BrowserRouter as Router,Routes,Route,} from "react-router-dom";
import Main from './pages/Main';
import Verifypage from "./pages/Verifypage";
import SearchBar from "./component/SearchBar.jsx"
function App() {
  return (
    <>  
    {/* <video className="top-1 z-0" src={Videobg2} autoPlay loop muted/>
        <Routes>

        <Route path="/" element={<Main />}></Route>
        <Route path="verifykyc3" element={<Verifypage />}></Route>
        </Routes>

      */}
      <SearchBar/>
      
    </>
  );
}
export default App;