import React, { useContext, useState } from 'react';
import { Fragment, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ContextForDashBord } from '../../../context/contextForDashBord';
import { Avatar, IconButton } from '@mui/material';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { HomeIcon, UsersIcon, PlusIcon, CurrencyDollarIcon, LinkIcon } from '@heroicons/react/20/solid';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import DraftsIcon from '@mui/icons-material/Drafts';
import Loading from '../../../Assets/Loading';
import CloseIcon from '@mui/icons-material/Close';
import axios from '../../../../axios.config';
import { generateSchemaForSuggestion } from '../../../utils/factory/SuggestedUser';
import NotificationBar from '../../Notifications/NotificationBar';
import Badge from '@mui/material/Badge';
import { NotificationContext } from '../../../context/NotificationContext'
import Logo from '../../../Assets/logo';

const navigationForSideBar = [
  { name: 'Home', href: '/feed', icon: <HomeIcon />, current: false, inMobile: true },
  { name: 'People', href: '/people', icon: <UsersIcon />, current: false, inMobile: true },
  { name: 'Post', href: '/post', icon: <PlusIcon />, current: false, device: 'mobile' },
  { name: 'Tie-Ups', href: '/tieups/pitches', icon: <LinkIcon />, current: false, inMobile: 'mobile' },
]
const userNavigation = [
  { name: 'Your Profile', value: 'Profile', href: '#' },
  { name: 'Settings', value: 'Settings', href: '#' },
  { name: 'Sign out', value: 'Logout', href: '#' },
]

const navigationForRaiseFund = [
  { name: 'My Product', value: 'MyProduct', href: '/product/my', icon: <WidgetsOutlinedIcon /> },
  { name: 'My Pitch', value: 'Pitch', href: '/product/pitch/my', icon: <DraftsIcon /> },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}


type TypeForInvestorProfile = {
  name: string,
  type: string,
  profileImage: string,
  username: string,
  _id: string
}

