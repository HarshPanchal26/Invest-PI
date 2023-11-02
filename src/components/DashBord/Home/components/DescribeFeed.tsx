import React, { useEffect, useContext, useState } from 'react'
import BackButton from '../../Assets/BackButton'
import { Avatar, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import CommentIcon from '@mui/icons-material/Comment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { decodeTextFromDisplay } from '../../utils/factory/FormatText';
import { useParams } from 'react-router-dom';
import { ContextForDashBord } from '../../context/contextForDashBord';


type TypeForProfileObj = {
  objForThought: any,
  loader: boolean
}

export default function DescribeFeed() {

  const contextForDashBord = useContext(ContextForDashBord);
  const { id } = useParams();
  const [stateForProfilePage, setStateForProfilePage] = useState<TypeForProfileObj>({
    objForThought: null,
    loader: true
  })

  const handleLikeButton = () => {

  }

  const findThought = async (username: string | undefined) => {
    console.log("Original Username ", username)
    if (username) {
      setStateForProfilePage({
        objForThought: null,
        loader: true
      });
      try {
        const Obj = await contextForDashBord.checkForVisitedAccount(username);
        console.log("Username from profile", Obj);
        setStateForProfilePage({
          objForThought: Obj,
          loader: false
        })

      } catch (error) {
        console.log("Error from profile page ", error);
      }
    }
  }

  useEffect(() => {
    if (contextForDashBord.isAutorizedUser) {
      if (stateForProfilePage.objForThought == null || stateForProfilePage.objForThought?._id !== id) {
        findThought(id);
      }
    } else {
      contextForDashBord.checkAuthorization();
    }
  })

  return (
    <>
      <BackButton />
      <div className='w-full h-full flex flex-row justify-center'>
        <div className='xl:w-2/3 w-full'>
          <div className='border-b-2 w-full md:w-5/6 mx-auto cursor-pointer hover:bg-gray-50 rounded-sm'>
            <div className='w-full min-h-[100px] h-auto flex flex-col'>
              <div className=' border-gray-300 flex flex-row '>
                <Avatar alt="Remy Sharp"
                  src={stateForProfilePage.objForThought?.authorprofile}
                  sx={{ width: 40, height: 40 }}
                  className='my-2 mx-2' />
                <div className='flex-grow-0 w-full text-left p-1'>
                  <p className='mx-1 text-lg'><b>{stateForProfilePage.objForThought?.author}</b></p>
                  <p className='mx-1 text-xs text-gray-500'><b>{stateForProfilePage.objForThought.username}</b></p>
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
                {decodeTextFromDisplay(stateForProfilePage.objForThought?.thoughts)}
              </div>
              {stateForProfilePage.objForThought.isMedia &&
                (<div className='h-auto ml-20 my-2 p-2 cursor-pointer'>
                  <img src={stateForProfilePage.objForThought?.link} alt='media' className='max-h-60 mx-auto' />
                </div>)}
              <div className='my-1 flex flex-row w-full gap-3'>
                <div className='w-full'>
                  <IconButton
                    aria-label="upload picture"
                    component="span"
                    className="h-12 w-12 my-2 cursor-pointer"
                    id={`like-btn`}
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
        </div>
        {/* <div className='w-1/3 hidden xl:block'>
                    <Suggestions />
                </div> */}
      </div>
    </>
  )
}
