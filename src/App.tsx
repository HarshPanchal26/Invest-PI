import React, { useEffect, useState } from 'react';
import './App.css';
import IndexForRoute from './components/Route/index.route'
import { useNavigate } from 'react-router-dom';
import Loading from './Assets/Loading';

function App() {
  const [Loader, setLoader] = useState<boolean>(true);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (window.location.protocol === 'http:') {
  //     const httpsURL = 'https://' + window.location.host + window.location.pathname;
  //     navigate(httpsURL, { replace: true });
  //   } else {
  //     setLoader(false);
  //   }

  // }, [navigate]);

  return (
    <>
      {/* {!Loader && (<div className='App border w-full h-screen overflow-auto'>
      </div>)}
    {Loader && <Loading />} */}
    <IndexForRoute />
    </>
  );
}

export default App;

