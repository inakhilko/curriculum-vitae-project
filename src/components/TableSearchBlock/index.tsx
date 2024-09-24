import { ChangeEventHandler, memo, ReactNode } from 'react';
import { Box, BoxProps, TableProps } from '@mui/material';
import SearchInput from '../../UI/SearchInput';
import { useParams } from 'react-router-dom';

interface TableBlockProps extends BoxProps {
  inputValue: string;
  inputHandler: ChangeEventHandler<HTMLInputElement>;
  addButton?: ReactNode;
  blockTop: string;
}

function TableSearchBlock({
  inputValue,
  inputHandler,
  addButton,
  blockTop,
}: TableBlockProps) {
  const { userId } = useParams();
  const isMyProfile = userId === localStorage.getItem('cvp_user_id');
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '30px',
        position: 'sticky',
        top: blockTop ? blockTop : '96px',
        zIndex: 1,
        backgroundColor: 'background.default',
      }}
    >
      <SearchInput value={inputValue} onChange={inputHandler} />
      {isMyProfile && addButton}
    </Box>
  );
}

export default memo(TableSearchBlock);
