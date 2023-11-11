import React, { useEffect, useState, useContext } from 'react'
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
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
import { ContextForDashBord } from '../../../../context/contextForDashBord';
import NoData from '../../../../Assets/NoData';
import Loading from '../../../../Assets/Loading';
import { Avatar } from '@mui/material';

type TypeForUSPData = {
    index: number,
    title: string,
    aboutUSP: string,
    imageUrl?: string
    likes?: number,
}

type TypeForUpdateUsp = {
    data: TypeForUSPData | null,
    index: number
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

    const [dataForUSPs, setDataForUSPs] = useState<Array<TypeForUSPData> | null>(null);
    const [dataForUpdateUSP, setDataForUpdateUSP] = useState<TypeForUpdateUsp>({
        data: null,
        index: -1
    });

    const handleOpenForModal = (feild: string, index: number) => {
        if (feild === 'update' && dataForUSPs !== null) {
            let ObjForUpdateUSP = dataForUSPs[index];
            setDataForUpdateUSP({
                data: ObjForUpdateUSP,
                index: index
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
    }, [contextForDashBord.USER.PRODUCTINSIDE.usp]);

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
                                    <div className='flex border xl:w-[15%] md:w-[30%] min-h-[300px] h-fit flex-col rounded-lg relative shadow-lg ' key={index}>
                                        <div className='h-1/5 border-b border-gray-400 w-full p-1 flex flex-row justify-between '>
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
                                            <div className='w-full p-1'>
                                            <Avatar
                                                alt="Remy Sharp"
                                                src={item.imageUrl}
                                                sx={{ width: 120, height: 120 }}
                                                className="rounded-full w-40 h-40 border-4 mx-auto border-white shadow-lg"
                                            />
                                            </div>
                                            <div className='w-full mt-5'>
                                                <p className='text-center font-bold text-lg'>{item.title}</p>
                                            </div>
                                            <div className='h-auto mt-5 p-2 '>
                                                {/* <div>
                                                    <IconButton
                                                        aria-label="upload picture"
                                                        component="span"
                                                        className="h-12 w-12 cursor-pointer"
                                                        style={{ color: 'red' }}
                                                    >
                                                        <FavoriteBorderIcon />
                                                        <span className='ml-2 text-lg'>{item.likes}</span>
                                                    </IconButton>
                                                </div> */}
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
                                    dataForUSPs={dataForUSPs && dataForUSPs}
                                    setDataForUSPs={setDataForUSPs}
                                    task='new'
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
