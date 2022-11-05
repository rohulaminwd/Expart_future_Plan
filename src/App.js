import { Route, Routes } from 'react-router-dom';
import './App.css'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "aos/dist/aos.css";
import AOS from "aos";
import 'react-day-picker/dist/style.css';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import SignIn from './Pages/Registation/SignIn';
import SignUp from './Pages/Registation/SignUp';
import Blog from './Pages/Blog/Blog';
import RequireAuth from './Pages/Registation/RequireAuth';
import Dashboard from './Pages/Dashboard/Dashboard';
import Wallet from './Pages/Dashboard/Wallet';
import Team from './Pages/Dashboard/Team';
import Work from './Pages/Dashboard/Work';
import Profile from './Pages/Dashboard/Profile';
import WorkAbout from './Pages/Dashboard/WorkAbout';
import PlanDetails from './Pages/Dashboard/PlanDetails.';
import { useState } from 'react';
import useMe from './Hooks/useMe';
import Loading from './Share/Loading';



function App() {
  AOS.init();
  const [me, setMe, loading] = useMe();
  if(loading){
    <Loading />
  }
  console.log(me)
  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/blog' element={<Blog />}></Route>
        <Route path='/signIn' element={<SignIn />}></Route>
        <Route path='/signUp' element={<SignUp />}></Route>

        <Route path='/dashboard' element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }>
          <Route index element={<Wallet />}></Route>
          <Route path='team' element={<Team />}></Route>
          <Route path='about' element={<WorkAbout />}></Route>
          <Route path='work' element={<Work />}></Route>
          <Route path='me' element={<Profile />}></Route>
          <Route path='planDetails' element={<PlanDetails />}></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}
export default App;
