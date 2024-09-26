import * as ReactRouter from 'react-router';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@apollo/client';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Button, Container } from '@mui/material';
import { CVSFormFields } from '../../variables/formsFieldsConfigs.ts';
import { CVsFormValues } from '../../types/formsTypes.ts';
import { CV, USER } from '../../apollo/queries/queries.ts';
import { DELETE_CV, UPDATE_CV } from '../../apollo/mutations/cv.ts';
import Form from '../../components/Form';
import DeleteButtonWithConfirmation from '../../components/DeleteButtonWithConfirmation';

const { useNavigate } = ReactRouter;

function CVSDetails() {
  const { cvId } = useParams();

  const navigate = useNavigate();

  const { data: userData } = useQuery(USER, {
    variables: {
      userId: localStorage.getItem('cvp_user_id'),
    },
  });

  const [updateCv] = useMutation(UPDATE_CV);
  const [deleteCv] = useMutation(DELETE_CV);

  const methods = useForm<CVsFormValues>({
    defaultValues: { name: '', education: '', description: '' },
  });

  const { data: cvData } = useQuery(CV, {
    variables: {
      cvId,
    },
    onCompleted: (data) => {
      methods.reset({
        name: data.cv.name,
        education: data.cv.education,
        description: data.cv.description,
      });
    },
  });

  const onFormSubmit = (formData) => {
    updateCv({
      variables: {
        cv: {
          cvId,
          name: formData.name,
          education: formData.education,
          description: formData.description,
        },
      },
      refetchQueries: [USER, CV],
    });
    methods.reset(formData);
  };

  const onCvDelete = () => {
    deleteCv({
      variables: {
        cv: {
          cvId,
        },
      },
      refetchQueries: [USER],
      onCompleted: () => {
        navigate('/cvs');
      },
    });
  };

  const { t } = useTranslation();

  const isMyCV = userData?.user.cvs.find(({ id }) => id === cvId);

  return (
    <Container sx={{ maxWidth: '1000px', padding: '24px' }}>
      <FormProvider {...methods}>
        <Form
          formFields={CVSFormFields}
          onSubmit={methods.handleSubmit(onFormSubmit)}
          readOnlyFields={isMyCV ? [] : ['name', 'education', 'description']}
          buttonsBlock={
            isMyCV && (
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ width: '100%' }}
                  disabled={
                    !methods.formState.isDirty && methods.formState.isValid
                  }
                >
                  {t('update')}
                </Button>
                <DeleteButtonWithConfirmation
                  onDelete={onCvDelete}
                  deletedElementName={t('cvs', { count: 1 })}
                />
              </Box>
            )
          }
        />
      </FormProvider>
    </Container>
  );
}

export default CVSDetails;
