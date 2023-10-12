import { useState , useContext } from "react";
import SidePannelForPeople from "./Component_DashBord/SidePannelForPeople";
import SuggestedPeople from "./Component_DashBord/SuggestedPeople";
import { Button, IconButton, Drawer } from "@mui/material";
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import ArticleIcon from '@mui/icons-material/Article';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import RecommendIcon from '@mui/icons-material/Recommend';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Link } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import { ContextForDashBord } from "../../context/contextForDashBord";

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
  return (
    <>
      {/* <div className='w-full text-right block xl:hidden'>
        <IconButton
          aria-label="upload picture"
          component="span"
          className="h-12 w-12 my-2 cursor-pointer bg-black mx-10"
          style={{ color: 'black' }}
          onClick={() => setDrawer(true)}
        >
          <ViewSidebarIcon />
        </IconButton>
      </div> */}
      <div className="flex w-full h-full flex-row gap-2">
        <div className="w-1/4 hidden xl:block sticky top-1.5">
          <SidePannelForPeople />
        </div>
        <div className="xl:w-3/4 w-full h-full overflow-auto">   
          <div className="text-left">
            <p className="text-xl p-2 text-center">Helphul Firm Suggestions for you.</p>
            <SuggestedPeople />
            <div className="w-full flex justify-center">
              <Button color='primary' className='mx-10 '>More...</Button>
            </div>
          </div>
          <div className="text-left">
            <p className="text-xl p-2 text-center">Helphul Firm Suggestions for you.</p>
            <SuggestedPeople />
            <div className="w-full flex justify-center">
              <Button color='primary' className='mx-10 '>More...</Button>
            </div>
          </div>
          <div className="text-left">
            <p className="text-xl p-2 text-center">Helphul Firm Suggestions for you.</p>
            <SuggestedPeople />
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



