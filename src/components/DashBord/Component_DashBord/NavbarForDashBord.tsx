import React, { useContext } from 'react';
import { Fragment, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import axios from 'axios';
import { ContextForDashBord } from '../../../context/contextForDashBord';
import { Avatar, IconButton } from '@mui/material';
import { useNavigate, NavLink , Link } from 'react-router-dom';
import { HomeIcon, UsersIcon,  PlusIcon, CurrencyDollarIcon , LinkIcon} from '@heroicons/react/20/solid';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import DraftsIcon from '@mui/icons-material/Drafts';

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
  { name: 'My Product', value: 'MyProduct', href: '/product/my' , icon :<WidgetsOutlinedIcon/>},
  { name: 'My Pitch', value: 'Pitch', href: '/product/pitch/my' , icon :<DraftsIcon/>},
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function NavbarForDashBord() {

  const contextForDashBord = useContext(ContextForDashBord);
  const navigate = useNavigate();

  const handleClickForAccount = (task: string) => {
    if (task === 'Logout') {
      try {
        axios.get('/logout/user')
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
      navigate(`/profile/${contextForDashBord.USER?.USERNAME}`)
    }
  }

  useEffect(() => {
  }, [])
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
                  <img
                    className="h-8 w-8"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>

                {/*Search Bar  */}
                <div className='hidden md:flex mx-5 '>
                  <input type='text' className='p-2 xl:w-96 w-40 border border-black rounded-md' placeholder='Search'></input>
                  {/* <div className='mx-1 '>
                        <DocumentMagnifyingGlassIcon className='h-11 w-11 ' />
                    </div> */}
                </div>

                {/* Icons */}
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
                    <Menu as="div" className="relative ml-3">
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
                    </Menu>


                  </div>
                </div>

                {/*  Additional Icons*/}
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">

                    <button
                      type="button"
                      className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
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

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigationForSideBar.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
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



/**
 *      Individual                 Firm                   Products          (Including signin details)
 * 
 *      Post Id                   Post Id                   Post Id 
 *      Follower                  Follower                  Follower 
 *      Following                 Following                 Following 
 *      CoverID                   CoverID                   CoverID 
 *      Profile Photo             Profile Photo             Profile Photo
 *      Investment                Investment                Investment
 *      Tie-ups                   Tie-ups                   Tie-ups
 *      bach                      bach                      bach  
 *      
 */