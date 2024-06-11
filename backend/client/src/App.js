import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './components/authentication/SignupPage';
import AuthPages from './components/authentication/Authpage';
import DashBoard from './components/dashboard/DashBoard';



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp/>}/>
        <Route path="/verify" element={<AuthPages/>}/>
        <Route path='/home' element={<DashBoard/>}/>
      </Routes>
    </>
  );
}

export default App;
