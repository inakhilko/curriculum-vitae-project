import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ButtonWithModalForm from '../ButtonWithModalForm';

interface AddAndDeleteBlockProps<T> {
  isDeletionProcess: boolean;
  setIsDeletionProcess: Dispatch<SetStateAction<boolean>>;
  transformToMutationData: (formData: T) => any;
  addedWord: string;
  submitMutation: any;
  defaultFormValues: T;
  formFields: any;
  isNoToDelete: boolean;
}

function AddAndDeleteBlock<T>({
  isDeletionProcess,
  setIsDeletionProcess,
  transformToMutationData,
  addedWord,
  submitMutation,
  defaultFormValues,
  formFields,
  isNoToDelete,
}: AddAndDeleteBlockProps<T>) {
  const { t } = useTranslation();

  const onDeleteButtonClick = () => {
    setIsDeletionProcess((prevState) => !prevState);
  };
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      <ButtonWithModalForm<T>
        createOpenButton={(onClick) => {
          return (
            <Button
              variant="text"
              onClick={onClick}
              disabled={isDeletionProcess}
              sx={{ gap: '5px' }}
            >
              <AddOutlinedIcon />
              {`${t('add')} ${addedWord}`}
            </Button>
          );
        }}
        modalTitle={`${t('add')} ${addedWord}`}
        submitMutation={submitMutation}
        transformToMutationData={transformToMutationData}
        formFields={formFields}
        isUpdate={true}
        defaultFormValues={defaultFormValues}
      />
      {isNoToDelete && (
        <Button
          variant={isDeletionProcess ? 'contained' : 'text'}
          onClick={onDeleteButtonClick}
          sx={{ color: isDeletionProcess ? '' : 'inherit', gap: '5px' }}
        >
          <DeleteOutlineOutlinedIcon />
          {isDeletionProcess ? `${t('cancel')}` : `${t('delete')} ${addedWord}`}
        </Button>
      )}
    </Box>
  );
}

export default AddAndDeleteBlock;
