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
    SetThoughts(res.data.data);
    setLoader(false);
    contextForDashBord.POSTS = [...res.data.data];
    console.log("contextForDashBord.POSTS" , contextForDashBord.POSTS);
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

      <div className='flex flex-row h-full'>
        {/*  component for posts/promition etc */}
        <div className='xl:w-4/6 w-full h-full overflow-auto scroll-m-1 '>
          <Post ArrayOfthoughts={thoughts} />
        </div>
        {/* space for promotion and suggestions  */}
        <div className='xl:flex flex-col hidden w-2/6 mx-2 '>
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
