import Navbar from './Components/Navbar';
import './App.css';
import Home from './Pages/Home';
import About from './Pages/About';
import Register from './Pages/Register';
import Login from './Pages/Login';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Notes from './Pages/Notes';
import NoteState from './Context/Notes/NoteState';
import Alert from './Components/Alert';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (


    <NoteState>
         <ToastContainer />
    <div className="App dancing-script-custom relative">
       <BrowserRouter>
      <Navbar/>
      <Alert/>
     
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/notes' element={<Notes/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
    </NoteState>
  );
}

export default App;
