import { useState } from 'react';
import DrawerButton from '../../UI/DrawerButton';
import {
  Box,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  // ListItemText,
} from '@mui/material';

function HeaderDrawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Сотрудники', 'Проекты', 'Резюме'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              {text}
              {/*<ListItemIcon>*/}
              {/*{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}*/}
              {/*</ListItemIcon>*/}
              {/*<ListItemText primary={text} />*/}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              {text}
              {/*<ListItemIcon>*/}
              {/*{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}*/}
              {/*</ListItemIcon>*/}
              {/*<ListItemText primary={text} />*/}
            </ListItemButton>
          </ListItem>
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
