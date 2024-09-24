import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';

function NoDataBlock() {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '40px',
      }}
    >
      <Typography sx={{ fontSize: '1.125rem', fontWeight: '600' }}>
        {t('nothingFound')}
      </Typography>
    </Box>
  );
}

export default NoDataBlock;
