import DashboardIcon from '@mui/icons-material/Dashboard';
import DiscountIcon from '@mui/icons-material/Discount';
import LocalMall from '@mui/icons-material/LocalMall';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import TableChartIcon from '@mui/icons-material/TableChart';

export const sidebarMenu = [
  {
    title: 'Main',
    items: [
      { name: 'Dashboard', icon: DashboardIcon, path: '/' },
    ],
  },
  {
    title: 'Lists',
    items: [
      { name: 'Admins', icon: PersonIcon, path: '/admin' },
      { name: 'Flash sale', icon: DiscountIcon, path: '/sale' },
      { name: 'Products', icon: TableChartIcon, path: '/products' },
      { name: 'Orders', icon: LocalMall, path: '/orders' },
    ],
  },
  {
    title: 'Settings',
    items: [
      { name: 'Log Out', icon: LogoutIcon },
    ],
  },
];
