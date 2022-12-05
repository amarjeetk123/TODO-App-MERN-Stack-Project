
import './App.css';

import Homepage from './component/Homepage';
import {BrowserRouter , Route , Routes} from "react-router-dom"

import Login from './component/Login';
import Signup from './component/Signup';

function App() {
  return (
  
    <BrowserRouter>
    <Routes>
      <Route path='/' element = { <Signup /> } />
      <Route path='/login' element = { <Login /> } />
      <Route path='/home' element = { <Homepage /> } />
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
