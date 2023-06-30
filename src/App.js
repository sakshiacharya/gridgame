import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserInfo from './Pages/UserInfo';
import GameScreen from './Pages/GameScreen';
import Gameover from './Pages/Gameover';
function App() {
  return (
    <>
   
    <Router>
    <Routes>
      <Route exact path="/" element={<UserInfo/>} />
      <Route exact path="/gamedscreen" element={<GameScreen/>} />
      <Route exact path="/gameover" element={<Gameover/>} />
    </Routes>
  </Router>
  </>
  );
}

export default App;
