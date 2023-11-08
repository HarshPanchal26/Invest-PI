import React from 'react'


type Props = {
    ArrayForHighlights : Array<{
        title : string , 
        value : string | number,
    }>
}

export default function ViewHighLights( {ArrayForHighlights} : Props) {
    return (
        <div className='p-1 flex flex-row flex-wrap gap-6 w-full  justify-center'>
            {ArrayForHighlights.map((item , index) => {
                return (
                    (<div className='border rounded-lg min-w-max bg-slate-200 shadow-md md:p-10 p-5' key={index}>
                        <p className='text-2xl font-bold text-center text-blue-600'>{item.value}</p>
                        <p className='text-sm text-black mt-3'>{item.title}</p>
                    </div>)
                )
            })}
        </div>
    )
}
