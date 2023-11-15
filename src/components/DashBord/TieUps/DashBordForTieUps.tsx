import React, { useEffect, useState } from 'react'
import { ContextTypeForPitches, ContextTypeForComapnyDataForPitch, ContextTypeForProductsDataForPitch } from '../../../utils/type'
import { GenerateObjForPitchData, GenerateCompanyObjForPitch } from '../../../utils/factory/ObjForUser'
import axios from '../../../.../../../axios.config'
import { Skeleton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useNavigate } from 'react-router-dom'
import { CommanStorageForVisitedPitch } from '../../../utils/factory/ObjForUser'
import { Avatar } from '@mui/material';
import AvatarGroup from '@mui/material/AvatarGroup';


type TypeForPitchData = {
  PITCHDATA: ContextTypeForPitches | null,
  COMPANYDATA: ContextTypeForComapnyDataForPitch | null,
  PRODUCTDATA: ContextTypeForProductsDataForPitch | null
}

export default function TieUps() {

  const [ArrayForTieUpsData, setArrayForTieUpsData] = useState<Array<TypeForPitchData> | null>(null);
  const navigation = useNavigate();
  const fetchNewPitch = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/pitches/fetch`, {});
      console.log("Res is ", res)
      let ArrayOfPitches = res.data.pitchs;
      const newArray: Array<TypeForPitchData> = ArrayOfPitches.map((item: any): TypeForPitchData => {
        let ObjToReturn = {
          PITCHDATA: GenerateObjForPitchData(item.pitchData),
          COMPANYDATA: GenerateCompanyObjForPitch(item.organizationData),
          PRODUCTDATA: null
        }
        CommanStorageForVisitedPitch.push(ObjToReturn);
        return ObjToReturn
      })
      setArrayForTieUpsData(newArray)
    } catch (error) {
      console.log("Error in dashbord of Tir ups", error)
    }
  }

  useEffect(() => {
    fetchNewPitch()
  }, [])

  useEffect(()=>{
    console.log("ArrayForTieUpsData" ,ArrayForTieUpsData)
  } , [ArrayForTieUpsData])

  return (
    <div className='w-full h-full overflow-auto p-2 mt-2'>
      {/*PITCH */}
      <p className='my-3 p-3 text-left text-xl font-bold'>
        Suggested Buisnesses for you.
      </p>
      <main className='w-full h-auto flex flex-row flex-wrap gap-y-16 gap-x-10'>
        {/* {ArrayForTieUpsData && ArrayForTieUpsData.map((item, index) => {
          return (
            <>
              <div className='flex flex-col xl:w-[45%] md:w-4/5 w-full rounded-lg shadow-md cursor-pointer' key={index}>
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
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9Xd1JPf1c116E6Y6-iCPZDcctVfJmtX6s2kPfcsoyJEsWsr7Y8_tzW7YU9YTF5A7R8a4H&s=10'
                        sx={{ width: 95, height: 95 }}
                        className="rounded-full border-4 border-white shadow-lg"
                      />
                      <span className='text-left w-full my-auto mx-4'>
                        <p className='text-lg font-bold'>{`Harsh Panchal's Pitch `}</p>
                        <p className='text-sm text-gray-500 font-bold mt-2'>{`Bio is going to be here `}</p>
                      </span>
                    </div>
                    <div className='p-2'>
                      <p className='text-lg text-left'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis, reiciendis.
                        <span className='text-blue-700 mx-2'>Leran More..</span>
                      </p>
                    </div>
                  </div>
                  <div className='md:w-1/5 w-full bg-slate-200 '>
                    <div className='flex md:flex-col flex-row gap-3'>
                      <div className='border-b flex-1 p-1'>
                        <p className='text-xl my-1'>$100M</p>
                        <p className='text-sm text-gray-600'>Valuation</p>
                      </div>
                      <div className='border-b flex-1 p-1'>
                        <p className='text-xl my-1'>$1M</p>
                        <p className='text-sm text-gray-600'>Seeking for</p>
                      </div>
                      <div className='border-b flex-1 p-1'>
                        <p className='text-xl my-1'>1.5%</p>
                        <p className='text-sm text-gray-600'>Equity</p>
                      </div>
                      <div className='border-b flex-1 p-1'>
                        <p className='text-xl my-1'>Seed</p>
                        <p className='text-sm text-gray-600'>Type</p>
                      </div>

                    </div>
                  </div>
                </section>
              </div>
            </>
          )
        })} */}
        {ArrayForTieUpsData && ArrayForTieUpsData.map((item: TypeForPitchData, index: number) => {
          return (
            <div className='flex flex-col xl:w-[40%] md:w-4/5 w-full rounded-lg shadow-md cursor-pointer xl:ml-10 p-2' key={index}
              onClick={() => navigation(`/pitch/${item.PITCHDATA?._id}`)}
            >
              <div className='w-full hidden md:block'>
                <p className='text-sm text-gray-500 font-bold mt-2 text-left'>
                  Publish On {`12/10/2032`}
                </p>
              </div>
              <section className='flex md:flex-row flex-col '>
                <div className=' w-full p-1 border-r'>
                  <div className='flex flex-row p-4 border-b'>
                    <Avatar
                      alt="Remy Sharp"
                      src={item.COMPANYDATA?.profileImage}
                      sx={{ width: 95, height: 95 }}
                      className="rounded-full border-4 border-white shadow-lg"
                    />
                    <span className='text-left w-full my-auto mx-4'>
                      <p className='text-lg font-bold'>{`${item.COMPANYDATA?.companyname}'s Pitch `}</p>
                      <p className='text-sm text-gray-500 font-bold mt-2'>{item.COMPANYDATA?.bio}</p>
                    </span>
                  </div>
                  {item.COMPANYDATA && (<div className='p-2'>
                    <p className='text-lg text-left'>
                      <p className='text-lg text-left'>
                        {item.COMPANYDATA?.about.split(' ').length > 15
                          ? item.COMPANYDATA?.about.split(' ').slice(0, 14).join(' ') + ' ... '
                          : item.COMPANYDATA?.about
                        }
                        {item.COMPANYDATA?.about.split(' ').length > 10 && (
                          <span className='text-blue-700 mx-2'>Learn More..</span>
                        )}
                      </p>
                    </p>
                  </div>)}
                  <div className='xl:flex flex-row p-1 gap-5 flex-wrap mt-4 hidden'>
                    <div className='p-2 border border-slate-700 bg-slate-200 inline-block rounded-xl'>
                      <p className='font-bold'>{item.PITCHDATA?.avgYearCustomer}</p>
                      <p className='text-sm'>Annual Customers</p>
                    </div>
                    <div className='p-2 border border-slate-700 bg-slate-200 inline-block rounded-xl'>
                      <p className='font-bold'>{item.PITCHDATA?.avgYearSale}</p>
                      <p className='text-sm'>Annual Sale</p>
                    </div>
                    <div className='p-2 border border-slate-700 bg-slate-200 inline-block rounded-xl'>
                      <p className='font-bold'>{item.PITCHDATA?.targetAudiences}</p>
                      <p className='text-sm'>Audiance</p>
                    </div>
                    {/* <div className='p-2'>
                      <VisibilityIcon />
                      <p className='text-lg cursor-pointer mt-2'>
                        <span className='font-bold hover:border-b mx-1'>{item.PITCHDATA?.views}</span>Views
                      </p>
                    </div>
                    <div className='p-2'>
                      <StarIcon />
                      <p className='text-lg cursor-pointer mt-2'>
                        <span className='font-bold hover:border-b mx-1'>{item.PITCHDATA?.interests}</span>Likes
                      </p>
                    </div>
                    <div className='p-2'>
                      <LocalOfferIcon />
                      <p className='text-lg cursor-pointer mt-2'>
                        <span className='font-bold hover:border-b mx-1'>{item.PITCHDATA?.counter}</span>Counters
                      </p>
                    </div> */}
                  </div>
                  {/* <div className='p-1'>
                    <AvatarGroup max={4}>
                      <Avatar alt="Remy Sharp" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTP5mQSEI40IsJlF-L-sNFVuqS-bIbXJ3bfkdu_tNrPp-0v3Awn" />
                      <Avatar alt="Remy Sharp" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTP5mQSEI40IsJlF-L-sNFVuqS-bIbXJ3bfkdu_tNrPp-0v3Awn" />
                      <Avatar alt="Remy Sharp" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTP5mQSEI40IsJlF-L-sNFVuqS-bIbXJ3bfkdu_tNrPp-0v3Awn" />
                      <Avatar alt="Remy Sharp" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTP5mQSEI40IsJlF-L-sNFVuqS-bIbXJ3bfkdu_tNrPp-0v3Awn" />
                      <Avatar alt="Remy Sharp" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTP5mQSEI40IsJlF-L-sNFVuqS-bIbXJ3bfkdu_tNrPp-0v3Awn" />
                      <Avatar alt="Remy Sharp" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTP5mQSEI40IsJlF-L-sNFVuqS-bIbXJ3bfkdu_tNrPp-0v3Awn" />
                    </AvatarGroup>
                  </div> */}
                </div>
                <div className='md:w-[25%] w-full bg-slate-200 '>
                  <div className='flex md:flex-col flex-row gap-3'>
                    {/* <div className='border-b flex-1 p-1'>
                      <p className='text-xl my-1'>{item.PITCHDATA?.targetAudiences}</p>
                      <p className='text-sm text-gray-600'>Bussines </p>
                    </div> */}
                    <div className='border-b flex-1 p-1'>
                      <p className='text-xl my-1'>${item.PITCHDATA?.seekingFund}M</p>
                      <p className='text-sm text-gray-600'>Seeking for</p>
                    </div>
                    <div className='border-b flex-1 p-1'>
                      <p className='text-xl my-1'>{item.PITCHDATA?.offeredEquity}%</p>
                      <p className='text-sm text-gray-600'>Equity</p>
                    </div>
                    <div className='border-b flex-1 p-1'>
                      <p className='text-xl my-1'>{item.PITCHDATA?.fundingType}</p>
                      <p className='text-sm text-gray-600'>Funding </p>
                    </div>
                    <div className='border-b flex-1 p-2 bg-red-600 '>
                      <p className='text-sm text-white'>Open </p>
                      <p className='text-sm text-white'>For Investments</p>
                    </div>
                  </div>
                </div>
              </section>
              {/* <div className='flex flex-row p-1 justify-between'>
                <p className='text-center text-lg font-bold'>{'People'}</p>
                    <AvatarGroup max={4}>
                      <Avatar alt="Remy Sharp" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTP5mQSEI40IsJlF-L-sNFVuqS-bIbXJ3bfkdu_tNrPp-0v3Awn" />
                      <Avatar alt="Remy Sharp" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTP5mQSEI40IsJlF-L-sNFVuqS-bIbXJ3bfkdu_tNrPp-0v3Awn" />
                      <Avatar alt="Remy Sharp" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTP5mQSEI40IsJlF-L-sNFVuqS-bIbXJ3bfkdu_tNrPp-0v3Awn" />
                      <Avatar alt="Remy Sharp" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTP5mQSEI40IsJlF-L-sNFVuqS-bIbXJ3bfkdu_tNrPp-0v3Awn" />
                      <Avatar alt="Remy Sharp" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTP5mQSEI40IsJlF-L-sNFVuqS-bIbXJ3bfkdu_tNrPp-0v3Awn" />
                      <Avatar alt="Remy Sharp" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTP5mQSEI40IsJlF-L-sNFVuqS-bIbXJ3bfkdu_tNrPp-0v3Awn" />
                    </AvatarGroup>
              </div> */}
            </div>
          )
        })}
        {
          ArrayForTieUpsData === null && [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
            return (<Skeleton variant="rectangular" sx={{ fontSize: '1rem' }} width={450} height={270} className='rounded-lg' />)
          })
        }
      </main>
    </div>
  )
}


