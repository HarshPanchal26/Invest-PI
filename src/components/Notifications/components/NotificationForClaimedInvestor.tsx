import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material'
import { CommanUserDataStotage  , GenerateObjForCommanUserData} from '../../../utils/factory/ObjForUser'
import axios from 'axios'
import Loading from '../../../Assets/Loading'
import AvatarGroup from '@mui/material/AvatarGroup';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

type Props = {
    objForNotification: any
}

export default function NotificationForClaimedInvestor({ objForNotification }: Props) {

    const [objForCompany, setObjForCompany] = useState<any | null>(null);
    const [ArrayForAllInvestors, setArrayForAllInvestors] = useState<Array<[]>>([]);

    // const fetchUser = async (id: String) => {
    //     let findLocal: any = []
    //     console.log("We are First IF Block" , CommanUserDataStotage)
    //     if(CommanUserDataStotage.length > 0){
    //         findLocal = CommanUserDataStotage.filter((item: any) => item._id === id)
    //     }
    //     if (findLocal[0]) {
    //         console.log("We are inside IF Block")
    //         return findLocal[0];
    //     } else {
    //         console.log("We are inside ELSE Block")
    //         try {
    //             const array = await axios.get(`/api/profile/filter/?find=${id}`);
    //             GenerateObjForCommanUserData(array.data)
    //             return array.data;
    //         } catch (error: any) {
    //             console.log("error", error)
    //         }
    //     }
    // }
    const fetchUser = async (id: String) => {
        let findLocal: any = [];
        if (CommanUserDataStotage.length > 0) {
            findLocal = CommanUserDataStotage.filter((item: any) => item._id === id);
        }
        // If the data is found, return it
        if (findLocal[0]) {
            return findLocal[0];
        } else {
            try {
                const array = await axios.get(`/api/profile/filter/?find=${id}`);
                GenerateObjForCommanUserData(array.data);
                return array.data;
            } catch (error: any) {
                console.log("error", error);
            }
        }
    }
    
    const fetchAllInvestors = async () => {
        for (let i = 0; i < objForNotification?.allinvestors.length; i++) {
            let res = await fetchUser(objForNotification?.allinvestors[i],)
            let newArray = [...ArrayForAllInvestors];
            newArray.push(res);
            setArrayForAllInvestors(newArray)
        }
    }

    const fetchOrganization = async () => {
        let profile = await fetchUser(objForNotification.company);
        setObjForCompany({ ...profile })
    }

    useEffect(() => {
        if (objForCompany === null) {
            fetchOrganization()
        }
        if (ArrayForAllInvestors.length === 0) {
            fetchAllInvestors()
        }
    }, [])

    return (
        <div className='flex flex-row px-4 py-2 text-sm text-gray-700 cursor-pointer text-left border-b items-center'
        // onClick={() => handleClickForAccount(item.value)}
        >
            {(!objForCompany || ArrayForAllInvestors.length === 0) && (
                <Loading />
            )}
            {objForCompany && ArrayForAllInvestors.length > 0 && (
                <div className='flex flex-col w-full h-auto'>
                    <div className='flex flex-row gap-3'>
                        <Avatar
                            alt="Remy Sharp"
                            src={objForCompany?.profileImage}
                            sx={{ width: 60, height: 60 }}
                            className="rounded-full border-4 border-white shadow-lg"
                        />
                        <div className='p-2'>
                            <p className='text-xl font-bold text-left'>
                                {objForCompany?.name}
                            </p>
                            <p className='text-md text-left'>
                                You have been claimed as a one of a investor in this company .
                            </p>
                        </div>
                    </div>
                    <div className='mt-2 flex flex-row justify-between'>
                        <div className=' p-2'>
                            <p className='text-sm text-gray-700 mb-2'>Investors</p>
                            <AvatarGroup max={4}>
                                <Avatar alt="Remy Sharp" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTP5mQSEI40IsJlF-L-sNFVuqS-bIbXJ3bfkdu_tNrPp-0v3Awn" />
                                {ArrayForAllInvestors.map((item : any)=>{
                                    return (
                                        <Avatar alt="Remy Sharp" src={item?.profileImage} />   
                                    )
                                })}
                            </AvatarGroup>
                        </div>
                            <div className='block my-5 mx-6'>
                                <Stack direction="row" spacing={1}>
                                    <Chip icon={<CheckIcon />} label="Accept" variant='outlined' color='primary' style={{
                                        padding: '20px'
                                    }} />
                                    <Chip icon={<ClearIcon />} label="Decline" variant="filled" color='primary' style={{
                                        padding: '20px'
                                    }} />
                                </Stack>
                            </div>
                    </div>
                </div>
            )}
        </div>
    )
}
