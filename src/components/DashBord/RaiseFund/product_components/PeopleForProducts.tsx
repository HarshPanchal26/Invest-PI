import React, { useEffect, useState, useContext } from 'react'
import { Button, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FindPepole from '../../../Serch/FindPepole';
import NoData from '../../../../Assets/NoData';
import axios from 'axios';
import { ContextForDashBord } from '../../../../context/contextForDashBord';
import { Backdrop } from '@mui/material';
import { CircularProgress } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { Avatar } from '@mui/material';

const styleForModal: any = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

type TypeForNewProfile = {
  profile: any
  position: ''
}

export default function PeopleForProducts() {



  const contextForDashBord = useContext(ContextForDashBord);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [newAddedPepole, setNewAddedPepole] = useState<Array<any>>([]);
  const [pepoleForProduct, setPepoleForProduct] = useState<Array<any>>([]);
  const [stateForNoData, setStateForNoData] = useState<boolean>(false);
  const [investorForProduct, setInvestorForProduct] = useState<Array<any>>([]);
  const [dataFatching, setDataFetching] = useState<boolean>(true);
  const [openBackDrop, setBackDrop] = useState<boolean>(false)


  const [errorMessage, setErrorMessage] = useState({
    headError: '',
    ProfileError: '',
    PostionError: ''
  })

  const verifyForm = (): boolean => {
    let error = true;
    let positionEle = document.getElementById('position_ID') as HTMLInputElement;

    if (newAddedPepole.length === 0) {
      setErrorMessage({
        ...errorMessage,
        ProfileError: 'Please Slect Any Profile'
      })
    } else if (positionEle.value === '') {
      setErrorMessage({
        ...errorMessage,
        PostionError: 'Please Slect Any Position'
      })
    } else {
      error = false
    }
    return error
  }

  const fetchProfileForPeople = async (arrayOfUser: any) => {
    let arrayOFId: Array<any> = [];
    Object.keys(contextForDashBord.USER.PEOPLE).map((item: any) => {
      arrayOFId.push(contextForDashBord.USER.PEOPLE[item]);
    })
    try {
      const res = await axios.post('/api/profile/view', { array: arrayOFId, field: '_id' });
      let arayForProfile = res.data.profiles;
      let arrayWithData = arrayOfUser.map((user: any) => {
        const profileData = arayForProfile.find((profile: any) => profile._id === user._id);
        if (profileData) {
          return {
            ...profileData,
            position: user.position
          };
        }
        return user;
      });
      setPepoleForProduct(arrayWithData)
      setDataFetching(false);
    } catch (error) {
      console.log(error)
    }
  }

  const handleSavePepole = async () => {
    const error = verifyForm();
    if (!error) {
      setBackDrop(true);
      let positionEle = document.getElementById('position_ID') as HTMLInputElement;
      let ObjForNewPerson = {
        profielObj: newAddedPepole[0],
        position: positionEle.value
      }
      if (errorMessage.headError) {
        setErrorMessage({
          ...errorMessage,
          headError: ''
        })
      }
      try {
        const res = await axios.post('/api/product/add/pepole', ObjForNewPerson)
        if (res.data === "Inavlid request") {
          setErrorMessage({
            ...errorMessage,
            headError: 'Inavlid request'
          })
        } else {
          contextForDashBord.USER.PEOPLE[positionEle.value] = newAddedPepole[0]._id
          let newArray = [...pepoleForProduct];
          let newObj = {
            ...newAddedPepole[0],
            position: positionEle.value
          }
          newArray.push(newObj);
          console.log("newArray newArray" ,newArray)
          setPepoleForProduct(newArray)
          setBackDrop(false)
          setOpenModal(false)
        }
      } catch (error: any) {
        setBackDrop(false);
        setErrorMessage({
          ...errorMessage,
          headError: error.message
        })

      }
    }
  }

  const handleChangeInPosition = (event: any) => {
    const { value } = event.target;
    if (value) {
      errorMessage.PostionError && setErrorMessage({
        ...errorMessage,
        PostionError: ''
      })
    } else {
      setErrorMessage({
        ...errorMessage,
        PostionError: 'Please Slect Any Position'
      })
    }
    if (newAddedPepole.length > 0 && errorMessage.ProfileError) {
      setErrorMessage({
        ...errorMessage,
        ProfileError: ''
      })
    }
  }

  useEffect(() => {
    if (newAddedPepole.length > 0 && errorMessage.ProfileError) {
      setErrorMessage({
        ...errorMessage,
        ProfileError: ''
      })
    }
    if (pepoleForProduct.length === 0 && Object.keys(contextForDashBord.USER.PEOPLE).length !==0) {
      const newArray = Object.keys(contextForDashBord.USER.PEOPLE).map((item) => {
        return {
          _id: contextForDashBord.USER.PEOPLE[item],
          name: '',
          username: '',
          type: '',
          profileImage: '',
          position: [item],
        }
      })
      fetchProfileForPeople(newArray); //Function
    }
    if(Object.keys(contextForDashBord.USER.PEOPLE).length ===0){
      console.log("Hello I am here")  
      setStateForNoData(true);
    }
  }, [contextForDashBord]);

  return (
    <main className='w-full h-full p-1'>
      {/* Product Owners */}
      <div className='p-2 my-4'>
        <div className='flex flex-row justify-between border-b'>
          <p className='text-2xl font-bold mx-2 text-left my-auto p-2'>{'Pepole '}</p>
          <IconButton
            onClick={() => setOpenModal(true)}
          >
            <AddIcon style={{
              width: '45px',
              height: '45px'
            }} />
          </IconButton>
        </div>
        <div className='md:w-1/2 w-full p-1'>
          <ul className="divide-y divide-gray-100">
            {!stateForNoData  && pepoleForProduct.map((person) => (
              <>
                {!dataFatching && (
                  <li key={person.email} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                      <Avatar
                        alt="Remy Sharp"
                        src={person.profileImage}
                        sx={{ width: 60, height: 60 }}
                        className="rounded-full border-4 border-white shadow-lg"
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.username}</p>
                      </div>
                    </div>
                    <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">{person.position}</p>
                      {person.lastSeen ? (
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                        </p>
                      ) : (
                        <div className="mt-1 flex items-center gap-x-1.5">
                          <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          </div>
                          <p className="text-xs leading-5 text-gray-500">Online</p>
                        </div>
                      )}
                    </div>
                  </li>)}
                {dataFatching && (<li key={person.email} className="flex gap-x-6 py-5 ">
                  <div>
                    <Skeleton variant="circular" width={60} height={60} />
                  </div>
                  <div className='flex flex-col gap-y-4'>
                    <Skeleton variant="rectangular" width={300} height={30} />
                    <Skeleton variant="rectangular" width={300} height={10} />
                  </div>
                </li>)}
              </>
            ))}
            {stateForNoData  && <NoData />}
          </ul>
        </div>
      </div>
      {/*  Product Investors */}
      <div className='p-2 my-4'>
        <p className='text-2xl font-bold mx-2 text-left my-auto p-2'>{'Investors'}</p>
        <div className='md:w-1/2 w-full  p-1'>
          <ul className="divide-y divide-gray-100">
            {!stateForNoData && investorForProduct.map((person) => (
              // !dataFatching ? 
              // (<li key={person.email} className="flex justify-between gap-x-6 py-5">
              //   <div className="flex min-w-0 gap-x-4">
              //     <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
              //     <div className="min-w-0 flex-auto">
              //       <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
              //       <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
              //     </div>
              //   </div>
              //   <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              //     <p className="text-sm leading-6 text-gray-900">{person.role}</p>
              //     {person.lastSeen ? (
              //       <p className="mt-1 text-xs leading-5 text-gray-500">
              //         Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
              //       </p>
              //     ) : (
              //       <div className="mt-1 flex items-center gap-x-1.5">
              //         <div className="flex-none rounded-full bg-emerald-500/20 p-1">
              //           <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              //         </div>
              //         <p className="text-xs leading-5 text-gray-500">Online</p>
              //       </div>
              //     )}
              //   </div>
              // </li>) 
              // : 
              <li key={person.email} className="flex justify-between gap-x-6 py-5 flex-row">
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={60} />
              </li>

            ))}
            {stateForNoData && <NoData />}
          </ul>
        </div>
      </div>
      <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='mx-2'
      >
        <>
          <div className='xl:w-[600px] w-full bg-white p-4 rounded-xl md:min-h-[500px] md:min-w-[600px]' style={styleForModal}>
            <div className='p-2 text-2xl flex flex-row justify-between '>
              <p className='my-auto  p-3 bg-gray-200 rounded-md'>{`Add USPs`}</p>
              <div className=' mr-0 my-auto bg-gray-200 rounded-full'>
                <IconButton
                  aria-label="upload picture"
                  component="span"
                  className="h-12 w-12 cursor-pointer bg-black border my-auto"
                  style={{ color: 'black' }}
                  onClick={() => setOpenModal(false)}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              {/* <div>
              <FindPepole />
            </div> */}
            </div>
            {errorMessage.headError && <p id='leadInvestor_id' className='block mx-auto text-red-600 w-full'>{errorMessage.headError}</p>}
            <div className='w-full p-2'>
              <FindPepole
                question='Serch Pepole who are associated with your company here'
                State={newAddedPepole}
                setState={setNewAddedPepole}
                limit={1}
              />
              {errorMessage.ProfileError && <p id='leadInvestor_id' className='block mx-auto text-red-600 w-full'>{errorMessage.ProfileError}</p>}

              <div className="q-full">
                <label htmlFor="position" className="block text-sm font-medium leading-6 text-gray-900">
                  Position
                </label>
                <div className="mt-2">
                  <select
                    id="position_ID"
                    name="position"
                    autoComplete="country"
                    className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue=''
                    onChange={handleChangeInPosition}
                  >
                    <option value={''} >{'None'}</option>
                    <option value={'CEO'} >{'Chief Executive Officer'}</option>
                    <option value={'MD'} >{'Managing Director'}</option>
                    <option value={'COO'}>{'Chief Operating Officer'}</option>
                    <option value={'CFO'} >{'Chief Marketing Officer'}</option>
                    <option value={'CMO'} >{'Chief Marketing Officer'}</option>
                    <option value={'CTO'} >{'Chief Technical Officer'}</option>
                    <option value={'CIO'} >{'Chief Information Officer'}</option>
                    <option value={'CHRO'} >{'Chief Human Resources Officer'}</option>
                    {/* <option value={'CCO'} >{'Chief Compliance Officer'}</option>
                  <option value={'CSO'} >{'Chief Strategy Officer'}</option>
                  <option value={'CTA'} >{'Chief Technical Architecture'}</option> 
                  <option value={'CRO'} >{'Chief Revenue Officer'}</option> 
                  <option value={'CPO'} >{'Chief Product Officer'}</option> 
                  <option value={'CLO'} >{'Chief Legal Officer'}</option> 
                  <option value={'CVO'} >{'Chief Visionary Officer'}</option>  */}
                    {/* <option value={'President'} >{'President'}</option>  */}
                  </select>

                </div>
                {errorMessage.PostionError && <p id='leadInvestor_id' className='block mx-auto text-red-600 w-full'>{errorMessage.PostionError}</p>}

              </div>
            </div>

            <div className='mt-4'>
              <Button variant='contained' color='primary'
                onClick={handleSavePepole}
                style={{
                  padding: '10px 10px',
                  float: 'right',
                  marginBottom: '10px'
                }}>
                Save Profile
              </Button>
            </div>
          </div>
          <Backdrop
            sx={{ color: 'blue', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openBackDrop}
          >
            <div className=' flex flex-row'>
              <CircularProgress color="inherit" />
              <span className='mx-3 my-auto'>{'Upadting .......'}</span>
            </div>
          </Backdrop>
        </>
      </Modal>
    </main>
  )
}




//  652a38a81111ff2e46bc346d    CEO

//  652a3ac91111ff2e46bc34a1   CHRO 