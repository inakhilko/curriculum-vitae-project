import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import DomainIcon from '@mui/icons-material/Domain';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TranslateIcon from '@mui/icons-material/Translate';

export const drawerTopLinks = [
  {
    name: 'employees',
    icon: <PeopleAltIcon />,
  },
  {
    name: 'projects',
    icon: <FolderCopyOutlinedIcon />,
  },
  {
    name: 'cvs',
    icon: <ContactPageOutlinedIcon />,
  },
];

export const drawerBottomLinks = [
  {
    name: 'departments',
    icon: <DomainIcon />,
  },
  {
    name: 'positions',
    icon: <WorkOutlineIcon />,
  },
  {
    name: 'skills',
    icon: <TrendingUpIcon />,
  },
  {
    name: 'languages',
    icon: <TranslateIcon />,
  },
];
