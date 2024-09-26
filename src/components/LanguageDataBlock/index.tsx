import { Box, Typography } from '@mui/material';

enum LanguageProficiencyColors {
  'A1' = '#0000ff',
  'A2' = '#0000ff',
  'B1' = '#008000',
  'B2' = '#008000',
  'C1' = '#8d098d',
  'C2' = '#8d098d',
  'Native' = '#ce2000',
}

interface LanguageDataBlockProps {
  name: string;
  proficiency: string;
}

function LanguageDataBlock({ name, proficiency }: LanguageDataBlockProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        maxWidth: '200px',
        width: '100%',
        padding: '10px',
      }}
    >
      <Typography
        sx={{ flex: 1, color: LanguageProficiencyColors[proficiency] }}
      >
        {proficiency}
      </Typography>
      <Typography sx={{ flex: 1 }}>{name}</Typography>
    </Box>
  );
}

export default LanguageDataBlock;
