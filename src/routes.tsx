import { Icon } from '@chakra-ui/react';
import { MdBarChart, MdHome, MdOutlineCreditCard, MdOutlineShoppingCart, MdPerson } from 'react-icons/md';
import { GOODS } from 'constants/urls';
import STRINGS from 'constants/strings';
import { lazy } from 'react';

// Admin Imports
const MainDashboard = lazy(() => import('views/admin/default'));
const NFTMarketplace = lazy(() => import('views/admin/marketplace'));
const Profile = lazy(() => import('views/admin/profile'));
const DataTables = lazy(() => import('views/admin/dataTables'));
const GoodsView = lazy(() => import('views/admin/goods/GoodsView'));

const routes = [
    {
        name: 'Main Dashboard',
        path: '/default',
        icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
        component: MainDashboard,
    },
    {
        name: 'NFT Marketplace',
        path: '/nft-marketplace',
        icon: <Icon as={MdOutlineShoppingCart} width="20px" height="20px" color="inherit" />,
        component: NFTMarketplace,
        secondary: true,
    },
    {
        name: 'Data Tables',
        icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
        path: '/data-tables',
        component: DataTables,
    },
    {
        name: STRINGS.GOODS,
        icon: <Icon as={MdOutlineCreditCard} width="20px" height="20px" color="inherit" />,
        path: GOODS,
        component: GoodsView,
    },
    {
        name: 'Profile',
        path: '/profile',
        icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
        component: Profile,
    },
];

export default routes;
