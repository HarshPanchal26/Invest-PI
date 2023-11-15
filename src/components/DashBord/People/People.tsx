import { useState, useContext, useEffect } from "react";
import SidePannelForPeople from "./components/SidePannelForPeople";
import SuggestedPeople from "./components/SuggestedPeople";
import { Button, IconButton, Drawer } from "@mui/material";
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import ArticleIcon from '@mui/icons-material/Article';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import RecommendIcon from '@mui/icons-material/Recommend';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Link } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import { ContextForDashBord } from "../../../context/contextForDashBord";
import { CommanUserDataStotage } from '../../../utils/factory/ObjForUser'
import axios from "../../../../axios.config";

let username = null;


const navigationForSideBar = [
  { feild: 'People', href: '', icon: <PeopleAltIcon /> },
  { feild: 'Connection', href: `/connection/${username}`, icon: <SensorOccupiedIcon /> },
  { feild: 'Interested People', href: '/people/interested', icon: <RecommendIcon /> },
  { feild: 'Trending Products', href: '/tranding/products', icon: <WhatshotIcon /> },
  { feild: 'Trending People', href: '/tranding/people', icon: <WhatshotIcon /> },
  { feild: 'News', href: '', icon: <ArticleIcon /> },
]

export default function People() {
  const [openDrawer, setDrawer] = useState<boolean>(false);
  const contextForDashBord = useContext(ContextForDashBord);

  const [IndividualStore, setIndividualStore] = useState<[] | null>( null);
  const [CompnayStore, setCompnayStore] = useState<[] | null>( null);
  const [CFStore, setCFStore] = useState<[] | null>(null);

  const fetchStore = async (category: String) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}profile/users/suggestions?category=${category}`)
      console.log("Res" , res)
      if (category === 'individual') {
        setIndividualStore(res.data.newData)
      } else if (category === 'product') {
        setCompnayStore(res.data.newData)
      } else {
        setCFStore(res.data.newData)
      }

    } catch (error) {

    }
  }

  useEffect(() => {
    if (IndividualStore === null) {
      fetchStore('individual')
    }

  }, [])
  return (
    <>
      <div className="flex w-full h-full flex-row gap-2">
        <div className="w-1/4 hidden xl:block sticky top-1.5">
          <SidePannelForPeople />
        </div>
        <div className="xl:w-3/4 w-full h-full overflow-auto">
          <div className="text-left">
            <p className="text-xl p-2 text-left underline">Helphul Individual Suggestions for you.</p>
            <SuggestedPeople userData={IndividualStore} />
            <div className="w-full flex justify-center">
              <Button color='primary' className='mx-10 '>More...</Button>
            </div>
          </div>
          <div className="text-left">
            <p className="text-xl p-2 text-center">Helphul Company Suggestions for you.</p>
            <SuggestedPeople userData={CompnayStore} />
            <div className="w-full flex justify-center">
              <Button color='primary' className='mx-10 '>More...</Button>
            </div>
          </div>

          {/* Kash Infir Solution */}
          {/*  August InforTech*/}
          <div className="text-left">
            <p className="text-xl p-2 text-center">Helphul Firm Suggestions for you.</p>
            <SuggestedPeople userData={CFStore} />
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



