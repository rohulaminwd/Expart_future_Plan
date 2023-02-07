import { BrowserRouter as Router } from "react-router-dom";
import './App.css'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "aos/dist/aos.css";
import AOS from "aos";
import 'react-day-picker/dist/style.css';
import RouteList from "./RouteList/RouteList";
import { createContext } from "react";
import { useQuery } from "react-query";

export const Context = createContext();


function App() {
  AOS.init();
    const getFacts = async () => {
      const res = await fetch('https://efp-usa-server-site.vercel.app/api/v1/user/me', {
              method: 'GET',
              headers: {
                  'authorization': `Bearer ${localStorage.getItem('accessToken')}`
              }
          });
      return res.json();
    };
    // Using the hook
    const {data, error, refetch, isLoading} = useQuery('me', getFacts);

  return (
    <div className=''>
      
      <Context.Provider value={[data, isLoading, refetch, error]}>
        <Router>
          <RouteList />
        </Router>
      </Context.Provider>
      
      <ToastContainer />
    </div>
  );
}
export default App;