export default function NavbarForDashBord() {

  const contextForDashBord = useContext(ContextForDashBord);
  const notificationContext = useContext(NotificationContext);
  const navigate = useNavigate();


  let debounceTimeOut: undefined | NodeJS.Timeout;

  const [fetchedPeople, setFetchPeople] = useState<Array<TypeForInvestorProfile>>([]);

  const [opensearchBar, setOpenSearchBar] = useState<boolean>(false);

  const handleFocusOnSerch = () => {
    document.getElementById('search-modal')?.classList.remove('hidden');
    setOpenSearchBar(true);
  }

  const handleOnBlurSerch = () => {
    document.getElementById('search-modal')?.classList.add('hidden');
    setOpenSearchBar(false);
  }

  const fetchPepole = (user: String) => {
    console.log("user", user)
    return new Promise(async (resolve, reject) => {
      try {
        const array = await axios.get(`${import.meta.env.VITE_APP_API_URL}profile/search?find=${user}`);
        console.log("array", array)
        resolve(array)
      } catch (error: any) {
        console.log("error", error)
        reject(error.message)
      }
    })
  }

  const handleChangeInSerchIndex = async (event: any) => {
    const { value } = event.target;
    if (value) {
      if (!opensearchBar) {
        document.getElementById('search-modal')?.classList.remove('hidden');
        setOpenSearchBar(true);
      }

      if (debounceTimeOut) {
        clearTimeout(debounceTimeOut);
      }
      debounceTimeOut = setTimeout(async () => {
        const array: any = await fetchPepole(value);
        const schema = generateSchemaForSuggestion(array.data.profiles);
        setFetchPeople(schema);
      }, 1000)
    } else {
      document.getElementById('search-modal')?.classList.add('hidden');
      setOpenSearchBar(false);
    }

  }


  const handleClickForAccount = (task: string) => {
    if (task === 'Logout') {
      try {
        axios.get(`${import.meta.env.VITE_APP_API_URL}logout/user`)
          .then((res) => {
            console.log("res for logout", res);
            if (res.data.logout) {
              window.location.href = '/login'
            }

          }).catch((error) => {
            alert(error.message)
          })

      } catch (error) {
        alert(`error For LogOut ${error}`)
      }
    }
    if (task === 'Profile') {
      navigate(`/profile/${contextForDashBord.USER?.USERNAME}/`)
    }
  }

  const hanldeNavigation = (username: string) => {
    document.getElementById('search-modal')?.classList.add('hidden');
    setOpenSearchBar(false);
    navigate(`/profile/${username}/`)
  }

  // useEffect(() => {
  //   console.log("Count", notificationContext?.TotalNewNotification)
  // }, [notificationContext?.TotalNewNotification])

  return (
    <>
      {/* <div className="min-h-full"> */}
      <Disclosure as="nav" className="bg-slate-200 h-auto w-full sticky -top-1 z-10 p-2">
        {({ open }) => (
          <>
            <div className=" w-full px-4 sm:px-6 lg:px-8 ">
              <div className="flex h-14 items-center justify-between flex-initial">
                {/*  Company Logo */}
                <div className="flex-shrink-0">
                 <Logo/>
                </div>

                {/*Search Bar  */}
                <div className='xl:flex my-4 md:hidden'>
                  <input
                    type='text'
                    className='p-2 xl:w-96 md:w-40 w-56 border border-black rounded-md'
                    placeholder='Search'
                    onFocus={handleFocusOnSerch}
                    onChange={handleChangeInSerchIndex}
                  ></input>
                </div>

                {/* Menu Bar for Search Party */}
                <div className="absolute top-full xl:left-2 md:left-auto left-0 mt-2 xl:w-5/6 md:w-[90%] w-full md:h-80 h-96 overflow-auto border border-gray-300 bg-white rounded-lg shadow-lg z-10 hidden" id='search-modal'>
                  <div className='p-2 text-2xl flex flex-row justify-between '>
                    <p className='my-auto text-2xl font-bold'>{`Result For you`}</p>
                    <div className=' mr-0 my-auto bg-gray-200 rounded-full'>
                      <IconButton
                        aria-label="upload picture"
                        component="span"
                        className="h-12 w-12 cursor-pointer bg-black border my-auto"
                        style={{ color: 'black' }}
                        onClick={handleOnBlurSerch}
                      >
                        <CloseIcon />
                      </IconButton>
                    </div>
                  </div>
                  <div className='flex flex-row'>
                    <div className='md:w-1/2 w-full border-r'>
                      {fetchedPeople.length > 0 && (<ul className="divide-y divide-gray-100 rounded-lg bg-white">
                        {fetchedPeople.map((item: any, index) => {
                          return (
                            <li
                              onClick={() => hanldeNavigation(item.username)}
                              key={index}
                              className="cursor-pointer">
                              <div className="flex flex-row justify-between w-full p-3">
                                <div className='flex flex-row gap-x-6'>
                                  <Avatar alt="Remy Sharp"
                                    src={item.profileImage}
                                    sx={{ width: 50, height: 50 }}
                                    className='my-2 mx-2'
                                  />
                                  <div className="min-w-0 flex-grow p-1 text-left">
                                    <p className="text-lg font-semibold leading-6 text-gray-900">{item.name}</p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">@{item.username}</p>
                                  </div>
                                </div>
                                <div className="hidden sm:flex sm:flex-col sm:items-end">
                                  <div className="mt-1 flex items-center gap-x-1.5">
                                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    </div>
                                    <p className="text-lg leading-6 text-gray-900">{item.type === 'individual' ? 'User' :
                                      item.type === 'CF' ? 'Firm' :
                                        item.type === 'product' ? 'Company' : 'User'}</p>
                                    {/* <p className="text-xs leading-5 text-gray-500">{item.type}</p> */}
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>)}
                      {fetchedPeople.length === 0 && <Loading />}
                    </div>
                    <div className='w-1/2 md:flex hidden'>
                      Tranding Pitches
                    </div>
                  </div>

                </div>

                {/* Icons  Big Screen */}
                <div className="hidden md:block ">
                  {/* xl:mx-32 */}
                  {/* Problem here give border and check  */}
                  <div className="flex items-baseline space-x-5 h-full gap-4 p-1">
                    {navigationForSideBar.map((item) => (
                      <NavLink to={item.href}>
                        <IconButton
                          aria-label="upload picture"
                          component="span"
                          className="h-10 w-10 cursor-pointer mx-2 border border-blue-800"
                          id={`like-btn`}
                          style={{ color: 'black' }}
                        >
                          {item.icon}
                        </IconButton>
                        <p className='text-gray-900 text-center text-lg xl:block hidden w-auto'>{item.name}</p>
                      </NavLink>
                    ))}
                    {contextForDashBord.USER.TYPE === 'product' && <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex max-w-xs items-center text-sm">
                          <span className="sr-only">Open user menu</span>
                          <div className='border'>
                            <IconButton
                              aria-label="upload picture"
                              component="span"
                              className="h-10 w-10 cursor-pointer mx-2"
                              id={`like-btn`}
                              style={{ color: 'black' }}
                            >
                              <CurrencyDollarIcon />
                            </IconButton>
                            <p className='text-center text-lg xl:block hidden w-auto'>{'Raise Funds'}</p>
                          </div>
                          {/* </NavLink> */}
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {navigationForRaiseFund.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link to={item.href} about='about'><div
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700 cursor-pointer text-left'
                                  )}
                                  onClick={() => handleClickForAccount(item.value)}
                                >
                                  {item.icon}<span className='ml-3'>{item.name}</span>
                                </div></Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>}
                  </div>
                </div>

                {/*  Profile And Notofication Icon*/}
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">

                    {/* Menu For Nitificaton */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex max-w-xs items-center text-sm">
                          <span className="sr-only">Open Notificaton Menu</span>
                          <div className='border'>
                            <button
                              type="button"
                              className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                              <span className="sr-only">View notifications</span>
                              <Badge badgeContent={notificationContext?.TotalNewNotification} color="primary">
                                <BellIcon className="h-6 w-6" aria-hidden="true" />
                              </Badge>
                            </button>
                          </div>
                          {/* </NavLink> */}
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="
                        h-[600px] absolute right-0 z-10 mt-2 w-[500px] origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-auto">

                          <NotificationBar />

                        </Menu.Items>

                      </Transition>
                    </Menu>

                    {/* Menu for Profile  */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          {/* <img className="h-10 w-10 rounded-full" src={contextForDashBord.USER.PROFILEIMAGE} alt="Profile" /> */}
                          <Avatar
                            alt="Remy Sharp"
                            src={contextForDashBord.USER.PROFILEIMAGE}
                            sx={{ width: 45, height: 45 }}
                            className="rounded-full border-4 border-white shadow-lg"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <div
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                  )}
                                  onClick={() => handleClickForAccount(item.value)}
                                >
                                  {item.name}
                                </div>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>

                {/*  Mobile Screen */}
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            {/* All Items for Mobile Screen */}
            <Disclosure.Panel className="md:hidden block">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigationForSideBar.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <IconButton
                      aria-label="upload picture"
                      component="span"
                      className="h-10 w-10 cursor-pointer mx-2 border border-blue-800"
                      id={`like-btn`}
                      style={{ color: 'black' }}
                    >
                      {item.icon}
                    </IconButton>
                    <span className='mx-2 text-black'>{item.name}</span>
                  </Link>
                ))}
                {/* Raise Fund is only visible when you have a  account for users */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex max-w-xs items-center text-sm">
                      <div className='border'>
                        <IconButton
                          aria-label="upload picture"
                          component="span"
                          className="h-10 w-10 cursor-pointer mx-2"
                          id={`like-btn`}
                          style={{ color: 'black' }}
                        >
                          <CurrencyDollarIcon />
                        </IconButton>
                        <span className='mx-2 text-black'>{'Raise Funds'}</span>
                      </div>
                      {/* </NavLink> */}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {navigationForRaiseFund.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link to={item.href} about='about'><div
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700 cursor-pointer text-left'
                              )}
                              onClick={() => handleClickForAccount(item.value)}
                            >
                              {item.icon}<span className='ml-3'>{item.name}</span>
                            </div></Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
                {/*  */}
              </div>
              {/*   */}
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <Avatar
                      alt="Remy Sharp"
                      src={contextForDashBord.USER.PROFILEIMAGE}
                      sx={{ width: 42, height: 42 }}
                      className="rounded-full border-4 border-white shadow-lg"
                    />
                  </div>
                  <div className="ml-3">
                    {/* <div className="text-base font-medium leading-none text-white">{user.name}</div>
                    <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div> */}
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      onClick={() => handleClickForAccount(item.value)}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </  Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  )
}
