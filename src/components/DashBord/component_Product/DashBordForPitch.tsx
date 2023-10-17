import React, { useEffect, useContext } from 'react'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import FormForPitch from './FormForPitch';
import { ContextForDashBord } from '../../../context/contextForDashBord';

export default function DashBordForPitch() {

  const contextForDashBord = useContext(ContextForDashBord);

  const [openDrawer, setDrawerOpen] = React.useState<boolean>(false);
  const [verifyedRoute, setVerifyedRoute] = React.useState<boolean>(false);


  const handleNewPitch = () => {
    setDrawerOpen(true)
  }

  useEffect(() => {
    if (contextForDashBord.USER.TYPE === 'product') {
      setVerifyedRoute(true);
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
          {/* <main className='p-4 w-full h-auto '>
        {ObjForNews.map((item, index) => {
          return (
            <div className='w-full text-left p-1 border-b cursor-pointer'>
              <p><span className='mx-3'><NewspaperIcon /></span>Pitch</p>
              <p className='font-bold mx-10 mt-3'>
                <span className='mx-2'><FiberManualRecordIcon style={{ width: '15px', height: '15px' }} /></span>Lorem ipsum dolor sit amet consectetur adipisicing.
              </p>
              <p className='text-left mx-10'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam, repudiandae?..............
                <span className='text-blue-700'>Read More</span>
              </p>
            </div>
          )
        })}

      </main> */}
          <main className='p-4 w-full h-auto flex md:flex-row flex-col gap-3'>
            <div className='flex md:flex-row flex-col flex-wrap md:w-4/6 w-full gap-5 p-1'>
              <div className='min-h-[200px] md:w-[500px] w-full border'>
                Pitch Deck
              </div>
              <div className='min-h-[200px] md:w-[500px] w-full border'>
                Pitch Deck
              </div>
              <div className='min-h-[200px] md:w-[500px] w-full border'>
                Pitch Deck
              </div>
            </div>
            <div className='border w-2/6 hidden md:block'>
              Side Pannle
            </div>

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
                <div className='border border-red-600'>
                      "You Have to create a accout for your product in oreder to view this page"  
                </div>
      )} 
    </>
  )
}
