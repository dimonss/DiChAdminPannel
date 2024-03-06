import { Icon } from '@chakra-ui/react';
import { MdBarChart, MdHome, MdOutlineCreditCard, MdOutlineShoppingCart, MdPerson } from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
import NFTMarketplace from 'views/admin/marketplace';
import Profile from 'views/admin/profile';
import DataTables from 'views/admin/dataTables';

// Auth Imports
import STRINGS from 'constants/strings';
import GoodsView from 'views/admin/goods/GoodsView';
import { GOODS } from 'constants/urls';

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
