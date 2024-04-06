import { BrowserRouter as Router,Routes,Route,} from "react-router-dom";
import Main from './pages/Main';
import Verifypage from "./pages/Verifypage";



function App() {
  return (
    <>  
    
        <Routes>

        <Route path="/" element={<Main />}></Route>
        <Route path="verifykyc3" element={<Verifypage />}></Route>
        </Routes>
      
    </>
  );
}
export default App;