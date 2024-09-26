import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@apollo/client';
import { Container } from '@mui/material';
import {
  CV,
  SKILL_CATEGORIES,
  SKILLS,
  USER,
} from '../../apollo/queries/queries.ts';
import {
  ADD_CV_SKILL,
  DELETE_CV_SKILL,
  UPDATE_CV_SKILL,
} from '../../apollo/mutations/cv.ts';
import { skillsFormFields } from '../../variables/formsFieldsConfigs.ts';
import { filterArrayWithObjects } from '../../helpers/skillsFilterHelpers.ts';
import AddAndDeleteBlock from '../../components/AddAndDeleteBlock';
import SkillCategoryBlock, {
  SkillsFormValues,
} from '../../components/SkillCategoryBlock';
import Loader from '../../UI/Loader';

function CVSSkills() {
  const { data: skillCategories, loading } = useQuery(SKILL_CATEGORIES);
  const { data: skills } = useQuery(SKILLS);

  const { cvId } = useParams();

  const { data: cvData } = useQuery(CV, {
    variables: {
      cvId,
    },
  });

  const { data: userData } = useQuery(USER, {
    variables: {
      userId: localStorage.getItem('cvp_user_id'),
    },
  });

  const { t } = useTranslation();

  const [isDeletionProcess, setIsDeletionProcess] = useState(false);

  const transformToMutationData = (formData) => ({
    skill: {
      cvId: cvId,
      name: formData.skill,
      categoryId: formData.category,
      mastery: formData.mastery,
    },
  });

  const [deleteSkill] = useMutation(DELETE_CV_SKILL);

  const onSkillDeletion = (event) => {
    deleteSkill({
      variables: {
        skill: {
          cvId,
          name: event.currentTarget.id,
        },
      },
      refetchQueries: [USER, CV],
    });
  };

  const isMyCV = userData?.user.cvs.find(({ id }) => id === cvId);

  useEffect(() => {
    cvData?.cv.skills.length === 0 && setIsDeletionProcess(false);
  }, [cvData, setIsDeletionProcess]);

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
      {isMyCV && (
        <AddAndDeleteBlock<SkillsFormValues>
          isDeletionProcess={isDeletionProcess}
          setIsDeletionProcess={setIsDeletionProcess}
          transformToMutationData={transformToMutationData}
          addedWord={t('skills', { count: 1 })}
          submitMutation={ADD_CV_SKILL}
          defaultFormValues={{ skill: '', category: '', mastery: '' }}
          formFields={skillsFormFields}
          isNoToDelete={cvData?.cv.skills.length > 0}
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
                cvData?.cv.skills,
                'categoryId',
                id
              )}
              isDeletionProcess={isDeletionProcess}
              isAuthorizedToEdit={isMyCV}
              onSkillDeletion={onSkillDeletion}
              buttonWithModalFormProps={{
                transformToMutationData,
                modalTitle: `${t('update')} ${t('skills', { count: 1 })}`,
                readOnlyFields: ['skill', 'category'],
                submitMutation: UPDATE_CV_SKILL,
              }}
            />
          );
        })
      )}
    </Container>
  );
}

export default CVSSkills;
