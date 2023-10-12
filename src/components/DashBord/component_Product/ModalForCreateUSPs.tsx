import React, { useEffect, useState, useContext, SetStateAction } from 'react'
import Loading from '../../../Assets/Loading';
import axios from 'axios';
import { ContextForDashBord } from '../../../context/contextForDashBord';


// type TypeForUSPData = {
//     title: string,
//     aboutUSP: string,
//     imageUrl: string,
//     likes?: string,
// }

type TypeForUpdateUsp = {
    objForUpdate: any | null,
    index: number
}

type PropsType = {
    objForUpdateUsp?: TypeForUpdateUsp,
    task: 'update' | 'new',
    dataForUSPs: Array<any> | null
    setDataForUpdateUSP?: React.Dispatch<SetStateAction<TypeForUpdateUsp>>,
    setDataForUSPs: React.Dispatch<SetStateAction<Array<any> | null>>
    closeModal: React.Dispatch<SetStateAction<{ open: boolean, child: string | null }>>,
}


export default function ModalForCreateUSPs({ objForUpdateUsp, closeModal, dataForUSPs, task, setDataForUSPs, setDataForUpdateUSP }: PropsType) {

    const [loader, setLoader] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [updateData, setupdateData] = useState<any>({
        title: '',
        aboutUSP: '',
        imageUrl: '',
        likes: 0,
    });
    const contextForDashBord = useContext(ContextForDashBord);

    const handleChageInValue = (event: any) => {
        const { value, name } = event.target;
        setupdateData({
            ...updateData,
            [name]: value
        })

    }

    const handleUSPCreation = async () => {
        setLoader(true);
        try {
            const res = await axios.post('/product/create/usp', updateData);
            console.log("res For Usp", res);
            if (dataForUSPs !== null) {
                let newArray = [...dataForUSPs];
                newArray.push(updateData);
                setDataForUSPs(newArray);
                contextForDashBord.USER.PRODUCTINSIDE.usp = dataForUSPs;
            }
            closeModal({
                child: null,
                open: false
            })

        } catch (error: any) {
            setLoader(false);
            setError(error.message)
        }
    }

    const handleUpdate = async () => {
        setError(null);
        try {

        } catch (error: any) {
            setError(`${error?.message || error}`)
        }
    }

    useEffect(() => {
        if (task === 'update') {
            setupdateData(objForUpdateUsp?.objForUpdate);
        }
        setLoader(false);
    }, [])


    return (
        <>
            {/* {!loader && (<div className='overflow-auto h-auto mx-auto w-full'> */}
            <div className='overflow-auto h-auto mx-auto w-full'>
                {loader && <Loading />}
                {error !== null && !loader && <p className='text-red-600 flex text-sm justify-center'>{error}</p>}
                {!loader && (
                    <div className='p-2'>
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div className="col-span-5 md:col-span-3">
                                <label htmlFor="title" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Title For Usp
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        name="title"
                                        id="title"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={updateData.title}
                                        onChange={handleChageInValue}
                                    />
                                </div>
                            </div>
                            <div className="col-span-5 md:col-span-3">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                    About USP
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        name="aboutUSP"
                                        id="aboutUSP"
                                        value={updateData.aboutUSP}
                                        onChange={handleChageInValue}
                                        className="block w-full p-5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="mt-10 col-span-3">
                                <button
                                    type="button"
                                    onClick={task === 'update' ? handleUpdate : handleUSPCreation}
                                    className="flex rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 justify-center w-full"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </>
    )
}
