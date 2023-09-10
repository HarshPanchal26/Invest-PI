import React, { useState, useContext } from "react"
import Post from "./Component_DashBord/Post"
import Suggestions from "./Component_DashBord/Suggestions"
import { ContextForDashBord } from "../../context/contextForDashBord";
import Loading from "../../Assets/Loading";
import axios from "axios";

export default function Feed() {

  const [loader, setLoader] = useState<boolean>(true);  
  const [thoughts , SetThoughts] = useState([]);
  const contextForDashBord = useContext(ContextForDashBord);

  const fetchData = async()=>{
    const res = await axios.post('/feed/fetchposts');
    console.log("res" , res.data.data)
    SetThoughts(res.data.data);
    setLoader(false);
  }

  React.useEffect(() => {
    console.log("isAutorizedUser " ,contextForDashBord.isAutorizedUser)
    if (contextForDashBord.isAutorizedUser) {
      fetchData()
    } else {
      console.log('Not Authenticated')
      contextForDashBord.checkAuthorization();
    }
  }, [contextForDashBord])

  if (!loader) {

    return (

      <div className='flex flex-row h-full '>
        {/*  component for posts/promition etc */}
        <div className='flex flex-col md:w-4/6 w-full h-full overflow-auto scroll-m-1'>
          <Post ArrayOfthoughts={thoughts} />
        </div>
        {/* space for promotion and suggestions  */}
        <div className='md:flex flex-col hidden w-2/6 mx-2 '>
          <Suggestions />
        </div>
      </div>

    )
  } else {
    return (
      <Loading />
    )
  }
}
