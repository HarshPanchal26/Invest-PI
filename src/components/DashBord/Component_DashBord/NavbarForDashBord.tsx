import React, { useContext } from 'react';
import { DocumentMagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Fragment, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import axios from 'axios';
import { ContextForDashBord } from '../../../context/contextForDashBord';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const navigation = [
  { name: 'Dashboard', href: '#', current: false },
  { name: 'Team', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', value: 'Profile', href: '#' },
  { name: 'Settings', value: 'Settings', href: '#' },
  { name: 'Sign out', value: 'Logout', href: '#' },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function NavbarForDashBord() {

  // const location = useLocation();

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
      <Disclosure as="nav" className="bg-white h-auto w-full sticky -top-1 z-10 border-b">
        {({ open }) => (
          <>
            <div className=" w-full px-4 sm:px-6 lg:px-8 ">
              <div className="flex h-14 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 md:hidden block">
                    <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-900 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>

                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <div className='mx-20 flex flex-row'>
                      <input type='text' className='p-2 w-96  border border-black rounded-md' placeholder='Search'></input>
                      <div className='mx-1 '>
                        <DocumentMagnifyingGlassIcon className='h-11 w-11 ' />
                      </div>
                    </div>
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
                                    'block px-4 py-2 text-sm text-gray-700'
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
                {navigation.map((item) => (
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