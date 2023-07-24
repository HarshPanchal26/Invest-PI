import Post from "./Component_DashBord/Post"
import Suggestions from "./Component_DashBord/Suggestions"

export default function Feed(){
  return (
    <>
      <div className='flex flex-row h-auto'>  
        {/*  component for posts/promition etc */}
          <Post/>
        {/* space for promotion and suggestions  */}
        <div className='md:flex flex-col hidden w-2/6 mx-2 h-auto  '>
          <Suggestions/>
        </div>
      </div>
    </>
  )
}
