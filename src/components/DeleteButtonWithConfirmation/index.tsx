import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import DialogContentText from '@mui/material/DialogContentText';
import ButtonWithModal from '../ButtonWithModal';

interface DeleteButtonWithConfirmationProps {
  deletedElementName: string;
  onDelete: () => void;
}

function DeleteButtonWithConfirmation({
  deletedElementName,
  onDelete,
}: DeleteButtonWithConfirmationProps) {
  const { t } = useTranslation();

  const createCancelButton = (closeModal) => (
    <Button onClick={closeModal}>{t('cancel')}</Button>
  );

  const createConfirmButton = (closeModal) => (
    <Button
      onClick={() => {
        onDelete();
        closeModal();
      }}
      autoFocus
    >
      {t('confirm')}
    </Button>
  );

  return (
    <ButtonWithModal
      modalTitle={`${t('delete')} ${deletedElementName}`}
      createOpenButton={(onClick) => (
        <Button onClick={onClick} variant="outlined" sx={{ width: '100%' }}>
          {t('delete')}
        </Button>
      )}
      createCancelButton={createCancelButton}
      createConfirmButton={createConfirmButton}
    >
      <DialogContentText>{t('deleteConfirm')}</DialogContentText>
    </ButtonWithModal>
  );
}
export default DeleteButtonWithConfirmation;
