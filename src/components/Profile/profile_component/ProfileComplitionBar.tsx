import React , {useContext} from 'react'
import { Avatar } from '@mui/material'
import { ContextForDashBord } from '../../../context/contextForDashBord'
type TypeForProfileObj = {
    objForProfile: any,
    loader: boolean
}

type PropsTypeForComplitionBar = {
    objForProfile: any,
    setStateForProfilePage: React.Dispatch<React.SetStateAction<TypeForProfileObj>>
}



export default function ProfileComplitionBar({ objForProfile, setStateForProfilePage }: PropsTypeForComplitionBar) {
   
    const contextForDashBord = useContext(ContextForDashBord);
    return (
        <div className='w-full my-4 p-2 rounded-lg mx-auto '>
            <div className='bg-gray-100 border w-full p-4  rounded-xl'>
                <img src='https://img.freepik.com/premium-vector/white-exclamation-mark-sign-red-circle-isolated-white-background_120819-332.jpg?w=2000' alt='Incomplete logo' className='w-10 h-10'/>
            <p className='p-2 my-1 text-2xl'>{'Complete Your Profile'}</p>
            <div className='flex flex-row flex-wrap mx-auto justify-center gap-3 bg-gray-100 cursor-pointer '>
                {contextForDashBord.USER.PROFILEIMAGE &&  contextForDashBord.USER.PROFILEIMAGE === 'NA'&& (
                <div className="flex flex-row p-2 rounded-lg bg-white min-w-min ">
                    <Avatar
                        alt="Remy Sharp"
                        src="https://media.istockphoto.com/id/1248723171/vector/camera-photo-upload-icon-on-isolated-white-background-eps-10-vector.jpg?s=612x612&w=0&k=20&c=e-OBJ2jbB-W_vfEwNCip4PW4DqhHGXYMtC3K_mzOac0="
                        sx={{ width: 60, height: 60 }}
                        className="rounded-full w-40 h-40 border-4 border-white shadow-lg"
                    />
                    <div className='mx-4 my-auto max-w-xs text-left'>
                          {`Add Your Profie Photo and make stand out your profile among others.`}
                    </div>
                </div>)}
                {contextForDashBord.USER.COVERIMAGE &&  contextForDashBord.USER.COVERIMAGE === 'NA'&& (
                <div className="flex flex-row p-2 rounded-lg bg-white min-w-min ">

                    <Avatar
                        alt="Remy Sharp"
                        src="https://media.istockphoto.com/id/1248723171/vector/camera-photo-upload-icon-on-isolated-white-background-eps-10-vector.jpg?s=612x612&w=0&k=20&c=e-OBJ2jbB-W_vfEwNCip4PW4DqhHGXYMtC3K_mzOac0="
                        sx={{ width: 60, height: 60 }}
                        className="rounded-full w-40 h-40 border-4 border-white shadow-lg"
                    />
                    <div className='mx-4 my-auto max-w-xs text-left'>
                          {`Add Your Cover Photo and make stand out your profile among others.`}
                    </div>
                </div>)}
                {contextForDashBord.USER.BIO &&  contextForDashBord.USER.BIO === 'NA'&& (
                <div className="flex flex-row p-2 rounded-lg bg-white min-w-min ">

                    <Avatar
                        alt="Remy Sharp"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiE8soY9I0XN_BlgCOakInwpIkdwEO0zfomA&usqp=CAU"
                        sx={{ width: 60, height: 60 }}
                        className="rounded-full w-40 h-40 border-4 border-white shadow-lg"
                    />
                    <div className='mx-4 my-auto max-w-xs text-left'>
                          {`Write Something about you in bio and Let the world know who you are .`}
                    </div>
                </div>)}
                {contextForDashBord.USER.ABOUT &&  contextForDashBord.USER.ABOUT === 'NA'&& (
                <div className="flex flex-row p-2 rounded-lg bg-white min-w-max ">

                    <Avatar
                        alt="Remy Sharp"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiE8soY9I0XN_BlgCOakInwpIkdwEO0zfomA&usqp=CAU"
                        sx={{ width: 60, height: 60 }}
                        className="rounded-full w-40 h-40 border-4 border-white shadow-lg"
                    />
                    <div className='mx-4 my-auto max-w-xs text-left'>
                          {`Add Your Somthing about you in bio and Let the world know who you are .`}
                    </div>
                </div>)}
                {contextForDashBord.USER.INVESTMENTS &&
                contextForDashBord.USER.INVESTMENTS.length === 0 && (
                <div className="flex flex-row p-2 rounded-lg bg-white min-w-min ">

                    <Avatar
                        alt="Remy Sharp"
                        src="https://w7.pngwing.com/pngs/972/334/png-transparent-computer-icons-add-logo-desktop-wallpaper-add-thumbnail.png"
                        sx={{ width: 60, height: 60 }}
                        className="rounded-full w-40 h-40 border-4 border-white shadow-lg"
                    />
                    <div className='mx-4 my-auto max-w-xs text-left'>
                          {`Add Your Investment Experiance and let pepole know about it.`}
                    </div>
                </div>)}
                {contextForDashBord.USER.THOUGHTS &&
                contextForDashBord.USER.THOUGHTS.length === 0 && (
                <div className="flex flex-row p-2 rounded-lg bg-white min-w-min ">

                    <Avatar
                        alt="Remy Sharp"
                        src="https://w7.pngwing.com/pngs/972/334/png-transparent-computer-icons-add-logo-desktop-wallpaper-add-thumbnail.png"
                        sx={{ width: 60, height: 60 }}
                        className="rounded-full w-40 h-40 border-4 border-white shadow-lg"
                    />
                    <div className='mx-4 my-auto max-w-xs text-left'>
                          {`Make Your First Post and Introduce yourself to community.`}
                    </div>
                </div>)}
            </div>
            </div>
        </div>
    )
}
