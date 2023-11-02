import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NoData from '../../../../Assets/NoData';


export default function ViewUSPs({ ArrayForUSP }: any) {
    return (
        <main className='flex md:flex-row md:flex-wrap flex-col p-1 w-full h-auto gap-4 justify-center overflow-x-auto '>
            {/* Component for USPs */}
            {ArrayForUSP !== null && ArrayForUSP.length === 0 && (
                <NoData />
            )}
            {ArrayForUSP !== null && ArrayForUSP.length > 0 &&
                ArrayForUSP.map((item: any, index: number) => {
                    return (
                        <div className='flex border xl:w-1/5 md:w-1/3 min-h-[300px] h-fit flex-col rounded-lg relative shadow-lg' key={index}>
                            <div className='h-1/5 border-b border-gray-400 w-full p-1 flex flex-row justify-between '>
                                {/* Background Image */}
                                <p className='text-left ml-2 p-2'>USP-{index + 1}</p>
                            </div>
                            <div className='mt-2'>
                                <div
                                    className='mx-auto w-32 h-32 rounded-full hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white cursor-pointer'
                                    style={{
                                        backgroundImage: `url('https://cdn5.vectorstock.com/i/1000x1000/60/94/cartoon-glowing-yellow-light-bulb-vector-18016094.jpg')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                >
                                </div>
                                <div className='w-full mt-5'>
                                    <p className='text-center font-bold text-lg'>{item.title}</p>
                                </div>
                                <div className='h-auto mt-5 p-2 '>
                                    <div>
                                        <IconButton
                                            aria-label="upload picture"
                                            component="span"
                                            className="h-12 w-12 cursor-pointer"
                                            style={{ color: 'red' }}
                                        >
                                            <FavoriteBorderIcon />
                                            <span className='ml-2 text-lg'>{item.likes}</span>
                                        </IconButton>
                                    </div>

                                    <div>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <p className='text-center text-blue-600 cursor-pointer'>Learn More</p>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>
                                                    {item.aboutUSP}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </main>
    )
}
