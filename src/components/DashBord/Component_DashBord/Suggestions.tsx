import { useEffect, useState, useContext } from "react"
import { CF, INDIVIDUAL, PRODUCT } from '../../Route/type.router'
import Skeleton from '@mui/material/Skeleton';
import axios from "../../../../axios.config";
import { ContextForDashBord } from "../../../context/contextForDashBord";
import { useNavigate } from "react-router-dom";

function SkeletonForSuggestions() {
    return (
        <>
            <div className="flex flex-row flex-wrap gap-x-4 gap-y-4 w-full p-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
                    return (
                        <Skeleton variant="rectangular" width={260} height={300} key={index} />
                    )
                })}
            </div>
        </>
    )
}
export default function Suggestions() {
    const contextForDashBord = useContext(ContextForDashBord);
    const navigate = useNavigate();
    const [SuggestedUser, SetSuggestedUser] = useState<[] | null>(null);

    const fetchStore = async () => {
        try {
            const resForIndi = await axios.get(`${import.meta.env.VITE_APP_API_URL}profile/users/suggestions?category=${contextForDashBord.USER.TYPE}`)
            SetSuggestedUser(resForIndi.data.newData)
        } catch (error) {
            console.log("Erro is", error)
        }
    }

    useEffect(() => {
        SuggestedUser === null && fetchStore()
    }, [])
    return (
        <>
            {/*Box for tops start up*/}
            <div className="mx-2 my-5 border rounded-lg bg-slate-200 w-full">
                <h3 className="border-b-2 my-4 items-center ">Suggestions</h3>
                {SuggestedUser !== null && (
                    <ul className="divide-y divide-gray-100 rounded-lg bg-white">
                        {SuggestedUser.map((person: any , index) => (
                            <li key={index} className="flex justify-between gap-x-6 py-5 mx-2 cursor-pointer"
                            onClick={()=>navigate(`/profile/${person.username}/`)}
                            >
                                <div className="flex gap-x-4">
                                    <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.profileImage} alt="" />
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">@{person.username}</p>
                                    </div>
                                </div>
                                <div className="hidden sm:flex sm:flex-col sm:items-end">
                                    <p className="text-sm leading-6 text-gray-900">{person.role}</p>
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
                            </li>
                        ))}
                    </ul>)
                }
            </div>
        </>
    )
}
