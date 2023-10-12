import React, { useState } from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const styleForModal: any = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};


export default function ViewMedia({ ArrayForMedia }: any) {

    const [modalOpen, setModlaOpen] = useState<{ open: boolean, data: any | null }>({
        open: false,
        data: null
    })
    const handleOpenModal = () => {

    }

    // useEffect(() => {
    //     if (origianlArrayForAllMedia === null) {
    //         let newArray: Array<TypeForMediaData> = generateMediaData(contextForDashBord.USER.PRODUCTINSIDE.media);
    //         setOrigianlArrayForAllMedia(newArray);
    //     }
    // }, []);

    return (
        <>
            <div className='w-full border-l xl:mt-1 md:mt-15'>
                <ImageList sx={{ width: '80%', height: 450, margin: 'auto' }}>
                    {ArrayForMedia !== null && ArrayForMedia.map((item: any, index: number) => (
                        <ImageListItem key={index} className='cursor-pointer'
                            onClick={handleOpenModal}
                        >
                            <img
                                srcSet={item.img}
                                src={item.img}
                                alt={item.title}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={item.title}
                                subtitle={item.author}
                                actionIcon={
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label={`info about ${item.title}`}
                                    >
                                        <InfoIcon />
                                    </IconButton>
                                }
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
            <Modal
                open={modalOpen.open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='mx-2'
                key={0}
            >
                <>
                    <div className='w-full bg-white p-4 rounded-xl md:w-auto min-h-[400px] min-w-[400px]' style={styleForModal}>
                        <div className='p-2 text-2xl flex flex-row justify-between '>
                            <p className='my-auto  p-3 bg-gray-200 rounded-md'>{`Media`}</p>
                            <div className=' mr-0 my-auto bg-gray-200 rounded-full'>
                                <IconButton
                                    aria-label="upload picture"
                                    component="span"
                                    className="h-12 w-12 cursor-pointer bg-black border my-auto"
                                    style={{ color: 'black' }}
                                    onClick={() => setModlaOpen({ data: null, open: false })}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </div>
                        </div>
                        <div className='xl:block w-full p-2'>
                            <>
                                {modalOpen.data !== null &&
                                    (<div className='mx-auto w-full h-fit'>
                                        <ImageListItem className='cursor-pointer'
                                        // onClick={onClickOnInput}
                                        >
                                            <img
                                                srcSet={`${modalOpen.data.img}`}
                                                src={`${modalOpen.data.img}`}
                                                alt={modalOpen.data.title}
                                                loading="lazy"
                                            />
                                            <ImageListItemBar
                                                title={modalOpen.data.title}
                                                subtitle={modalOpen.data.subtitle}
                                                actionIcon={
                                                    <IconButton
                                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                        aria-label={`info about 'Shradhha kapoor'`}
                                                    >
                                                        <InfoIcon />
                                                    </IconButton>
                                                }
                                            />
                                        </ImageListItem>
                                </div>)}
                            </>
                        </div>
                    </div>
                </>
            </Modal>
        </>
    )
}
