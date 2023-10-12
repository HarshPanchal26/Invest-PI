import { ReactElement, lazy } from 'react'
import type { UserRole } from "./type.router"
import ViewProducts from '../DashBord/ViewProducts'

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
const People = lazy(
    ()=> import('../DashBord/People')
)
const DashBordForPitch = lazy(
    ()=> import('../DashBord/component_Product/DashBordForPitch')
)
const ViewPitch = lazy(
    ()=> import('../DashBord/component_Product/ViewPitch')
)
const TieUps = lazy(
    ()=> import('../DashBord/TieUps')
)
const TrendingProducts = lazy(
    ()=> import('../DashBord/TrendingProducts')
)
const Profile = lazy(
    ()=>import('../Profile/Profile')
)

const SharePost = lazy(
    ()=>import('../DashBord/Component_DashBord/SharePost')
)

const MyProduct = lazy(
    ()=>import('../DashBord/MyProduct')
)

const ViewProduct = lazy(
    ()=>import('../DashBord/ViewProducts')
)

const UserConnection = lazy(
    ()=>import('../DashBord/Connections')
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
    component: <AccountType/>,
    title: 'Types of Account ',
    description: 'Choose your account preference ',
    exact : true,
    fullPageWidth : true,
    requiredRole : 'all' as UserRole
}

const profile = {
    path: '/profile/:username',
    component: <Profile/>,
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

const sharePost = {
    path :'/post',
    component: <SharePost />,
    title: 'Types of Account ',
    description: 'Choose your account preference ',
    exact : true,
    fullPageWidth : true,
    requiredRole : 'all' as UserRole
}

const network = {
    path :'/people',
    component: <People/>,
    title: 'Types of Account ',
    description: 'Choose your account preference ',
    exact : true,
    fullPageWidth : true,
    requiredRole : 'all' as UserRole
}

const trendingProducts = {
    path :'/tranding/products',
    component: <TrendingProducts/>,
    title: 'Types of Account ',
    description: 'Choose your account preference ',
    exact : true,
    fullPageWidth : true,
    requiredRole : 'all' as UserRole
}

const tieups = {
    path :'/tieups/pitches',
    component: <TieUps/>,
    title: 'Tie Ups',
    description: 'Page for Tie Ups related to your projects ',
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

const dashBordForPitch = {
    path :'/product/pitch/my',
    component: <DashBordForPitch />,
    title: 'My Pitch ',
    description: 'Page for creating yout Pitch',
    exact : true,
    fullPageWidth : true,
    requiredRole : 'all' as UserRole
}

const viewPitch = {
    path :'/product/pitch/1',
    component: < ViewPitch/>,
    title: 'My Pitch ',
    description: 'Page for creating yout Pitch',
    exact : true,
    fullPageWidth : true,
    requiredRole : 'all' as UserRole
}

const myProduct = {
    path :'/product/my',
    component: <MyProduct/>,
    title: 'Create My prdouct',
    description: 'Page for Create Your Pitch',
    exact : true,
    fullPageWidth : true,
    requiredRole : 'all' as UserRole
}
const viewProduct = {
    path :'view/product/:id',
    component: <ViewProduct/>,
    title: 'Create My prdouct',
    description: 'Page for Create Your Pitch',
    exact : true,
    fullPageWidth : true,
    requiredRole : 'all' as UserRole
}

const userConnection = {
    path :'/connection/:username',
    component: <UserConnection />,
    title: 'Connection of Users',
    description: 'Connection of Users',
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
    registration,
    
]

export const DashBordPages : IPageMeta[]=[
    dashbord, 
    network, 
    dashBordForPitch,
    viewPitch,
    impression,
    sharePost,
    userConnection,
    trendingProducts,
    myProduct,
    viewProduct  
]

export const ProfilePages : IPageMeta[]=[
    profile   
]

export const TieUpsPage  :  IPageMeta[]=[
    tieups
]





