import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@apollo/client';
import { Container } from '@mui/material';
import {
  SKILL_CATEGORIES,
  SKILLS,
  USER,
} from '../../apollo/queries/queries.ts';
import {
  ADD_PROFILE_SKILL,
  DELETE_PROFILE_SKILL,
  UPDATE_PROFILE_SKILL,
} from '../../apollo/mutations/user.ts';
import { skillsFormFields } from './variables.ts';
import { filterArrayWithObjects } from '../../helpers/skillsFilterHelpers.ts';
import SkillCategoryBlock, {
  SkillsFormValues,
} from '../../components/SkillCategoryBlock';
import AddAndDeleteBlock from '../../components/AddAndDeleteBlock';
import Loader from '../../UI/Loader';
import { PROFILE } from '../../apollo/queries/user.ts';

function Skills() {
  const { data: skillCategories, loading } = useQuery(SKILL_CATEGORIES);
  const { data: skills } = useQuery(SKILLS);

  const { userId } = useParams();

  const { data: userData } = useQuery(USER, {
    variables: {
      userId,
    },
  });

  const { t } = useTranslation();

  const [isDeletionProcess, setIsDeletionProcess] = useState(false);

  const transformToMutationData = (formData) => ({
    skill: {
      userId: userId,
      name: formData.skill,
      categoryId: formData.category,
      mastery: formData.mastery,
    },
  });

  const [deleteSkill] = useMutation(DELETE_PROFILE_SKILL);

  const onSkillDeletion = (event) => {
    deleteSkill({
      variables: {
        skill: {
          userId,
          name: event.currentTarget.id,
        },
      },
      refetchQueries: [USER, PROFILE],
    });
  };

  const isMySkillsPage = userId === localStorage.getItem('cvp_user_id');

  useEffect(() => {
    userData?.user.profile.skills.length === 0 && setIsDeletionProcess(false);
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
      {isMySkillsPage && (
        <AddAndDeleteBlock<SkillsFormValues>
          isDeletionProcess={isDeletionProcess}
          setIsDeletionProcess={setIsDeletionProcess}
          transformToMutationData={transformToMutationData}
          addedWord={t('skills', { count: 1 })}
          submitMutation={ADD_PROFILE_SKILL}
          defaultFormValues={{
            skill: '',
            category: '',
            mastery: '',
          }}
          formFields={skillsFormFields}
          isNoToDelete={userData?.user.profile.skills.length > 0}
        />
      )}
      {loading ? (
        <Loader />
      ) : (
        [
          ...skillCategories.skillCategories,
          { name: t('other'), id: null },
        ].map(({ name, id }) => {
          return (
            <SkillCategoryBlock
              title={name}
              skills={filterArrayWithObjects(
                userData?.user.profile.skills,
                'categoryId',
                id
              )}
              isDeletionProcess={isDeletionProcess}
              isAuthorizedToEdit={isMySkillsPage}
              onSkillDeletion={onSkillDeletion}
              buttonWithModalFormProps={{
                transformToMutationData,
                modalTitle: `${t('update')} ${t('skills', { count: 1 })}`,
                readOnlyFields: ['skill', 'category'],
                submitMutation: UPDATE_PROFILE_SKILL,
              }}
            />
          );
        })
      )}
    </Container>
  );
}

export default Skills;
