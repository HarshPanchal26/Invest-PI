import React, { useState, useContext } from "react"
import Post from "./components/Post"
import Suggestions from "../Component_DashBord/Suggestions"
import { ContextForDashBord } from "../../../context/contextForDashBord";
import Loading from "../../../Assets/Loading";
import axios from "../../../../axios.config";

export default function Feed() {

  const [loader, setLoader] = useState<boolean>(true);
  const [thoughts, SetThoughts] = useState<[] | null>(null);
  const contextForDashBord = useContext(ContextForDashBord);

  const fetchData = async () => {
    const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}feed/thoughts/all`);
    SetThoughts(res.data.newthoughts);
    setLoader(false);
    contextForDashBord.setArrayForNewThoughts(res.data.newthoughts)
  }

  React.useEffect(() => {

    if (!contextForDashBord.isAutorizedUser) {
      contextForDashBord.checkAuthorization();
    }
    if (contextForDashBord.isAutorizedUser && contextForDashBord.POSTS.length === 0) {
      fetchData()
    }
    else {
      console.log("After ", contextForDashBord.POSTS)
      SetThoughts(contextForDashBord.POSTS);
      setLoader(false);
    }
  }, [contextForDashBord.POSTS])

  if (!loader) {

    return (

      <div className='flex flex-row h-full'>
        {/*  component for posts/promition etc */}
        {thoughts !== null && (
          <div className='xl:w-4/6 w-full h-full overflow-auto scroll-m-1 '>
            <Post ArrayOfthoughts={thoughts} />
          </div>)
        }
        {thoughts == null &&
          <Loading />
        }
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
