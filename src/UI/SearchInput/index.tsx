import {
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps,
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';

function SearchInput(props: OutlinedInputProps) {
  const { onChange, value, type, size, startAdornment, ...otherProps } = props;

  const { t } = useTranslation();

  return (
    <OutlinedInput
      type="text"
      onChange={onChange}
      value={value}
      size="small"
      placeholder={t('search')}
      startAdornment={
        <InputAdornment position="end" sx={{ mr: 1 }}>
          <SearchOutlinedIcon />
        </InputAdornment>
      }
      {...otherProps}
    />
  );
}

export default memo(SearchInput);
