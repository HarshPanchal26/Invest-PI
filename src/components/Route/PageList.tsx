import { ReactElement, lazy } from 'react'
import type { UserRole } from "./type.router"

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
    ()=> import('../DashBord/Home/Feed')
)
// const Impression = lazy(
//     ()=> import('../DashBord/Impression')
// )
const People = lazy(
    ()=> import('../DashBord/People/People')
)
const DashBordForPitch = lazy(
    ()=> import('../DashBord/RaiseFund/DashBordForPitch')
)
const ViewPitchPage = lazy(
    ()=> import('../DashBord/RaiseFund/pitch_componnets/ViewPitch')
)
const TieUps = lazy(
    ()=> import('../DashBord/TieUps/DashBordForTieUps')
)
const TrendingProducts = lazy(
    ()=> import('../DashBord/TrendingProducts')
)
const Profile = lazy(
    ()=>import('../Profile/Profile')
)

const SharePost = lazy(
    ()=>import('../DashBord/Home/components/SharePost')
)

const MyProduct = lazy(
    ()=>import('../DashBord/RaiseFund/MyProduct')
)

const MyInvestments = lazy(
    ()=>import('../DashBord/TieUps/components/MyInvestments')
)
const InvestmentsRequests = lazy(
    ()=>import('../DashBord/TieUps/components/InvestmentsRequests')
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
    // path: `/profile/:${encodeURIComponent('username')}`,
    path: `/profile/:username/`,
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

const myInvestments = {
    path :'/tieups/myinvestments',
    component: <MyInvestments />,
    title: 'Types of Account ',
    description: 'Choose your account preference ',
    exact : true,
    fullPageWidth : true,
    requiredRole : 'all' as UserRole

}
const investmentsRequests = {
    path :'/tieups/requests',
    component: <InvestmentsRequests />,
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
    path :'/pitch/:id',
    component: <ViewPitchPage CompanyData={null} PitchData={null} ProductData={null}/>,
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
// const viewProduct = {
//     path :'view/product/:id',
//     component: <ViewProduct/>,
//     title: 'Create My prdouct',
//     description: 'Page for Create Your Pitch',
//     exact : true,
//     fullPageWidth : true,
//     requiredRole : 'all' as UserRole
// }

const userConnection = {
    path :`/connection/:username`,
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
    // impression,
    sharePost,
    userConnection,
    trendingProducts,
    myProduct,
    // viewProduct  
]

export const ProfilePages : IPageMeta[]=[
    profile   
]

export const TieUpsPage  :  IPageMeta[]=[
    tieups,
    myInvestments,
    investmentsRequests
]





