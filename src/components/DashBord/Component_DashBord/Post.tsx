import { Avatar, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import CommentIcon from '@mui/icons-material/Comment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { decodeTextFromDisplay } from '../../../utils/factory/FormatText';
import { Link } from 'react-router-dom';

type props = {
  ArrayOfthoughts: Array<Object>
}

const handleLikeButton = () => {

}

function Post({ ArrayOfthoughts }: props) {

  return (
    <>
      <div className='w-full'>
        {ArrayOfthoughts.map((item: any, index) => {
          return (
            <Link to={`/feed/${item?._id}`}>
              <div className='border-b-2 w-full md:w-5/6 mx-auto cursor-pointer hover:bg-gray-50 rounded-sm' key={index}>
                <div className='w-full min-h-[100px] h-auto flex flex-col'>
                  <div className=' border-gray-300 flex flex-row '>
                    <Avatar
                      alt="Remy Sharp"
                      src={item?.authorprofile}
                      sx={{ width: 40, height: 40 }}
                      className='my-2 mx-2'
                    />
                    <div className='flex-grow-0 w-full text-left p-1'>
                      <p className='mx-1 text-lg'><b>{item?.author}</b></p>
                      <p className='mx-1 text-xs text-gray-500'><b>{item.username}</b></p>
                    </div>
                    <IconButton
                      aria-label="upload picture"
                      component="span"
                      className="h-12 w-12 my-2 cursor-pointer bg-black"
                      style={{ color: 'black' }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </div>
                  <div className='my-1 ml-12 text-left p-1 text-lg'>
                    {decodeTextFromDisplay(item?.thoughts)}
                  </div>
                  {item.isMedia &&
                    (<div className='h-auto ml-20 my-2 p-2 cursor-pointer'>
                      <img src={item?.link} alt='media' className='max-h-60 mx-auto' />
                    </div>)}
                  <div className='my-1 flex flex-row w-full gap-3'>
                    <div className='w-full'>
                      <IconButton
                        aria-label="upload picture"
                        component="span"
                        className="h-12 w-12 my-2 cursor-pointer"
                        id={`like-btn-${index}`}
                        style={{ color: 'red' }}
                        onClick={handleLikeButton}
                      >
                        <FavoriteBorderIcon />
                      </IconButton>
                      <span className='mx-2 text-lg'>{'100'}</span>
                    </div>

                    <div className='w-full'>
                      <IconButton
                        aria-label="upload picture"
                        component="span"
                        className="h-14 w-14 my-2 cursor-pointer bg-black"
                        style={{ color: 'black' }}
                      >
                        <CommentIcon />
                      </IconButton>
                      <span className='mx-2 text-lg'>{'Comment'}</span>
                    </div>
                    <div className=' w-full'>
                      <IconButton
                        aria-label="upload picture"
                        component="span"
                        className="h-14 w-14 my-2 cursor-pointer bg-black"
                        style={{ color: 'black' }}
                      >
                        <ScreenShareIcon />
                      </IconButton>
                      <span className='mx-2 text-lg'>{'Share'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}


export default Post;







//   <div className='flex flex-col my-2 mx-auto  h-auto md:w-4/6 w-full border rounded-2xl' key={index}>
//   {/* Top part of post */}
//   <div className='h-auto'>
//     <div className='flex flex-row my-auto '>
//       <Avatar alt="Remy Sharp" src="https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcSX3J6e0wtDpL2nrK3tURbkLzwJ5jNv32_bxuPJxb2W2x1yBQTEiOGkZ2dKh1HsJTjbhqKzLga-smPAxkA" sx={{ width: 50, height: 50 }} className='my-2 mx-2' />
//       <span className='my-auto'><b>{"Narendra Modi"}</b></span>
//     </div>
//   </div>
//   {/* Image section */}
//   <div className='border h-96'>
//     <img src='https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcSX3J6e0wtDpL2nrK3tURbkLzwJ5jNv32_bxuPJxb2W2x1yBQTEiOGkZ2dKh1HsJTjbhqKzLga-smPAxkA' className='h-96 w-full' alt='Post'></img>
//   </div>
//   {/* Bottom part of post */}
//   <div className='h-auto flex flex-col'>
//     <div className='flex flex-row h-full my-3'>
//       <div className='h-6 w-6 my-auto cursor-pointer  mx-4'>
//         <ShareIcon />
//       </div>
//       <div className='h-6 w-6 my-auto mx-4 cursor-pointer'>
//         <ShareIcon />
//       </div>
//       {/* <div className='h-6 w-6 my-auto cursor-pointer mx-4'>
//         <ShareIcon />
//       </div> */}
//     </div>
//     <div className='my-3 text-left mx-2'>
//       <span className='mx-1'><b>{"Narendra Modi"}</b></span>
//        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, rerum.
//       </span>
//     </div>

//   </div>
// </div>