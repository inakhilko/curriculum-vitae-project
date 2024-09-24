import {
  Box,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from '@mui/material';

interface SkillRangeProps extends LinearProgressProps {
  value: number;
  skill: string;
}

function SkillRange(props: SkillRangeProps) {
  const { skill, ...otherProps } = props;
  return (
    <>
      <Box sx={{ width: '70px', mr: 1 }}>
        <LinearProgress
          variant="determinate"
          color="inherit"
          sx={{ borderRadius: '12px' }}
          {...otherProps}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {skill}
        </Typography>
      </Box>
    </>
  );
}

export default SkillRange;
