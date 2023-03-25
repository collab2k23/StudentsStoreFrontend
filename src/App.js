import Login from "./pages/Login"
import Register from './pages/Register';
import Home from './pages/Home'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import VerifyOTP from "./pages/VerifyOTP";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/verification" element={<VerifyOTP/>}/>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
