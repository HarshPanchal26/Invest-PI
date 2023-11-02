import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material'
import { CommanUserDataStotage, GenerateObjForCommanUserData } from '../../../utils/factory/ObjForUser'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

type Props = {
  objForNotification: any
}

type TypeOfCommanData = {
  _id: string,
  name: string,
  username: string,
  profileImage: string,
  type: string
}

export default function NotificationForOfferResults({ objForNotification }: Props) {

  const [ObjForAccepter, setObjForAccepter] = useState<TypeOfCommanData | null>(null);
  const navigate = useNavigate()
  const fetchUser = async (id: String) => {
    let findLocal: any = [];
    if (CommanUserDataStotage.length > 0) {
      findLocal = CommanUserDataStotage.filter((item: any) => item._id === id);
    }
    if (findLocal[0]) {
      let userData = GenerateObjForCommanUserData(findLocal[0]);
      setObjForAccepter(userData);
    } else {
      try {
        if (id) {
          const array = await axios.get(`/api/profile/filter/?find=${id}`);
          let userData = GenerateObjForCommanUserData(array.data);
          setObjForAccepter(userData);
        } else {
          alert('Check Id ' + id)
        }
      } catch (error: any) {
        console.log("error", error);
      }
    }
  }

  useEffect(() => {
    fetchUser(objForNotification.offerFor)
  }, [objForNotification])

  return (
    <div className='w-full p-2 border-b'>
      <div className='flex flex-row gap-3'>
        <div className='p-1'>
          <Avatar
            alt="Remy Sharp"
            src={ObjForAccepter?.profileImage}
            sx={{ width: 80, height: 80 }}
            className="rounded-full border-4 border-white shadow-lg"
          />
        </div>
        {objForNotification.accepted && (
          <div className='text-center p-1'>
            <p className='text-lg font-bold my-1 text-left'>Congratulations !
              <span className='mx-2 underline' onClick={() => navigate(`/profile/${ObjForAccepter?.username}/`)}>{ObjForAccepter?.name}</span> accepted your counter Offer</p>
            <p className='text-lg my-1 text-left'>
              Your Offer was
              <span className='text-blue-700 mx-1 font-bold'>${objForNotification.offereAmount}M</span> for <span className='text-blue-700 mx-1 font-bold'>{objForNotification.offeredEquity}%</span> equity. </p>
          </div>)}
        {objForNotification.rejected && (
          <div className='text-center p-1'>
            <p className='text-lg font-bold my-1 text-left'>Unfortunatly !
              <span className='mx-2 underline' onClick={() => navigate(`/profile/${ObjForAccepter?.username}/`)}>{ObjForAccepter?.name}</span> Not accepted your counter Offer</p>
            <p className='text-lg my-1 text-left'>
              Your Offer was
              <span className='text-blue-700 mx-1 font-bold'>${objForNotification.offereAmount}M</span> for <span className='text-blue-700 mx-1 font-bold'>{objForNotification.offeredEquity}%</span> equity. </p>
          </div>)}
      </div>
    </div>
  )
}
