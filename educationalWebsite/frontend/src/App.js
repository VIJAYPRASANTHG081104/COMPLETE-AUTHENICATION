import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Username from './component/Username'
import Password from './component/Password'
import Profile from './component/Profile'
import PagenotFound from './component/PagenotFound'
import Recovery from './component/Recovery'
import Reset from './component/Reset'
import Register from './component/Register'
import { Authorization,ProtectRoute } from './middleware/auth';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Username/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/password' element={<ProtectRoute><Password/></ProtectRoute>}/>
      <Route path='/profile' element={<Authorization><Profile/></Authorization>}/>
      <Route path='/recovery' element={<Recovery/>}/>
      <Route path='/reset' element={<Reset/>}/>
      <Route path='*' element={<PagenotFound/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
