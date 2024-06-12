import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './components/authentication/SignupPage';
import AuthPages from './components/authentication/Authpage';
import DashBoard from './components/dashboard/DashBoard';
import LoginPage from './components/authentication/Login';
import { AuthProvider } from './security/AuthContext';
import PrivateRoute from './security/PrivateRoute';



function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify" element={
            <PrivateRoute>
              <AuthPages />
            </PrivateRoute>
          } />
          <Route path="/" element={
            <PrivateRoute redirectTo='/home'>
              <DashBoard />
            </PrivateRoute>
          } />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
