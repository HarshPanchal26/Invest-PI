import React, { useEffect, useContext, useState } from 'react'
import { ContextForDashBord } from '../../../../context/contextForDashBord';
import ViewTable from './ViewTable';
import ViewMedia from './ViewMedia';
import ViewUSPs from './ViewUSPs';
import ViewAnswers from './ViewAnswers';
import ViewHighLights from './ViewHighLights';
import BackButton from '../../../../Assets/BackButton';
import { useParams } from 'react-router-dom';
import axios from '../../../../../axios.config';
import { ContextTypeForPitches, ContextTypeForComapnyDataForPitch, ContextTypeForProductsDataForPitch } from '../../../../utils/type'
import { GenerateObjForPitchData, GenerateCompanyObjForPitch, GenerateProductObjDataForPitch, CommanStorageForVisitedPitch } from '../../../../utils/factory/ObjForUser'
import { Modal, Avatar, Button, Backdrop, CircularProgress} from '@mui/material'
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

type TypeForPitchData = {
    PITCHDATA: ContextTypeForPitches | null,
    COMPANYDATA: ContextTypeForComapnyDataForPitch | null,
    PRODUCTDATA: ContextTypeForProductsDataForPitch | null
}

type Props = {
    PitchData: ContextTypeForPitches | null,
    CompanyData: ContextTypeForComapnyDataForPitch | null,
    ProductData: ContextTypeForProductsDataForPitch | null
}

