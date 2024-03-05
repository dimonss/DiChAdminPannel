import { Icon } from '@chakra-ui/react';
import { MdBarChart, MdHome, MdLock, MdOutlineCreditCard, MdOutlineShoppingCart, MdPerson } from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
import NFTMarketplace from 'views/admin/marketplace';
import Profile from 'views/admin/profile';
import DataTables from 'views/admin/dataTables';

// Auth Imports
import SignInCentered from 'views/auth/signIn';
import STRINGS from 'constants/strings';
import GoodsView from 'views/admin/goods/GoodsView';
import { ADMIN, GOODS_RAW } from 'constants/urls';

const routes = [
    {
        name: 'Main Dashboard',
        layout: ADMIN,
        path: '/default',
        icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
        component: MainDashboard,
    },
    {
        name: 'NFT Marketplace',
        layout: ADMIN,
        path: '/nft-marketplace',
        icon: <Icon as={MdOutlineShoppingCart} width="20px" height="20px" color="inherit" />,
        component: NFTMarketplace,
        secondary: true,
    },
    {
        name: 'Data Tables',
        layout: ADMIN,
        icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
        path: '/data-tables',
        component: DataTables,
    },
    {
        name: STRINGS.GOODS,
        layout: ADMIN,
        icon: <Icon as={MdOutlineCreditCard} width="20px" height="20px" color="inherit" />,
        path: GOODS_RAW,
        component: GoodsView,
    },
    {
        name: 'Profile',
        layout: ADMIN,
        path: '/profile',
        icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
        component: Profile,
    },
    {
        name: 'Sign In',
        layout: '/auth',
        path: '/',
        icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
        component: SignInCentered,
    },
];

export default routes;
