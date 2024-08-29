import { useState, MouseEvent } from 'react';
import * as ReactRouter from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  Avatar,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { isAuthenticatedVar } from '../../apollo/reactiveVars.ts';
import { PROFILE } from '../../apollo/queries/user.ts';
import './AvatarBlock.styles.scss';

const { useNavigate } = ReactRouter;

function AvatarBlock() {
  const { data } = useQuery(PROFILE, {
    variables: { userId: localStorage.getItem('cvp_user_id') },
  });

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogoutClick = () => {
    handleClose();
    localStorage.removeItem('cvp_access_token');
    localStorage.removeItem('cvp_refresh_token');
    localStorage.removeItem('cvp_user_id');
    isAuthenticatedVar(false);
    navigate('/', { replace: true });
  };

  const onProfileClick = () => {
    handleClose();
    navigate('/profile', { replace: true });
  };

  return (
    <>
      <Button
        className="avatar-block"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{ color: 'text.primary' }}
        onClick={handleClick}
      >
        <Typography sx={{ textTransform: 'capitalize' }}>
          {data?.profile.full_name ?? 'User'}
        </Typography>
        {data?.profile.avatar ? (
          <Avatar src={data.profile.avatar} />
        ) : (
          <AccountCircleIcon fillOpacity={0.54} />
        )}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={onProfileClick}>
          <ListItemIcon>
            <AccountCircleIcon
              fontSize="small"
              sx={{ color: 'text.primary' }}
            />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={onLogoutClick}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" sx={{ color: 'text.primary' }} />
          </ListItemIcon>
          <ListItemText>Log out</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

export default AvatarBlock;
