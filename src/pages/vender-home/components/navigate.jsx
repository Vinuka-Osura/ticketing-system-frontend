import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main Page',
  },
  {
    segment: 'vendor-home',
    title: 'Vendor Dashboard',
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
    segment: 'vendor-home',
    title: 'Functions',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'event-ticket-management',
        title: 'Event Tickets',
        icon: <DescriptionIcon />, 
      },
      {
        segment: 'event-overview',
        title: 'Event Overview',
        icon: <DescriptionIcon />,
      }
    ],
  },
];

export default NAVIGATION;
