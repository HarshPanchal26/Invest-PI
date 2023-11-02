import React, { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ContextForDashBord } from '../../context/contextForDashBord';
import Loading from '../../Assets/Loading';
import ProfileForCF from './ProfileForCF';
import ProfileForCompany from './ProfileForCompany';
import ProfileForIndividual from './ProfileForIndividual';
import Suggestions from '../DashBord/Component_DashBord/Suggestions';
import ProfileComplitionBar from './profile_component/ProfileComplitionBar';

type TypeForProfileObj = {
    objForProfile: any,
    loader: boolean
}

export default function Profile() {

    const contextForDashBord = useContext(ContextForDashBord);

    const { username } = useParams();
    const decodedUsername = username && decodeURIComponent(username);

    const [stateForProfilePage, setStateForProfilePage] = useState<TypeForProfileObj>({
        objForProfile: null,
        loader: true
    })

    const checkUser = async (username: string | undefined) => {
        if (username) {
            setStateForProfilePage({
                objForProfile: null,
                loader: true
            });
            try {
                const Obj = await contextForDashBord.checkForVisitedAccount(username);
                console.log("Username from profile New", Obj);
                setStateForProfilePage({
                    objForProfile: Obj,
                    loader: false
                })

            } catch (error) {
                console.log("Error from profile page ", error);
            }
        }
    }
    useEffect(() => {
        if (contextForDashBord.isAutorizedUser) {
            if (stateForProfilePage.objForProfile == null || stateForProfilePage.objForProfile?.USERNAME !== username) {
                checkUser(decodedUsername);
            }
        } else {
            contextForDashBord.checkAuthorization();
        }   
    }, [username , decodedUsername]);

    useEffect(() => {
        console.log("stateForProfilePage", stateForProfilePage.objForProfile)
    }, [stateForProfilePage])
    return (
        <>

            {contextForDashBord.USER.USERNAME === username &&
                <ProfileComplitionBar objForProfile={stateForProfilePage.objForProfile} setStateForProfilePage={setStateForProfilePage} />}
            <div className='bg-white h-auto flex flex-row  xl:mx-5 '>

                <div className="bg-white shadow-lg overflow-hidden xl:w-2/3 w-full">
                    <div className=' my-5 overflow-auto h-auto'>
                        {
                            stateForProfilePage.loader && (
                                <Loading />
                            )
                        }
                        {
                            !stateForProfilePage.loader && (
                                <div>
                                    {stateForProfilePage.objForProfile.TYPE === "product" && <ProfileForCompany objForProfile={stateForProfilePage.objForProfile} />}
                                    {stateForProfilePage.objForProfile.TYPE === "CF" && <ProfileForCF objForProfile={stateForProfilePage.objForProfile} />}
                                    {stateForProfilePage.objForProfile.TYPE === "individual" && <ProfileForIndividual objForProfile={stateForProfilePage.objForProfile} />}
                                </div>
                            )
                        }

                    </div>

                </div>
                <div className='xl:w-1/3 xl:flex hidden flex-col items-center mx-5'>

                    <Suggestions />
                </div>

            </div>
        </>
    )

}

