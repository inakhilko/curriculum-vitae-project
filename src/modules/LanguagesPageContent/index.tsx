import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@apollo/client';
import { Box, Button, Container, IconButton } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { LANGUAGES, USER } from '../../apollo/queries/queries.ts';
import { PROFILE } from '../../apollo/queries/user.ts';
import {
  ADD_PROFILE_LANGUAGE,
  DELETE_PROFILE_LANGUAGE,
  UPDATE_PROFILE_LANGUAGE,
} from '../../apollo/mutations/user.ts';
import { languagesFormFields } from './variables.ts';
import ButtonWithModalForm from '../../components/ButtonWithModalForm';
import LanguageDataBlock from '../../components/LanguageDataBlock';
import AddAndDeleteBlock from '../../components/AddAndDeleteBlock';

interface LanguagesFormValues {
  proficiency: string;
  language: string;
}

function Languages() {
  const { data } = useQuery(LANGUAGES);

  const { userId } = useParams();

  const { data: userData } = useQuery(USER, { variables: { userId } });

  const [deleteLanguage] = useMutation(DELETE_PROFILE_LANGUAGE);

  const { t } = useTranslation();

  const [isDeletionProcess, setIsDeletionProcess] = useState(false);

  const transformToMutationData = (formData) => ({
    language: {
      userId,
      name: formData.language,
      proficiency: formData.proficiency,
    },
  });

  const isMyProfile = userId === localStorage.getItem('cvp_user_id');

  const onLanguageDeletion = (event) => {
    deleteLanguage({
      variables: {
        language: {
          userId: userId,
          name: event.currentTarget.id,
        },
      },
      refetchQueries: [USER, PROFILE],
    });
  };

  useEffect(() => {
    userData?.user.profile.languages.length === 0 &&
      setIsDeletionProcess(false);
  }, [userData, setIsDeletionProcess]);

  return (
    <Container
      sx={{
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        width: '100%',
        maxWidth: '1200px',
      }}
    >
      {userId === localStorage.getItem('cvp_user_id') && (
        <AddAndDeleteBlock<LanguagesFormValues>
          isDeletionProcess={isDeletionProcess}
          setIsDeletionProcess={setIsDeletionProcess}
          transformToMutationData={transformToMutationData}
          addedWord={t('languages', { count: 1 })}
          submitMutation={ADD_PROFILE_LANGUAGE}
          defaultFormValues={{
            language: '',
            proficiency: '',
          }}
          formFields={languagesFormFields}
          isNoToDelete={userData?.user.profile.languages.length > 0}
        />
      )}

      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        {userData?.user.profile.languages.map(({ name, proficiency }) => {
          if (isMyProfile) {
            return (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  maxWidth: '240px',
                  width: '100%',
                  position: 'relative',
                }}
              >
                <ButtonWithModalForm<LanguagesFormValues>
                  createOpenButton={(onClick) => {
                    return (
                      <Button
                        variant="text"
                        onClick={onClick}
                        sx={{
                          display: 'flex',
                          maxWidth: '200px',
                          width: '100%',
                          color: 'inherit',
                          textTransform: 'none',
                          borderRadius: '30px',
                          zIndex: 2,
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                          },
                        }}
                      >
                        <LanguageDataBlock
                          key={name}
                          name={name}
                          proficiency={proficiency}
                          isDeletionProcess={isDeletionProcess}
                        />
                      </Button>
                    );
                  }}
                  modalTitle={`${t('update')} ${t('languages', { count: 1 })}`}
                  submitMutation={UPDATE_PROFILE_LANGUAGE}
                  transformToMutationData={transformToMutationData}
                  formFields={languagesFormFields}
                  readOnlyFields={['language']}
                  isUpdate={false}
                  defaultFormValues={{
                    language: name,
                    proficiency: proficiency,
                  }}
                />
                <IconButton
                  onClick={onLanguageDeletion}
                  id={name}
                  sx={{
                    zIndex: 1,
                    transition: 'transform .3s, opacity .3s',
                    opacity: !isDeletionProcess ? '0' : '1',
                    transform: !isDeletionProcess ? 'translateX(-40px)' : '',
                  }}
                >
                  <DeleteOutlineOutlinedIcon color="primary" />
                </IconButton>
              </Box>
            );
          }
          return (
            <LanguageDataBlock
              key={name}
              name={name}
              proficiency={proficiency}
            />
          );
        })}
      </Container>
    </Container>
  );
}

export default Languages;
