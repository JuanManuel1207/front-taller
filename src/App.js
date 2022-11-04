import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Inicio from './components/inicio';
import Room from './components/rooms';
import Meet from './components/meets';
import Act from './components/acts';
import NavMenu from './components/layouts/navbar';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<NavMenu/>}>
            <Route index element={<Inicio/>}/>
            <Route path='rooms' element={<Room/>}/>
            <Route path='meets' element={<Meet/>}/>
            <Route path='acts' element={<Act/>}/>
            <Route path='*' element={<Navigate replace to='/'/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
