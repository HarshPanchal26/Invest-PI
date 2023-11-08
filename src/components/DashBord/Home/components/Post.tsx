import { Avatar, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import CommentIcon from '@mui/icons-material/Comment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

type props = {
  ArrayOfthoughts: Array<Object>
}

const handleLikeButton = () => {

}

function Post({ ArrayOfthoughts }: props) {

  useEffect(() => {
    console.log("ArrayOfthoughts", ArrayOfthoughts)
  }, [])

  return (
    <>
      <div className='w-full'>
        {ArrayOfthoughts.map((item: any, index) => {
          return (
            // <Link to={`/feed/${item?._id}`}>
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
                {/* <Main Post Section > */}
                <p className='my-1 ml-12 text-left p-1 text-lg' dangerouslySetInnerHTML={{ __html: item?.thoughts }}>
                </p>
                {item.isMedia &&
                  (<div className='h-auto ml-20 my-2 p-2 cursor-pointer'>
                    <img src={item?.link} alt='media' className='max-h-60 mx-auto' />
                  </div>)}
                {/* </Main Post Section > */}
                <div className='mt-10 flex flex-row w-3/4 gap-3'>
                  <div className='w-full'>
                    <IconButton
                      aria-label="upload picture"
                      component="span"
                      className="h-12 w-12 my-2 cursor-pointer"
                      id={`like-btn-${index}`}
                      style={{ color: 'blue' }}
                      onClick={handleLikeButton}
                    >
                      {/* <FavoriteBorderIcon /> */}
                      <ThumbUpAltIcon />
                    </IconButton>
                    <span className='mx-2 text-lg'>{'100'}</span>
                  </div>
                  <div className='w-full'>
                    <IconButton
                      aria-label="upload picture"
                      component="span"
                      className="h-12 w-12 my-2 cursor-pointer"
                      id={`like-btn-${index}`}
                      style={{ color: 'black' }}
                      onClick={handleLikeButton}
                    >
                      {/* <FavoriteBorderIcon /> */}
                      <CommentIcon />
                    </IconButton>
                    <span className='mx-2 text-lg'>{'0'}</span>
                  </div>
                  <div className='w-full'>
                    <IconButton
                      aria-label="upload picture"
                      component="span"
                      className="h-12 w-12 my-2 cursor-pointer"
                      id={`like-btn-${index}`}
                      style={{ color: 'black' }}
                      onClick={handleLikeButton}
                    >
                      {/* <FavoriteBorderIcon /> */}
                      <ScreenShareIcon />
                    </IconButton>
                    <span className='mx-2 text-lg'>{'0'}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Post;
