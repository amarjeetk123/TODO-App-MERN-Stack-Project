
import './App.css';

import Homepage from './component/Homepage';
import {BrowserRouter , Route , Routes} from "react-router-dom"

import Login from './component/Login';
import Signup from './component/Signup';

function App() {
  return (
    // <div className="App">
    //   <Navbar />
    //   <Form />
    //   <Todos />
      
    // </div>
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
