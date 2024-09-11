import { ChangeEventHandler, memo } from 'react';
import { Box } from '@mui/material';
import SearchInput from '../../UI/SearchInput';

interface TableBlockProps {
  inputValue: string;
  inputHandler: ChangeEventHandler<HTMLInputElement>;
}

function TableSearchBlock({ inputValue, inputHandler }: TableBlockProps) {
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '30px',
        position: 'sticky',
        top: '88px',
        zIndex: 1,
        backgroundColor: 'background.default',
      }}
    >
      <SearchInput value={inputValue} onChange={inputHandler} />
    </Box>
  );
}

export default memo(TableSearchBlock);
