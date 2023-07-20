import { Avatar } from '@mui/material';
import { ShareIcon } from '@heroicons/react/20/solid';

const postData = [
  {
    id : 1
  },
  {
    id : 2
  },
  {
    id : 3
  },
  {
    id : 4
  },
]

function Post() {
  return (
    <div className='flex flex-col md:w-4/6 w-full mx-2 bg-slate-50'>
        {postData.map((item , index)=>{
          return (
            <div className='flex flex-col my-2 mx-auto  h-auto md:w-4/6 w-full border rounded-2xl' key={index}>
            {/* Top part of post */}
            <div className='h-auto'>
              <div className='flex flex-row my-auto '>
                <Avatar alt="Remy Sharp" src="https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcSX3J6e0wtDpL2nrK3tURbkLzwJ5jNv32_bxuPJxb2W2x1yBQTEiOGkZ2dKh1HsJTjbhqKzLga-smPAxkA" sx={{ width: 50, height: 50 }} className='my-2 mx-2' />
                <span className='my-auto'><b>{"Narendra Modi"}</b></span>
                {/* <div className='border justify'>
                    <span>More</span>
                  </div> */}
              </div>
            </div>
            {/* Image section */}
            <div className='border h-96'>
              <img src='https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcSX3J6e0wtDpL2nrK3tURbkLzwJ5jNv32_bxuPJxb2W2x1yBQTEiOGkZ2dKh1HsJTjbhqKzLga-smPAxkA' className='h-96 w-full' alt='Post'></img>
            </div>
            {/* Bottom part of post */}
            <div className='h-auto flex flex-col'>
              <div className='flex flex-row h-full my-3'>
                <div className='h-6 w-6 my-auto cursor-pointer  mx-4'>
                  <ShareIcon />
                </div>
                <div className='h-6 w-6 my-auto mx-4 cursor-pointer'>
                  <ShareIcon />
                </div>
                {/* <div className='h-6 w-6 my-auto cursor-pointer mx-4'>
                  <ShareIcon />
                </div> */}
              </div>
              <div className='my-3 text-left mx-2'>
                <span className='mx-1'><b>{"Narendra Modi"}</b></span>
                 <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, rerum.
                </span>
              </div>

            </div>
          </div>
          )
        })}
          {/* Post content (Which will be going in loop) */}
          
        </div>
  )
}


export default Post;