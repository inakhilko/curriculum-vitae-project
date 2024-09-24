import { MouseEventHandler, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { DocumentNode, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { USER } from '../../apollo/queries/queries.ts';
import { PROFILE } from '../../apollo/queries/user.ts';
import { FormFieldDataType } from '../../types/formsTypes.ts';
import './ButtonWithModalForm.styles.scss';

const DialogWithPadding = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-container': {
    margin: 0,
  },
  '& .MuiPaper-root': {
    padding: '24px',
    gap: '12px',
    width: '100%',
  },
  '& .MuiDialogContent-root': {
    padding: '6px',
  },
  '& .MuiDialogActions-root': {
    padding: 0,
  },
  '& .MuiTypography-root': {
    padding: 0,
  },
}));

interface ButtonWithModalFormProps<FormValues, MutationValue> {
  defaultFormValues: FormValues;
  formFields: FormFieldDataType[];
  modalTitle: string;
  submitMutation: DocumentNode;
  createOpenButton: (
    onClick: MouseEventHandler<HTMLButtonElement>
  ) => JSX.Element;
  transformToMutationData: (formData: FormValues) => MutationValue;
  isUpdate?: boolean;
}

function ButtonWithModalForm<FormValues, MutationValue>({
  defaultFormValues,
  formFields,
  modalTitle,
  submitMutation,
  createOpenButton,
  transformToMutationData,
  isUpdate,
  readOnlyFields,
}: ButtonWithModalFormProps<FormValues, MutationValue>) {
  const [mutation] = useMutation(submitMutation);
  const { userId } = useParams();

  const methods = useForm({
    defaultValues: defaultFormValues,
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseWithReset = () => {
    setOpen(false);
    methods.reset();
  };

  const { t } = useTranslation();

  const onSubmit = (formData) => {
    mutation({
      variables: transformToMutationData(formData),
      refetchQueries: [USER, PROFILE],
    });
    methods.reset();
  };

  const buttonRes = createOpenButton?.(handleClickOpen);

  return (
    <>
      {buttonRes}
      <DialogWithPadding
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: 'background.default',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <DialogTitle id="alert-dialog-title">{modalTitle}</DialogTitle>
          <IconButton onClick={handleCloseWithReset}>
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <FormProvider {...methods}>
            <form
              className="modal-form"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              {formFields.map(
                ({
                  name,
                  Element,
                  getLabel,
                  menuItemsList,
                  getFilteredListData,
                  getFullListData,
                  getDependentValue,
                }) => {
                  return (
                    <Element
                      name={name}
                      label={getLabel(t)}
                      menuItemsList={menuItemsList}
                      isAddOrUpdate
                      listData={
                        isUpdate && getFilteredListData
                          ? getFilteredListData(userId)
                          : getFullListData?.()
                      }
                      getDependentValue={getDependentValue}
                      readOnly={readOnlyFields?.includes(name)}
                    />
                  );
                }
              )}
              <DialogActions>
                <Button variant="outlined" onClick={handleCloseWithReset}>
                  {t('cancel')}
                </Button>
                <Button
                  variant="contained"
                  onClick={handleClose}
                  autoFocus
                  type="submit"
                  disabled={
                    isUpdate
                      ? !methods.formState.isValid
                      : !methods.formState.isDirty
                  }
                >
                  {t('confirm')}
                </Button>
              </DialogActions>
            </form>
          </FormProvider>
        </DialogContent>
      </DialogWithPadding>
    </>
  );
}

export default ButtonWithModalForm;
