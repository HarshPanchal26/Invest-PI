import React, { useEffect, useState, useContext } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button, IconButton } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { Modal } from '@mui/material';
import ModalForCreateUSPs from './ModalForCreateUSPs';
import EditIcon from '@mui/icons-material/Edit';
import { ContextForDashBord } from '../../../context/contextForDashBord';
import NoData from '../../../Assets/NoData';
import Loading from '../../../Assets/Loading';

type TypeForUSPData = {
    index : number,
    title: string,
    aboutUSP: string,
    imageUrl: string
    likes?: number,
}

type TypeForUpdateUsp = {
    objForUpdate : any | null,
    index : number
}

type StateTypeForModal = {
    open: boolean,
    child: string | null
}

const styleForModal: any = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

export default function USPs() {

    const [modalData, setModalData] = React.useState<StateTypeForModal>({
        open: false,
        child: null
    });

    const contextForDashBord = useContext(ContextForDashBord);

    const [dataForUSPs, setDataForUSPs] = useState<Array<any> | null>(null);
    const [dataForUpdateUSP, setDataForUpdateUSP] = useState<TypeForUpdateUsp>({
        objForUpdate : null,
        index :  -1
    });

    const handleOpenForModal = (feild: string, index: number) => {
        if (feild === 'update' && dataForUSPs !== null) {
            let ObjForUpdateUSP = dataForUSPs[index];
            setDataForUpdateUSP({
                objForUpdate : ObjForUpdateUSP,
                index : index
            });
        }
        setModalData({
            open: true,
            child: feild
        })
    }

    useEffect(() => {
        if (dataForUSPs === null) {
            setDataForUSPs(contextForDashBord.USER.PRODUCTINSIDE.usp);
        }
    }, [contextForDashBord]);

    return (
        <>
            {dataForUSPs !== null &&
                (<div className='w-full h-full '>
                    <div className=' block float-right my-3'>
                        <Button variant='outlined'
                            color='primary'
                            onClick={() => handleOpenForModal('new', -1)}
                        >{'Add USP '}</Button>
                    </div>
                    <main className='flex md:flex-row md:flex-wrap flex-col p-1 w-full h-auto gap-4 justify-center overflow-x-auto '>
                        {/* Component for USPs */}
                        {dataForUSPs !== null && dataForUSPs.length === 0 && (
                            <NoData />
                        )}
                        {dataForUSPs !== null && dataForUSPs.length > 0 &&
                            dataForUSPs.map((item, index) => {
                                return (
                                    <div className='flex border xl:w-1/5 md:w-1/3 min-h-[300px] h-fit flex-col rounded-lg relative shadow-lg' key={index}>
                                        <div className='h-1/5 border-b border-gray-400 w-full p-1 flex flex-row justify-between '>
                                            {/* Background Image */}
                                            <p className='text-left ml-2 p-2'>USP-{index + 1}</p>
                                            <IconButton
                                                aria-label="upload picture"
                                                component="span"
                                                className="h-12 w-12 my-2 cursor-pointer bg-black mx-10"
                                                style={{ color: 'black' }}
                                                onClick={() => handleOpenForModal('update', index)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </div>
                                        <div className='mt-2'>
                                            <div
                                                className='mx-auto w-28 h-28 rounded-full hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white cursor-pointer'
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
                    <Modal
                        open={modalData.open}
                        // onClose={handleCloseForModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        className='mx-2'
                    >
                        <div className='w-full bg-white p-4 rounded-xl md:w-auto min-h-[400px] min-w-[400px]' style={styleForModal}>
                            <div className='p-2 text-2xl flex flex-row justify-between '>
                                <p className='my-auto  p-3 bg-gray-200 rounded-md'>{`Add USPs`}</p>
                                <div className=' mr-0 my-auto bg-gray-200 rounded-full'>
                                    <IconButton
                                        aria-label="upload picture"
                                        component="span"
                                        className="h-12 w-12 cursor-pointer bg-black border my-auto"
                                        style={{ color: 'black' }}
                                        onClick={() => setModalData({ open: false, child: null })}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </div>
                            </div>
                            {/* Form For update or for creating new USP */}
                            {modalData.child === 'new' &&
                                <ModalForCreateUSPs
                                    closeModal={setModalData}
                                    setDataForUSPs={setDataForUSPs}
                                    task='new'
                                    dataForUSPs={dataForUSPs}
                                />}
                            {modalData.child === 'update' &&
                                <ModalForCreateUSPs
                                    objForUpdateUsp={dataForUpdateUSP}
                                    dataForUSPs={dataForUSPs}
                                    setDataForUpdateUSP={setDataForUpdateUSP}
                                    setDataForUSPs={setDataForUSPs}
                                    closeModal={setModalData}
                                    task='update'
                                />}
                        </div>
                    </Modal>
                </div>)
            }
            {dataForUSPs === null &&
                (<Loading />)
            }
        </>
    )
}
