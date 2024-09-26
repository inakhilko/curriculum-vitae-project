import { FormFieldDataType } from '../types/formsTypes.ts';
import FormSelect from '../UI/FormSelect';
import { client } from '../apollo/client.ts';
import {
  CV,
  SKILL_CATEGORIES,
  SKILLS,
  USER,
} from '../apollo/queries/queries.ts';
import FormInput from '../UI/FormInput';
import FormTextArea from '../UI/FormTextArea';

export const skillsFormFields: FormFieldDataType[] = [
  {
    name: 'skill',
    getLabel: (t) => t('skills', { count: 1 }),
    Element: FormSelect,
    getFullListData: () =>
      client
        .readQuery({ query: SKILLS })
        ?.skills.map(({ name }) => ({ name, id: name })),
    getFilteredListData: (currentUser, currentCv) => {
      return client
        .readQuery({ query: SKILLS })
        ?.skills.filter(({ name: currentSkill }) => {
          if (currentUser) {
            return !client
              .readQuery({ query: USER, variables: { userId: currentUser } })
              ?.user.profile.skills.find(
                ({ name: userSkill }) => userSkill === currentSkill
              );
          }
          if (currentCv) {
            return !client
              .readQuery({ query: CV, variables: { cvId: currentCv } })
              ?.cv.skills.find(({ name: cvSkill }) => cvSkill === currentSkill);
          }
        })
        .map(({ name }) => ({ name, id: name }));
    },
  },
  {
    name: 'category',
    getLabel: (t) => t('category', { count: 1 }),
    Element: FormSelect,
    getDependentValue: (watchFunction) => {
      return client.readQuery({ query: SKILLS })?.skills.find((skill) => {
        return skill.name === watchFunction('skill');
      })?.category.id;
    },
    getFullListData: () =>
      client.readQuery({ query: SKILL_CATEGORIES })?.skillCategories,
  },
  {
    name: 'mastery',
    getLabel: (t) => t('mastery'),
    Element: FormSelect,
    getFullListData: () => [
      { name: 'Novice', id: 'Novice' },
      { name: 'Advanced', id: 'Advanced' },
      { name: 'Competent', id: 'Competent' },
      { name: 'Proficient', id: 'Proficient' },
      { name: 'Expert', id: 'Expert' },
    ],
  },
];

export const CVSFormFields: FormFieldDataType[] = [
  {
    name: 'name',
    getLabel: (t) => t('name'),
    Element: FormInput,
  },
  {
    name: 'education',
    getLabel: (t) => t('education'),
    Element: FormInput,
  },
  {
    name: 'description',
    getLabel: (t) => t('description'),
    Element: FormTextArea,
  },
];
