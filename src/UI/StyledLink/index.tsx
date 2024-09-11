import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';

interface StyledLinkProps {
  path: string;
  isRed?: boolean;
  children: ReactNode;
}

function StyledLink({ path, isRed, children }: StyledLinkProps) {
  return (
    <MuiLink
      component={RouterLink}
      to={path}
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
      color={isRed ? 'primary.main' : 'text.primary'}
      underline="hover"
    >
      {children}
    </MuiLink>
  );
}

export default StyledLink;
