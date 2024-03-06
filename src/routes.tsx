import { Icon } from '@chakra-ui/react';
import { MdBarChart, MdHome, MdFormatListBulletedAdd, MdOutlineShoppingCart, MdPerson, MdNotificationsActive, MdCategory } from 'react-icons/md';
import { CATEGORY, GOODS, NOTIFICATION } from 'constants/urls';
import STRINGS from 'constants/strings';
import { lazy } from 'react';
import CategoryView from 'views/admin/category/CategoryView';
import NotificationView from 'views/admin/notification/NotificationView';

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
        name: 'Profile',
        path: '/profile',
        icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
        component: Profile,
    },
    {
        name: STRINGS.GOODS,
        icon: <Icon as={MdFormatListBulletedAdd} width="20px" height="20px" color="inherit" />,
        path: GOODS,
        component: GoodsView,
    },
    {
        name: STRINGS.CATEGORIES,
        icon: <Icon as={MdCategory} width="20px" height="20px" color="inherit" />,
        path: CATEGORY,
        component: CategoryView,
    },
    {
        name: STRINGS.NOTIFICATIONS,
        icon: <Icon as={MdNotificationsActive} width="20px" height="20px" color="inherit" />,
        path: NOTIFICATION,
        component: NotificationView,
    },
];

export default routes;
