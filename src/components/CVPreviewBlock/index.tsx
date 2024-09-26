import { ComponentProps } from 'react';
import { Box, Typography } from '@mui/material';

interface CVPreviewBlockProps extends ComponentProps<'div'> {
  title: string;
  children: JSX.Element[] | string;
}

function CVPreviewBlock({ title, children }: CVPreviewBlockProps) {
  if (children && children.length > 0) {
    return (
      <Box>
        <Typography
          component="h3"
          sx={{ fontWeight: '600', marginBottom: '4px' }}
        >
          {title}
        </Typography>
        <Typography
          sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
        >
          {children}
        </Typography>
      </Box>
    );
  }
}

export default CVPreviewBlock;
