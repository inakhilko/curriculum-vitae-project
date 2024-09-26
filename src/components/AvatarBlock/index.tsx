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
  useMediaQuery,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { isAuthenticatedVar } from '../../apollo/reactiveVars.ts';
import { PROFILE } from '../../apollo/queries/user.ts';
import './AvatarBlock.styles.scss';
import { useTranslation } from 'react-i18next';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const { useNavigate } = ReactRouter;

function AvatarBlock() {
  const { data, onCompleted } = useQuery(PROFILE, {
    variables: { userId: localStorage.getItem('cvp_user_id') },
  });

  const isMobile = useMediaQuery('(max-width: 600px)');

  const navigate = useNavigate();

  const { t } = useTranslation();

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
    navigate(`/users/${localStorage.getItem('cvp_user_id')}/profile`, {
      replace: true,
    });
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
          {data?.profile.full_name ?? t('user')}
        </Typography>
        <Avatar src={data?.profile.avatar} />
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
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('profile')}</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={onProfileClick}
          sx={{
            display: !isMobile ? 'none' : 'default',
          }}
        >
          <ListItemIcon>
            <SettingsOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('settings')}</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={onLogoutClick}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('logout')}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

export default AvatarBlock;
