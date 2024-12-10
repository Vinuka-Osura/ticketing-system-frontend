import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main Page',
  },
  {
    segment: 'admin-home',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Pages',
  },
  {
    segment: 'admin-home',
    title: 'Access',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'system-config',
        title: 'System Configuration',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'event-management',
        title: 'Event Management',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'vendor-management',
        title: 'Vendor Management',
        icon: <DescriptionIcon/>,
      },
    ],
  },
];

export default NAVIGATION;
