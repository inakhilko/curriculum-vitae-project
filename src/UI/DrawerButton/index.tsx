import { MouseEventHandler } from 'react';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function DrawerButton({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <IconButton aria-label="menu" onClick={onClick}>
      <MenuIcon />
    </IconButton>
  );
}

export default DrawerButton;
