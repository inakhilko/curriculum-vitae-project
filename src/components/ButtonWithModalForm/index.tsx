import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { CV, USER } from '../../apollo/queries/queries.ts';
import { PROFILE } from '../../apollo/queries/user.ts';
import { ButtonWithModalFormProps } from '../../types/formsTypes.ts';
import './ButtonWithModalForm.styles.scss';
import Form from '../Form';
import ButtonWithModal from '../ButtonWithModal';

function ButtonWithModalForm<FormValues>({
  defaultFormValues,
  formFields,
  modalTitle,
  submitMutation,
  createOpenButton,
  transformToMutationData,
  isUpdate,
  readOnlyFields,
}: ButtonWithModalFormProps<FormValues>) {
  const [mutation] = useMutation(submitMutation);
  const { userId } = useParams();

  const methods = useForm({
    defaultValues: defaultFormValues,
  });

  const { t } = useTranslation();

  const onSubmit = (formData) => {
    mutation({
      variables: transformToMutationData(formData),
      refetchQueries: [USER, PROFILE, CV],
    });
    if (!isUpdate) {
      methods.reset(formData);
    } else {
      methods.reset();
    }
  };

  const createCancelButton = (closeModal) => (
    <Button
      onClick={() => {
        methods.reset();
        closeModal();
      }}
    >
      {t('cancel')}
    </Button>
  );

  const createConfirmButton = (closeModal) => (
    <Button
      variant="contained"
      onClick={() => {
        methods.handleSubmit(onSubmit)();
        closeModal();
      }}
      autoFocus
      type="button"
      disabled={
        isUpdate ? !methods.formState.isValid : !methods.formState.isDirty
      }
    >
      {t('confirm')}
    </Button>
  );

  return (
    <>
      <ButtonWithModal
        createOpenButton={createOpenButton}
        modalTitle={modalTitle}
        onCloseModal={methods.reset}
        createCancelButton={createCancelButton}
        createConfirmButton={createConfirmButton}
      >
        <FormProvider {...methods}>
          <Form
            formFields={formFields}
            isUpdate={isUpdate}
            onSubmit={methods.handleSubmit(onSubmit)}
            readOnlyFields={readOnlyFields}
          />
        </FormProvider>
      </ButtonWithModal>
    </>
  );
}

export default ButtonWithModalForm;
