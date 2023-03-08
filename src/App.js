import { BrowserRouter as Router } from "react-router-dom";
import './App.css'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "aos/dist/aos.css";
import AOS from "aos";
import 'react-day-picker/dist/style.css';
import RouteList from "./RouteList/RouteList";
import { createContext } from "react";
import useMe from "./Hooks/useMe";
import useAllUsers from "./Hooks/useAllUsers";
import useTask from "./Hooks/useTask";
import usePlan from "./Hooks/usePlan";
import useRequest from "./Hooks/useRequest";

export const MeContext = createContext();
export const TaskContext = createContext()
export const UserContext = createContext()
export const PlanContext = createContext()
export const RequestContext = createContext()


function App() {
  AOS.init();

  const [me, meLoading, meRefetch, meError, setMeData] = useMe();
  const [users, userLoading, userRefetch, userError, blocked] = useAllUsers();
  const [task, taskLoading, taskRefetch, taskError] = useTask();
  const [plan, planLoading, planRefetch, plankError] = usePlan();
  const [request, requestLoading, requestRefetch, requestError] = useRequest();

  return (
    <div className=''>

    <UserContext.Provider value={[users, userLoading, userRefetch, userError, blocked]}>
      <TaskContext.Provider value={[task, taskLoading, taskRefetch, taskError]}>
        <PlanContext.Provider value={[plan, planLoading, planRefetch, plankError]}>
          <RequestContext.Provider value={[request, requestLoading, requestRefetch, requestError]}>
            <MeContext.Provider value={[me, meLoading, meRefetch, meError, setMeData]}>
              <Router>
                <RouteList />
              </Router>
            </MeContext.Provider>
          </RequestContext.Provider>
        </PlanContext.Provider>
      </TaskContext.Provider>
    </UserContext.Provider>
      
    <ToastContainer />
    </div>
  );
}
export default App;
