import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main Page',
  },
  {
    segment: 'customer-home',
    title: 'Customer Dashboard',
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
    segment: 'customer-home',
    title: 'Functions',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'event-browsing',
        title: 'Event Browsing',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'ticket-management',
        title: 'Buy tickets',
        icon: <DescriptionIcon />,
      },
    ],
  },
];

export default NAVIGATION;
