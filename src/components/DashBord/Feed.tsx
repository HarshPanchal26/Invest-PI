import React, { useState, useContext } from "react"
import Post from "./Component_DashBord/Post"
import Suggestions from "./Component_DashBord/Suggestions"
import { ContextForDashBord } from "../../context/contextForDashBord";
import Loading from "../../Assets/Loading";

export default function Feed() {

  const [loader, setLoader] = useState<boolean>(true);  

  const contextForDashBord = useContext(ContextForDashBord);

  React.useEffect(() => {
    if (contextForDashBord.isAutorizedUser) {
      setLoader(false);
      console.log("Data is now here", contextForDashBord.USER);
    } else {
      contextForDashBord.checkAuthorization();
    }
  }, [contextForDashBord])

  if (!loader) {

    return (

      <div className='flex flex-row h-full '>
        {/*  component for posts/promition etc */}
        <div className='flex flex-col md:w-4/6 w-full h-full overflow-auto scroll-m-1'>
          <Post />
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
