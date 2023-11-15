import React, { useEffect, useContext, useState } from 'react'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import FormForPitch from './pitch_componnets/FormForPitch';
import { ContextForDashBord } from '../../../context/contextForDashBord';
import { Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import axios from '../../../../axios.config';
import { Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NoData from '../../../Assets/NoData';

export default function DashBordForPitch() {

  const contextForDashBord = useContext(ContextForDashBord);
  const navigation = useNavigate();
  const [openDrawer, setDrawerOpen] = useState<boolean>(false);
  const [verifyedRoute, setVerifyedRoute] = useState<boolean>(false);
  const [ArrayForMyPitches, setArrayForMyPitches] = useState<[] | null>(null);

  const handleNewPitch = () => {
    setDrawerOpen(true)
  }

  const fetchMyPitches = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}pitches/fetch/multiple?uid=${contextForDashBord.USER.USERID}`);
      setArrayForMyPitches(res.data.pitch);
      contextForDashBord.setArrayForMyPiches(res.data.pitch);
    } catch (error) {
      console.log("Error in fetching Ptches ", error)
    }
  }

  useEffect(() => {
    if (contextForDashBord.USER.TYPE === 'product') {
      setVerifyedRoute(true);
      if (contextForDashBord.MYPITCHES.length === 0 && ArrayForMyPitches === null) {
        fetchMyPitches()
      } else {
        setArrayForMyPitches(contextForDashBord.MYPITCHES)
      }
    }
  }, [contextForDashBord])


  return (
    <>
      {verifyedRoute && (
        <div className='h-full w-full'>
          <header className=' p-2 '>
            <div className='w-full flex flex-row justify-end'>
              <Button variant='contained' color='primary' style={{
                marginRight: '1.3rem',
                padding: "14px 14px"
              }}
                onClick={handleNewPitch}
              >
                <AddIcon /> <span className='ml-2'>Create Pitch</span>
              </Button>
            </div>
          </header>
          <main className='p-4 w-full h-auto gap-3'>
            {/* <div className='flex md:flex-row flex-col flex-wrap xl:w-9/12 w-full gap-5 p-1'> */}
            <div className='p-1 flex xl:flex-row flex-col gap-5'>
              {ArrayForMyPitches && ArrayForMyPitches.map((item: any, index) => {
                return (
                  <div className='flex flex-col xl:w-[30%] md:w-4/5 w-full rounded-lg shadow-md cursor-pointer' key={index}
                    onClick={() => navigation(`/pitch/${item._id}`)}
                  >
                    <div className='w-full  hidden md:block'>
                      <p className='text-sm text-gray-500 font-bold mt-2 text-left'>
                        Publish On {`12/10/2032`}
                      </p>
                    </div>
                    <section className='flex md:flex-row flex-col'>
                      <div className='md:w-4/5 w-full p-1 border-r '>
                        <div className='flex flex-row p-4 border-b'>
                          <Avatar
                            alt="Remy Sharp"
                            src={contextForDashBord.USER.PROFILEIMAGE}
                            sx={{ width: 95, height: 95 }}
                            className="rounded-full border-4 border-white shadow-lg"
                          />
                          <span className='text-left w-full my-auto mx-4'>
                            <p className='text-lg font-bold'>{`Harsh Panchal's Pitch `}</p>
                            <p className='text-sm text-gray-500 font-bold mt-2'>{contextForDashBord.USER.BIO}</p>
                          </span>
                        </div>
                        <div className='p-2'>
                          <p className='text-lg text-left'>
                            <p className='text-lg text-left'>
                              {contextForDashBord.USER.ABOUT.split(' ').length > 15
                                ? contextForDashBord.USER.ABOUT.split(' ').slice(0, 14).join(' ') + ' ... '
                                : contextForDashBord.USER.ABOUT
                              }
                              {contextForDashBord.USER.ABOUT.split(' ').length > 10 && (
                                <span className='text-blue-700 mx-2'>Learn More..</span>
                              )}
                            </p>
                          </p>
                        </div>
                        <div className='flex flex-row p-1 gap-5'>
                          <div className='p-2'>
                            <VisibilityIcon />
                            <p className='text-lg cursor-pointer mt-2'>
                              <span className='font-bold hover:border-b mx-1'>{item.engagement.views.length}</span>Views
                            </p>
                          </div>
                          <div className='p-2'>
                            <StarIcon />
                            <p className='text-lg cursor-pointer mt-2'>
                              <span className='font-bold hover:border-b mx-1'>{item.engagement.counter.length}</span>Likes
                            </p>
                          </div>
                          <div className='p-2'>
                            <LocalOfferIcon />
                            <p className='text-lg cursor-pointer mt-2'>
                              <span className='font-bold hover:border-b mx-1'>{item.engagement.counter.length}</span>Counters
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='md:w-1/5 w-full bg-slate-200 '>
                        <div className='flex md:flex-col flex-row gap-3'>

                          <div className='border-b flex-1 p-1'>
                            <p className='text-xl my-1'>${item.seekingFund}M</p>
                            <p className='text-sm text-gray-600'>Seeking for</p>
                          </div>
                          <div className='border-b flex-1 p-1'>
                            <p className='text-xl my-1'>{item.offeredEquity}%</p>
                            <p className='text-sm text-gray-600'>Equity</p>
                          </div>
                          <div className='border-b flex-1 p-1'>
                            <p className='text-xl my-1'>{item.fundingType}</p>
                            <p className='text-sm text-gray-600'>Type</p>
                          </div>
                          <div className='border-b flex-1 p-4 bg-red-600'>
                            <p className='text-sm text-white'>Open For Investments</p>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                )
              })}
              {ArrayForMyPitches?.length === 0 && (
                <NoData/>
              )}
              {
                ArrayForMyPitches == null && (
                  <>
                    <Skeleton variant="rectangular" sx={{ fontSize: '1rem' }} width={450} height={270} className='rounded-lg' />
                    <Skeleton variant="rectangular" sx={{ fontSize: '1rem' }} width={450} height={270} className='rounded-lg' />
                  </>
                )
              }
            </div>
            {/* <div className='border w-3/12 hidden xl:block h-52'>
              Side Pannle
            </div> */}
          </main>
          <Drawer
            anchor='bottom'
            open={openDrawer}
            onClose={() => setDrawerOpen(false)}
          >
            <div className='w-full h-[800px] overflow-auto'>
              <div className='border'>
                <IconButton
                  aria-label="upload picture"
                  component="span"
                  className="h-12 w-12 cursor-pointer bg-black border my-auto"
                  style={{ color: 'black' }}
                  onClick={() => setDrawerOpen(false)}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              <FormForPitch setDrawerOpen={setDrawerOpen} />
            </div>
          </Drawer>
        </div>)}

      {!verifyedRoute && (
        <div>
        </div>
      )}
    </>
  )
}
