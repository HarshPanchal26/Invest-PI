import {  ImgHTMLAttributes, ReactElement, lazy } from 'react'
import type { UserRole } from "./type.router"
// import type { CSSObject } from '@styled-system/css'

export interface IPageMeta {
    path: string
    component: ReactElement
    title: string
    description: string
    exact: boolean
    fullPageWidth?: boolean
    requiredRole: UserRole
    // customStyles?: CSSObject
  }

const IntroPage = lazy(
    () => import('../IntroPage/IntroPage')
)

const SignInChoice = lazy(
    ()=> import('../Authentication/AccountType')
)

const LogInPage = lazy(
    ()=> import('../Authentication/LogInPage')
)

const AccountType = lazy(
    ()=> import('../Authentication/AccountType')
)

const Registration = lazy(
    () => import('../Authentication/SignInPage')
)
const FeedPage = lazy(
    ()=> import('../DashBord/Feed')
)
const Impression = lazy(
    ()=> import('../DashBord/Impression')
)
const Network = lazy(
    ()=> import('../DashBord/Network')
)
const RaiseFund = lazy(
    ()=> import('../DashBord/RaiseFund')
)
const TieUps = lazy(
    ()=> import('../DashBord/TieUps')
)




const introPage  = {
    path: '/',
    component: <IntroPage />,
    title: 'Introduction ',
    description: 'Welcome ',
    exact : true,
    fullPageWidth : true,
    requiredRole : 'all' as UserRole
}

const logInPage = {
    path: '/login',
    component: <LogInPage />,
    title: 'Log In ',
    description: 'Log In ',
    exact : true,
    fullPageWidth : true,
    requiredRole : 'all' as UserRole
}


const accountType = {
    path: '/signin/type',
    component: <AccountType />,
    title: 'Types of Account ',
    description: 'Choose your account preference ',
    exact : true,
    fullPageWidth : true,
    requiredRole : 'all' as UserRole
}

const userType = {
    path: '/signin/user',
    component: <AccountType />,
    title: 'Types of Account ',
    description: 'Choose your account preference ',
    exact : true,
    fullPageWidth : true,
    requiredRole : 'all' as UserRole
}

const dashbord = {
    path :'/feed',
    component: <FeedPage />,
    title: 'Types of Account ',
    description: 'Choose your account preference ',
    exact : true,
    fullPageWidth : true,
    requiredRole : 'all' as UserRole
}

const network = {
    path :'/network',
    component: <Network/>,
    title: 'Types of Account ',
    description: 'Choose your account preference ',
    exact : true,
    fullPageWidth : true,
    requiredRole : 'all' as UserRole
}

const tieups = {
    path :'/tieups',
    component: <TieUps/>,
    title: 'Types of Account ',
    description: 'Choose your account preference ',
    exact : true,
    fullPageWidth : true,
    requiredRole : 'all' as UserRole
}
const impression = {
    path :'/impression',
    component: <Impression />,
    title: 'Types of Account ',
    description: 'Choose your account preference ',
    exact : true,
    fullPageWidth : true,
    requiredRole : 'all' as UserRole
}
const raisefund = {
    path :'/raisefund',
    component: <RaiseFund />,
    title: 'Types of Account ',
    description: 'Choose your account preference ',
    exact : true,
    fullPageWidth : true,
    requiredRole : 'all' as UserRole
}

const registration = {
    path :'/registration',
    component: <Registration />,
    title: 'Registartion ',
    description: 'Sign Up for new user ',
    exact : true,
    fullPageWidth : true,
    requiredRole : 'all' as UserRole
}

export const IntroPages : IPageMeta[] = [
    introPage ,
    logInPage,
    accountType,
    userType,
    registration   
]

export const DashBordPages : IPageMeta[]=[
    dashbord, 
    network,
    raisefund,
    impression,
    tieups    
]





