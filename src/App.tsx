import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import ECommerce from './pages/Dashboard/ECommerce';
import FormLayout from './pages/Form/FormLayout';
import Tables from './pages/Tables';
import Settings from './pages/Settings';



function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
      <Route path="/" element={ <><PageTitle title="Signin " /><SignIn /></> }/>
      <Route path="/home" element={  <><PageTitle title="Home " /><ECommerce /></>}/>
      <Route path="/invoiceform" element={  <><PageTitle title="Create Invoice" /><FormLayout /></>}/>
      <Route  path="/tables"  element={ <><PageTitle title="Manage Invoice " /><Tables /></>}/> 
      <Route path="/settings" element={  <><PageTitle title="Settings " /><Settings /></>}/>       
      </Routes>
    </>
  );
}

export default App;
