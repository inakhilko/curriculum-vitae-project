import { useState } from 'react';
import DrawerButton from '../../UI/DrawerButton';
import {
  Box,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { drawerBottomLinks, drawerTopLinks } from './variables.tsx';

function HeaderDrawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const { t } = useTranslation();

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {drawerTopLinks.map(({ name, icon }) => (
          <Link to={`/${name}`} key={name}>
            <ListItem disablePadding>
              <ListItemButton sx={{ color: 'text.primary' }}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={t(name)} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {drawerBottomLinks.map(({ name, icon }) => (
          <Link to={`/${name}`} key={name}>
            <ListItem disablePadding>
              <ListItemButton sx={{ color: 'text.primary' }}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={t(name)} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <DrawerButton onClick={toggleDrawer(true)}></DrawerButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
}

export default HeaderDrawer;
