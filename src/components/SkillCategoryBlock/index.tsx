import { MouseEventHandler } from 'react';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {
  DELETE_PROFILE_SKILL,
  UPDATE_PROFILE_SKILL,
} from '../../apollo/mutations/user.ts';
import { USER } from '../../apollo/queries/queries.ts';
import { PROFILE } from '../../apollo/queries/user.ts';
import { skillsFormFields } from '../../modules/SkillsPageContent/variables.ts';
import ButtonWithModalForm from '../ButtonWithModalForm';
import SkillRange from '../../UI/SkillRange';
import { ButtonWithModalFormProps } from '../../types/formsTypes.ts';

enum SkillMastery {
  Novice = 20,
  Advanced = 40,
  Competent = 60,
  Proficient = 80,
  Expert = 100,
}

enum SkillMasteryColors {
  Novice = '#611396',
  Advanced = '#013bc4',
  Competent = '#fabc46',
  Proficient = '#24d52c',
  Expert = '#ce0000',
}

export interface SkillsFormValues {
  skill: string;
  mastery: string;
  category: string;
}

interface SkillCategoryBlockProps {
  title: string;
  skills: SkillsFormValues[];
  isDeletionProcess: boolean;
  isAuthorizedToEdit: boolean;
  buttonWithModalFormProps: Partial<ButtonWithModalFormProps<SkillsFormValues>>;
  onSkillDeletion: MouseEventHandler<HTMLButtonElement>;
}

function SkillCategoryBlock({
  title,
  skills,
  isDeletionProcess,
  isAuthorizedToEdit,
  buttonWithModalFormProps,
  onSkillDeletion,
}: SkillCategoryBlockProps) {
  if (skills?.length > 0) {
    return (
      <Container sx={{ width: '100%' }}>
        <Typography
          component="h3"
          sx={{ fontWeight: '600', fontSize: '.875rem' }}
        >
          {title}
        </Typography>
        <List
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {skills?.map(({ name, mastery, categoryId }) => {
            return (
              <ListItem
                key={name}
                sx={{
                  maxWidth: '260px',
                  color: SkillMasteryColors[mastery],
                  postion: 'relative',
                }}
              >
                {isAuthorizedToEdit ? (
                  <>
                    <ButtonWithModalForm<SkillsFormValues>
                      createOpenButton={(
                        onClick: MouseEventHandler<HTMLButtonElement>
                      ) => (
                        <Button
                          id={name}
                          onClick={onClick}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: 'inherit',
                            textTransform: 'none',
                            backgroundColor: 'background.default',
                            borderRadius: '30px',
                            padding: '10px 12px',
                            zIndex: 1,
                            '&:hover': {
                              backgroundColor: 'rgba(0, 0, 0, 0.04)',
                            },
                          }}
                          disabled={isDeletionProcess}
                        >
                          <SkillRange
                            onClick={onClick}
                            value={SkillMastery[mastery]}
                            skill={name}
                          />
                        </Button>
                      )}
                      formFields={skillsFormFields}
                      // readOnlyFields={['skill', 'category']}

                      isUpdate={false}
                      defaultFormValues={{
                        skill: name,
                        category: categoryId,
                        mastery: mastery,
                      }}
                      {...buttonWithModalFormProps}
                    />
                    <IconButton
                      id={name}
                      onClick={onSkillDeletion}
                      sx={{
                        transition: 'transform .3s, opacity .3s',
                        opacity: !isDeletionProcess ? '0' : '1',
                        transform: !isDeletionProcess
                          ? 'translateX(-40px)'
                          : '',
                      }}
                    >
                      <DeleteOutlineOutlinedIcon color="primary" />
                    </IconButton>
                  </>
                ) : (
                  <SkillRange value={SkillMastery[mastery]} skill={name} />
                )}
              </ListItem>
            );
          })}
        </List>
      </Container>
    );
  }
}

export default SkillCategoryBlock;