export default function ViewPitch({ PitchData = null, CompanyData = null, ProductData = null }: Props) {

    const contextForDashBord = useContext(ContextForDashBord);
    const { id } = useParams();
    const [ArrayForPitchData, setArrayForPitchData] = useState<TypeForPitchData>({
        PITCHDATA: null,
        COMPANYDATA: null,
        PRODUCTDATA: null
    });
    const [ErrorMessage, setErrorMessage] = useState({
        counterEquity: '',
        counterFund: ''
    })
    const [openmodal, setModal] = useState<boolean>(false);
    const [openBackDrop, setBackDrop] = useState<boolean>(false);

    let FetchedObjFromLocalStotage: TypeForPitchData = {
        COMPANYDATA: null,
        PITCHDATA: null,
        PRODUCTDATA: null
    };

    const styleForModal: any = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };

    let IndexOfFetchedObjFromLocalStotage: number;

    const fetchData = async (pitchId: string | undefined) => {
        if (pitchId) {
            let isInLocalStore = true;
            try {
                let pitchData = CommanStorageForVisitedPitch.filter((item, index) => {
                    if (item.PITCHDATA?._id === pitchId) {
                        IndexOfFetchedObjFromLocalStotage = index;
                    }
                    return item.PITCHDATA?._id === pitchId
                });

                if (pitchData.length === 0) {
                    isInLocalStore = false;
                } else {
                    FetchedObjFromLocalStotage = pitchData[0];
                    setArrayForPitchData(pitchData[0]);
                }

                if (!isInLocalStore) {

                    const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}pitches/fetch/single?uid=${pitchId}`);
                    console.log("Fetching Pitch ", res)
                    const GObjForPitch = GenerateObjForPitchData(res.data.pitch.pitchData);
                    FetchedObjFromLocalStotage.PITCHDATA = GObjForPitch
                    const GObjForCompany = GenerateCompanyObjForPitch(res.data.pitch.organizationData);
                    FetchedObjFromLocalStotage.COMPANYDATA = GObjForCompany
                }
                if (!isInLocalStore || FetchedObjFromLocalStotage?.PRODUCTDATA === null) {
                    const resForProducts = await axios.get(`${import.meta.env.VITE_APP_API_URL}product/fetch/all?id=${FetchedObjFromLocalStotage.PITCHDATA?.rid}`);
                    const GObjForProducts = GenerateProductObjDataForPitch(resForProducts.data.product);
                    console.log("Product Inside" , GObjForProducts)
                    FetchedObjFromLocalStotage.PRODUCTDATA = GObjForProducts
                    setArrayForPitchData({
                        COMPANYDATA: FetchedObjFromLocalStotage.COMPANYDATA,
                        PITCHDATA: FetchedObjFromLocalStotage.PITCHDATA,
                        PRODUCTDATA: GObjForProducts
                    });
                }

                if (isInLocalStore) {
                    CommanStorageForVisitedPitch[IndexOfFetchedObjFromLocalStotage].PRODUCTDATA = FetchedObjFromLocalStotage.PRODUCTDATA
                } else {
                    CommanStorageForVisitedPitch.push(FetchedObjFromLocalStotage);
                }
            } catch (error) {
                console.log("Error while fetching data ", error)
            }
        }
    }

    const handleCounterOffers = async () => {
        const counterAmountEle = document.getElementById('counterFund') as HTMLInputElement
        let counterAmount = counterAmountEle.value;
        const counterEquityEle = document.getElementById('counterEquity') as HTMLInputElement
        let counterEquity = counterEquityEle.value;
        if (!ErrorMessage.counterEquity && !ErrorMessage.counterFund && counterAmountEle.value && counterEquityEle.value) {
            setBackDrop(true);
            let ObjForCounterOffer = {
                pitchId: ArrayForPitchData.PITCHDATA?._id,
                offerBy: contextForDashBord.USER.USERID,
                offerTo: ArrayForPitchData.COMPANYDATA?.rid,
                counterAmout: counterAmount,
                counterEquity: counterEquity
                }

            try {
                const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}pitches/counter/create`, ObjForCounterOffer);
                console.log("Counter offer", res)
                setBackDrop(false);
                setModal(false);
            } catch (error) {

            }
        }
    }

    const handleChageInValue = (event: any) => {
        const { name, value } = event.target;

        if (name === 'counterFund' && (value === '' || value == 0)) {
            setErrorMessage({
                ...ErrorMessage,
                counterFund: 'Please Enter Valid values counterFund.'
            })
        }

        if (name === 'counterFund' && (value !== '' && value != 0) && ErrorMessage.counterFund) {
            setErrorMessage({
                ...ErrorMessage,
                counterFund: ''
            })
        }

        if (name === 'counterEquity' && (value !== '' && value != 0) && ErrorMessage.counterEquity) {
            setErrorMessage({
                ...ErrorMessage,
                counterEquity: ''
            })
        }

        if (name === 'counterEquity' && (value === '' || value == 0)) {
            setErrorMessage({
                ...ErrorMessage,
                counterEquity: 'Please Enter Valid values .'
            })
        }
        if (name === 'counterEquity' && (value === '' || parseInt(value) > 99 )) {
            setErrorMessage({
                ...ErrorMessage,
                counterEquity: 'Please offer valid Equity.'
            })
        }
    }

    const hanIntrests = () => {

    }

    useEffect(() => {
        if (contextForDashBord.isAutorizedUser) {
            if (ArrayForPitchData.PITCHDATA?._id !== id) {
                fetchData(id);
            }
        } else {
            contextForDashBord.checkAuthorization();
        }
    }, [id])

    useEffect(() => {
        console.log("Updated ", ArrayForPitchData)
    }, [ArrayForPitchData])

    return (
        <div className='w-full h-full overflow-auto'>
            <BackButton />
            {ArrayForPitchData.PRODUCTDATA !== null && (<div className='xl:w-4/5 w-full mx-auto '>
                {ArrayForPitchData.COMPANYDATA !== null && (<div className="grid grid-cols-2 gap-x-6 sm:grid-cols-6 gap-y-0">
                    <div className='col-span-1 order-1 mx-auto'>
                        <Avatar
                            alt="Remy Sharp"
                            src={ArrayForPitchData.COMPANYDATA.profileImage}
                            sx={{ width: 100, height: 100 }}
                            className='my-5 mx-2'
                        />
                    </div>
                    <div className='my-5 col-span-4 md:text-left md:order-2 order-3 text-center '>
                        <span className='text-lg  text-slate-500'>Product</span>
                        <p className='text-3xl font-bold my-2'>{ArrayForPitchData.COMPANYDATA?.companyname}</p>
                        <p className='text-xl my-2 text-gray-700'>{ArrayForPitchData.COMPANYDATA?.bio}</p>
                    </div>
                    <div className='my-5 md:order-3 order-2 cursor-pointer col-span-1'>
                        <span className='text-lg  text-slate-500'>Rank</span>
                        <p className='text-3xl font-bold my-2 underline'>1</p>
                    </div>
                </div>)}
                {/* <div className='w-full flex flex-row flex-wrap gap-4 justify-end my-5'>
                    <Button variant='contained' color='primary' style={{ padding: "10px" }}>Interested</Button>
                    <Button variant='outlined' color='primary' style={{ padding: "10px" }}>Counter Offer</Button>
                </div> */}
                <main className='h-auto w-full'>
                    <div className='w-full flex md:flex-row flex-col p-2 gap-3 h-auto'>
                        <div className='p-1 xl:w-2/3 w-full'>
                            {/* About Sections */}
                            <div className='text-2xl font-bold text-left my-1'>About</div>
                            <div className='bg-slate-200 p-2 rounded-lg '>
                                <p className='text-left text-xl mx-1 mt-2 p-3'>
                                    {ArrayForPitchData.COMPANYDATA?.about}

                                </p>
                            </div>
                            <div className='my-5 p-2 rounded-lg '>
                                <div className='text-2xl font-bold text-left my-4'>Media</div>
                                <ViewMedia ArrayForMedia={ArrayForPitchData.PRODUCTDATA?.media} />
                            </div>
                        </div>
                        {/* Side Pannle for Pitch */}
                        <div className='p-1 xl:w-1/3 xl:block hidden h-fit border-l-2'>
                            <div className='w-full'>
                                <div className='text-2xl font-bold text-left mx-2'>Details</div>
                                <div className='w-full text-left my-4 cursor-pointer border-b mx-3'>
                                    <p className='text-sm text-gray-700 mx-3'>Industry</p>
                                    <div className='w-full my-3'>
                                        <p className='mx-2 p-2 text-center border-blue-600 bg-blue-600 inline-block text-white rounded-lg'>{ArrayForPitchData.COMPANYDATA?.industry}</p>
                                    </div>
                                </div>
                                <div className='w-full text-left my-4 cursor-pointer border-b mx-3'>
                                    <p className='text-sm text-gray-700 mx-3'>Specialization</p>
                                    <div className='w-full my-3'>
                                        <p className='mx-2 p-2 text-center border-blue-600 bg-blue-600 inline-block text-white rounded-lg'>{ArrayForPitchData.COMPANYDATA?.specialization}</p>
                                    </div>
                                </div>
                                <div className='w-full text-left my-4 cursor-pointer border-b mx-3'>
                                    <p className='text-sm text-gray-700 mx-3'>Headquarters</p>
                                    <div className='w-full my-1'>
                                        <p className='mx-2 p-2 text-left font-bold'>
                                            {ArrayForPitchData.COMPANYDATA?.headquarters}</p>
                                    </div>
                                </div>
                                <div className='w-full text-left my-4 cursor-pointer border-b mx-3'>
                                    <p className='text-sm text-gray-700 mx-3'>Country</p>
                                    <div className='w-full my-1'>
                                        {/* <MapPinIcon style={{ width: '25px', height: '25px' }} /> */}
                                        <p className='mx-2 p-2 text-left font-bold'>{ArrayForPitchData.COMPANYDATA?.city} ,{ArrayForPitchData.COMPANYDATA?.state},{ArrayForPitchData.COMPANYDATA?.country}</p>
                                    </div>
                                </div>
                                <div className='w-full text-left my-4 cursor-pointer border-b mx-3'>
                                    <p className='text-sm text-gray-700 mx-3'>Contacts</p>
                                    <div className='w-full my-1'>
                                        <p className='mx-2 p-2 text-left font-bold'>
                                            {ArrayForPitchData.COMPANYDATA?.email}</p>
                                    </div>
                                </div>
                                <div className='w-full text-left my-4 cursor-pointer border-b mx-3'>
                                    <p className='text-sm text-gray-700 mx-3'>Size</p>
                                    <div className='w-full my-1'>
                                        <p className='mx-2 p-2 text-left font-bold'>
                                            {ArrayForPitchData.COMPANYDATA?.size}</p>
                                    </div>
                                </div>
                                <div className='w-full text-left my-4 cursor-pointer border-b mx-3'>
                                    <p className='text-sm text-gray-700 mx-3'>Link</p>
                                    <div className='w-full my-1'>
                                        <p className='mx-2 p-2 text-left font-bold'>
                                            {ArrayForPitchData.COMPANYDATA?.link}</p>
                                    </div>
                                </div>
                                <div className='w-full text-left my-4 cursor-pointer border-b mx-3'>
                                    <p className='text-sm text-gray-700 mx-3'>Stage</p>
                                    <div className='w-full my-1'>
                                        <p className='mx-2 p-2 text-left font-bold'>
                                            {ArrayForPitchData.COMPANYDATA?.stage}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full p-3'>
                        {/* USPs */}
                        <div className='my-5 p-2 rounded-lg'>
                            <div className='text-2xl font-bold text-left my-4'>USPs</div>
                            <ViewUSPs ArrayForUSP={ArrayForPitchData.PRODUCTDATA?.usp} />
                        </div>
                        {ArrayForPitchData.PITCHDATA && ArrayForPitchData.PRODUCTDATA && (<div className='my-11'>
                            <div className='text-2xl font-bold text-left my-4'>States</div>
                            <ViewHighLights ArrayForHighlights={[
                                { title: 'Valuation', value: `$${ArrayForPitchData.PRODUCTDATA.totalValuation}M` },
                                { title: 'Raised Fund', value: `$${ArrayForPitchData.PRODUCTDATA.totalRaisedFund}M` },
                                { title: 'Total Investors', value: ArrayForPitchData.PRODUCTDATA.totalInvestor },
                                { title: 'Valuation', value: ArrayForPitchData.PRODUCTDATA.totalValuation },
                                { title: 'Bussiness Mode', value: ArrayForPitchData.PITCHDATA.buisnessMode === 'Both' ? 'Online/offline' : ArrayForPitchData.PITCHDATA.buisnessMode },
                            ]} />
                        </div>)}
                        {/* Table*/}
                        <div className='my-11'>
                            <div className='text-2xl font-bold text-left my-10'>Finance</div>
                            <ViewTable
                                dataForInvestments={ArrayForPitchData.PRODUCTDATA?.investments}
                            />
                        </div>
                        {/* Answers of Questions */}
                        {ArrayForPitchData.PITCHDATA && (<div className='my-11'>
                            <div className='text-2xl font-bold text-left my-4'>OverView</div>
                            <ViewHighLights ArrayForHighlights={[
                                { title: 'Seeking Amount', value: `$${ArrayForPitchData.PITCHDATA.seekingFund}M` },
                                { title: 'Offer for Equity', value: `${ArrayForPitchData.PITCHDATA.offeredEquity}%` },
                                // { title: 'Maximun Offer for Equity', value: `${ArrayForPitchData.PITCHDATA.maximunOffer}%` },
                                { title: 'Funding Type', value: ArrayForPitchData.PITCHDATA.fundingType },
                                { title: 'Customers (avg of year)', value: ArrayForPitchData.PITCHDATA?.avgYearCustomer },
                                { title: 'Sales (avg of year)', value: ArrayForPitchData.PITCHDATA?.avgYearSale },
                                { title: 'App/Web Visits (avg of year)', value: ArrayForPitchData.PITCHDATA?.avgYearViews },
                            ]} />
                        </div>)}
                        {ArrayForPitchData.PITCHDATA && (<div className='my-11'>
                            <div className='text-2xl font-bold text-left my-4'>Business FAQs</div>
                            < ViewAnswers ArrayForFAQs={ArrayForPitchData.PITCHDATA.FAQS.Business} />
                        </div>)}
                        {ArrayForPitchData.PITCHDATA && (<div className='my-11'>
                            <div className='text-2xl font-bold text-left my-4'>Perfomance FAQs</div>
                            < ViewAnswers ArrayForFAQs={ArrayForPitchData.PITCHDATA.FAQS.Performance} />
                        </div>)}
                        {ArrayForPitchData.PITCHDATA && (<div className='my-11'>
                            <div className='text-2xl font-bold text-left my-4'>Market FAQs</div>
                            < ViewAnswers ArrayForFAQs={ArrayForPitchData.PITCHDATA.FAQS.Market} />
                        </div>)}
                        {ArrayForPitchData.PITCHDATA && (<div className='my-11'>
                            <div className='text-2xl font-bold text-left my-4'>Financial FAQs</div>
                            < ViewAnswers ArrayForFAQs={ArrayForPitchData.PITCHDATA.FAQS.Financials} />
                        </div>)}
                        {ArrayForPitchData.PITCHDATA && (<div className='my-11'>
                            <div className='text-2xl font-bold text-left my-4'>Equity FAQs</div>
                            < ViewAnswers ArrayForFAQs={ArrayForPitchData.PITCHDATA.FAQS.Equity} />
                        </div>)}
                    </div>
                    <div className='p-1 xl:hidden block h-fit w-4/5'>
                        <div className='w-full'>
                            <div className='text-2xl font-bold text-left mx-2'>Details</div>
                            <div className='w-full text-left my-4 cursor-pointer border-b mx-3'>
                                <p className='text-sm text-gray-700 mx-3'>Industry</p>
                                <div className='w-full my-3'>
                                    <p className=' p-2 text-center border-blue-600 bg-blue-600 inline-block text-white rounded-lg'>{ArrayForPitchData.COMPANYDATA?.industry}</p>
                                </div>
                            </div>
                            <div className='w-full text-left my-4 cursor-pointer border-b mx-3'>
                                <p className='text-sm text-gray-700 mx-3'>Specialization</p>
                                <div className='w-full my-3'>
                                    <p className='p-2 text-center border-blue-600 bg-blue-600 inline-block text-white rounded-lg'>{ArrayForPitchData.COMPANYDATA?.specialization}</p>
                                </div>
                            </div>
                            <div className='w-full text-left my-4 cursor-pointer border-b mx-3'>
                                <p className='text-sm text-gray-700 mx-3'>Headquarters</p>
                                <div className='w-full my-1'>
                                    <p className=' p-2 text-left font-bold'>
                                        {ArrayForPitchData.COMPANYDATA?.headquarters}</p>
                                </div>
                            </div>
                            <div className='w-full text-left my-4 cursor-pointer border-b mx-3'>
                                <p className='text-sm text-gray-700 mx-3'>Country</p>
                                <div className='w-full my-1'>
                                    {/* <MapPinIcon style={{ width: '25px', height: '25px' }} /> */}
                                    <p className=' p-2 text-left font-bold'>{ArrayForPitchData.COMPANYDATA?.city} ,{ArrayForPitchData.COMPANYDATA?.state},{ArrayForPitchData.COMPANYDATA?.country}</p>
                                </div>
                            </div>
                            <div className='w-full text-left my-4 cursor-pointer border-b mx-3'>
                                <p className='text-sm text-gray-700 mx-3'>Contacts</p>
                                <div className='w-full my-1'>
                                    <p className=' p-2 text-left font-bold'>
                                        {ArrayForPitchData.COMPANYDATA?.email}</p>
                                </div>
                            </div>
                            <div className='w-full text-left my-4 cursor-pointer border-b mx-3'>
                                <p className='text-sm text-gray-700 mx-3'>Size</p>
                                <div className='w-full my-1'>
                                    <p className=' p-2 text-left font-bold'>
                                        {ArrayForPitchData.COMPANYDATA?.size}</p>
                                </div>
                            </div>
                            <div className='w-full text-left my-4 cursor-pointer border-b mx-3'>
                                <p className='text-sm text-gray-700 mx-3'>Link</p>
                                <div className='w-full my-1'>
                                    <p className=' p-2 text-left font-bold'>
                                        {ArrayForPitchData.COMPANYDATA?.link}</p>
                                </div>
                            </div>
                            <div className='w-full text-left my-4 cursor-pointer border-b mx-3'>
                                <p className='text-sm text-gray-700 mx-3'>Stage</p>
                                <div className='w-full my-1'>
                                    <p className='p-2 text-left font-bold'>
                                        {ArrayForPitchData.COMPANYDATA?.stage}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {(contextForDashBord.USER.USERID !== ArrayForPitchData.PITCHDATA?.rid) && (
                    <div className='w-full flex flex-row border-t flex-wrap gap-4 justify-center mb-10'>
                        <Button variant='contained' color='primary'
                            style={{ padding: "10px", marginTop: "10px" }}
                            onClick={hanIntrests}
                        >
                            Interested
                        </Button>
                        <Button variant='outlined' color='primary'
                            style={{ padding: "10px", marginTop: "10px" }}
                            onClick={() => setModal(true)}
                        >
                            Counter Offer
                        </Button>
                    </div>)}
                {(contextForDashBord.USER.USERID === ArrayForPitchData.PITCHDATA?.rid) && (
                    <div className='flex flex-row p-1 gap-5 border-t justify-center'>
                        <div className='p-2'>
                            <VisibilityIcon />
                            <p className='text-lg cursor-pointer mt-2'>
                                <span className='font-bold hover:border-b mx-1'>{ArrayForPitchData.PITCHDATA?.views}</span>Views
                            </p>
                        </div>
                        <div className='p-2'>
                            <StarIcon />
                            <p className='text-lg cursor-pointer mt-2'>
                                <span className='font-bold hover:border-b mx-1'>{ArrayForPitchData.PITCHDATA?.interests}</span>Likes
                            </p>
                        </div>
                        <div className='p-2'>
                            <LocalOfferIcon />
                            <p className='text-lg cursor-pointer mt-2'>
                                <span className='font-bold hover:border-b mx-1'>{ArrayForPitchData.PITCHDATA?.counter}</span>Counters
                            </p>
                        </div>
                    </div>)}
            </div>)}
            {/* Modal For  */}
            {(contextForDashBord.USER.USERID !== ArrayForPitchData.PITCHDATA?.rid) && (
                <Modal
                    open={openmodal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className='mx-2'
                    key={0}
                >
                    <>
                        <div className='w-full bg-white p-4 rounded-xl md:w-auto max-h-[80%] min-w-[80%] overflow-auto ' style={styleForModal}>
                            <div className='p-2 text-2xl flex flex-row justify-between '>
                                <p className='my-auto p-3 rounded-md'>{`Make counter offer`}</p>
                                <div className=' mr-0 my-auto bg-gray-200 rounded-full'>
                                    <IconButton
                                        aria-label="upload picture"
                                        component="span"
                                        className="h-12 w-12 cursor-pointer bg-black border my-auto"
                                        style={{ color: 'black' }}
                                        onClick={() => setModal(false)}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </div>
                            </div>
                            <main className='p-2 w-full '>
                                <Alert variant='standard' severity="warning">
                                    <p className='text-lg font-bold'>
                                        This is a warning alert — Please only make a counter offer if you are interested , Please do not spam . Your action for making a counter offer and outcome of it will be a parameter to count organization/personal PI Ranking ,Kindly do not missuse it !
                                    </p>
                                </Alert>
                                {/*  Mian Content */}
                                {ArrayForPitchData.PITCHDATA && (
                                    <div className='w-full flex xl:flex-row flex-col my-10 justify-between  p-3 md:items-center'>
                                        {/* Wish to offer Amount  */}
                                        <div className="col-span-5 md:col-span-3">
                                            <label htmlFor="counterFund" className="block  font-medium leading-6 text-gray-900">
                                                How much amount you are willing to Invest in this product ?
                                            </label>
                                            <div className="mt-2">
                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                        <span className="font-bold sm:text-sm"  >$</span>
                                                    </div>
                                                    <input
                                                        type='number'
                                                        name="counterFund"
                                                        id="counterFund"
                                                        onChange={handleChageInValue}
                                                        defaultValue={ArrayForPitchData.PITCHDATA?.seekingFund}
                                                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        placeholder="0.00"
                                                        aria-describedby="price-currency"
                                                        aria-disabled='true'
                                                    />
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                        <span className="font-bold sm:text-sm" id="price-currency">
                                                            M
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                                    Amount You entered will be count in US Dollar <b>$</b> .
                                                </p>
                                                {ErrorMessage.counterFund !== '' &&
                                                    <p id='raisedAmount_id' className='block mx-auto text-red-600 w-full'>{ErrorMessage.counterFund}</p>}
                                            </div>
                                        </div>
                                        {/* Logos */}
                                        {ArrayForPitchData.COMPANYDATA && (
                                            <div className="min-w-[20%] p-2 h-full flex flex-row">
                                                {/* Account Profile of counter offer maker */}
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src={contextForDashBord.USER.PROFILEIMAGE}
                                                    sx={{ width: 100, height: 100 }}
                                                    className='my-5 mx-2'
                                                />
                                                {/* Arrow */}
                                                <div className='p-5'>
                                                    <CompareArrowsIcon style={{
                                                        width: '30px',
                                                        height: '30px',
                                                        marginTop: '30px'
                                                    }} />
                                                </div>
                                                {/* Account of Company */}
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src={ArrayForPitchData.COMPANYDATA.profileImage}
                                                    sx={{ width: 100, height: 100 }}
                                                    className='my-5 mx-2'
                                                />
                                            </div>)}
                                        {/* For Number Of Equity */}
                                        <div className="max-w-md">
                                            <label htmlFor="counterEquity" className="block  font-medium leading-6 text-gray-900">
                                                How much percentage of Equity you desire for this much amount ?
                                            </label>
                                            <div className="mt-2">
                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                    <input
                                                        type="number"
                                                        name="counterEquity"
                                                        id="counterEquity"
                                                        onChange={handleChageInValue}
                                                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        placeholder="0.00"
                                                        aria-describedby="price-currency"
                                                        aria-disabled='true'
                                                    />
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                        <span className="font-bold sm:text-sm" id="price-currency">
                                                            %
                                                        </span>
                                                    </div>
                                                </div>

                                                {ErrorMessage.counterEquity && <p id='raisedAmount_id' className='block mx-auto text-red-600 w-full'>{ErrorMessage.counterEquity}</p>}

                                                <Alert variant='standard' severity="info" className='mt-1'>
                                                    {`Maximun Equity ${ArrayForPitchData.COMPANYDATA?.companyname} is willing to offer is ${ArrayForPitchData.PITCHDATA.maximunOffer}%. Make sure to take it in consideration before making an offer. `}
                                                </Alert>
                                            </div>
                                        </div>
                                    </div>)}

                                <div className='flex justify-center'>
                                    <Button variant='contained'
                                        style={{ padding: '15px 15px' }}
                                        onClick={handleCounterOffers}
                                    >
                                        Make An Offer
                                    </Button>
                                </div>
                            </main>
                        </div>
                        <Backdrop
                            sx={{ color: 'blue', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={openBackDrop}
                        >
                            <div className=' flex flex-row'>
                                <CircularProgress color="inherit" />
                                <span className='mx-3 my-auto'>{'Upadting .......'}</span>
                            </div>
                        </Backdrop>
                    </>
                </Modal>)}
        </div>
    )
}
