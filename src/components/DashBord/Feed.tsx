import React, { useState } from "react"
import Post from "./Component_DashBord/Post"
import Suggestions from "./Component_DashBord/Suggestions"
import axios  from "axios"

export default function Feed(){

  const [loader ,setLoader] = useState<boolean>(true);

  const checkAuthorization = async()=>{
    try {
      let res = await axios.get('/feed/authorization')
      if(res.data.authorized){
        setLoader(false)
      }
    } catch (error) {
      window.location.href = '/login'
    }
  }

  React.useEffect(()=>{
      checkAuthorization()
  } , [])
  if(!loader){

    return (
      
      <div className='flex flex-row h-auto'>  
        {/*  component for posts/promition etc */}
          <Post/>
        {/* space for promotion and suggestions  */}
        <div className='md:flex flex-col hidden w-2/6 mx-2 h-auto  '>
          <Suggestions/>
        </div>
      </div>
    
    )
  }else{
    return (
    <div className="flex flex-row h-auto">
      {'Loading .........'}
    </div>
    )
  }
}
