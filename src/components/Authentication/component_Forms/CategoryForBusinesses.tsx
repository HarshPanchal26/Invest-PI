import React, { SetStateAction } from 'react'
import Logo from '../../../Assets/logo'

type propsType = {
    handleNext: Function,
    setTypeofBusiness : SetStateAction<any>
}

const categoryForUser =
    [
        { URL: '', title: 'Established Industry Leaders', value: 'Industry Leaders' },
        { URL: '', title: 'Emerging Challengers', value: 'Emerging Challengers' },
        { URL: '', title: 'Visionary Startups', value: 'Visionary Startups' }
    ]

export default function CategoryForBusinesses({handleNext , setTypeofBusiness}: propsType) {

    const categoryDidSelect = (value : any)=>{
        setTypeofBusiness(value);
        handleNext()
    }

    return (
            <div className=' flex items-center justify-center h-auto flex-col'>
                <Logo />
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl my-10">Slecte your Preference</p>
                <div className='p-4 rounded-lg w-[80%] lg:w-5/6 text-center flex sm:flex-row flex-col flex-wrap h-[80%]  md:bg-gray-200'>

                    {categoryForUser.map((item, index) => {
                        return (
                            <div className='shadow-lg w-auto h-full rounded-lg text-center text-3xl my-10 mx-auto cursor-pointer border border-black bg-white '
                                onClick={() => categoryDidSelect(item.value)}>
                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyF_wARWd9jbfA9k88RvbIj-c-KWBYOsqAeg&usqp=CAU' alt='Innvestor iamge ' className='h-full w-[200px] mx-auto rounded-lg    '></img>
                                <p className="mt-2 font-bold tracking-tight text-gray-900 sm:text-2xl my-10 mx-4 w-fit h-auto">{item.title}</p>
                            </div>)
                    })
                    }

                </div>
            </div>
    )
}

