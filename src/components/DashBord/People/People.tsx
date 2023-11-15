import { useState, useContext, useEffect } from "react";
import SidePannelForPeople from "./components/SidePannelForPeople";
import SuggestedPeople from "./components/SuggestedPeople";
import { Button, IconButton, Drawer } from "@mui/material";
import ArticleIcon from '@mui/icons-material/Article';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import RecommendIcon from '@mui/icons-material/Recommend';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Link } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import { ContextForDashBord } from "../../../context/contextForDashBord";
import axios from "../../../../axios.config";
import { CF, INDIVIDUAL, PRODUCT } from '../../Route/type.router'
import Skeleton from '@mui/material/Skeleton';

let username = null;


const navigationForSideBar = [
  { feild: 'People', href: '', icon: <PeopleAltIcon /> },
  { feild: 'Connection', href: `/connection/${username}`, icon: <SensorOccupiedIcon /> },
  { feild: 'Interested People', href: '/people/interested', icon: <RecommendIcon /> },
  { feild: 'Trending Products', href: '/tranding/products', icon: <WhatshotIcon /> },
  { feild: 'Trending People', href: '/tranding/people', icon: <WhatshotIcon /> },
  { feild: 'News', href: '', icon: <ArticleIcon /> },
]


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

export default function People() {
  const [openDrawer, setDrawer] = useState<boolean>(false);
  const contextForDashBord = useContext(ContextForDashBord);

  const [IndividualStore, setIndividualStore] = useState<[] | null>(null);
  const [CompnayStore, setCompnayStore] = useState<[] | null>(null);
  const [CFStore, setCFStore] = useState<[] | null>(null);

  const fetchStore = async () => {
    try {
      const resForIndi = await axios.get(`${import.meta.env.VITE_APP_API_URL}profile/users/suggestions?category=${INDIVIDUAL}`)
      setIndividualStore(resForIndi.data.newData)
      const resForCF = await axios.get(`${import.meta.env.VITE_APP_API_URL}profile/users/suggestions?category=${CF}`)
      setCFStore(resForCF.data.newData)
      const resForProduct = await axios.get(`${import.meta.env.VITE_APP_API_URL}profile/users/suggestions?category=${PRODUCT}`)
      setCompnayStore(resForProduct.data.newData)
    } catch (error) {
      console.log("Erro is", error)
    }
  }

  useEffect(() => {
    if (IndividualStore === null) {
      fetchStore()
    }
  }, [])

  return (
    <>
      <div className="flex w-full h-full flex-row gap-5">
        <div className="w-1/4 hidden xl:block sticky top-1.5">
          <SidePannelForPeople />
        </div>
        <div className="xl:w-3/4 w-full h-full overflow-auto">
          <div className="text-left">
            <p className="text-xl p-2 text-left underline text-blue-700">Helphul Individual Suggestions for you.</p>
            <div className="p-4 xl:mx-3">
              {IndividualStore !== null && <SuggestedPeople userData={IndividualStore} />}
              {IndividualStore == null && <SkeletonForSuggestions />}
            </div>
            <div className="w-full flex justify-center">
              <Button color='primary' className='mx-10 '>More...</Button>
            </div>
          </div>
          <div className="text-left">
            <p className="text-xl p-2 text-left underline text-blue-700">Helphul Company Suggestions for you.</p>
            <div className="p-4 xl:mx-3">
              {CompnayStore !== null && <SuggestedPeople userData={CompnayStore} />}
              {CompnayStore == null && <SkeletonForSuggestions />}
            </div>

            <div className="w-full flex justify-center">
              <Button color='primary' className='mx-10 '>More...</Button>
            </div>
          </div>
          <div className="text-left">
            <p className="text-xl p-2 text-left underline text-blue-700">Helphul Firm Suggestions for you.</p>
            <div className="p-4 xl:mx-3">
              {CFStore !== null && <SuggestedPeople userData={CFStore} />}
              {CFStore == null && <SkeletonForSuggestions />}
            </div>
            <div className="w-full flex justify-center">
              <Button color='primary' className='mx-10 '>More...</Button>
            </div>
          </div>
        </div>
      </div>
      <Drawer
        open={openDrawer}
        anchor="right"
        sx={{ top: '10px' }}
      >

        <ul className="px-2 pb-3 pt-2 sm:px-3 w-full">
          <li>
            <div className=' mr-0 my-auto bg-gray-200 rounded-full'>
              <IconButton
                aria-label="upload picture"
                component="span"
                className="h-12 w-12 cursor-pointer bg-black border my-auto"
                style={{ color: 'black' }}
                onClick={() => setDrawer(false)}
              >
                <CloseIcon />
              </IconButton>
            </div></li>
          {navigationForSideBar.map((item, index) => (
            <Link
              to={item.feild === 'Connection' ? `/connection/${contextForDashBord.USER.USERNAME}` : item.href}
              about={item.feild}><li className={`p-4 cursor-pointer text-left w-60`}
                key={index}>
                <span className='mx-2'>{item.icon}</span>
                {item.feild}
              </li></Link>
          ))}
        </ul>
      </Drawer>
    </>
  );
};



