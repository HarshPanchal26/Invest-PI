import React, { useEffect, useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import IndexForRoute from './components/Route/index.route'
import Loading from './Assets/Loading';

function App() {
  const [loader, setLoader] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.protocol === 'http:') {
      const httpsURL = 'https://' + window.location.host + window.location.pathname;
      navigate(httpsURL, { replace: true });
    }else{
      setLoader(false)
    }
  }, [navigate]);

  return (
    <>
      {!loader && <IndexForRoute />}
      {loader && <Loading />}
    </>
  );
}

export default App;

