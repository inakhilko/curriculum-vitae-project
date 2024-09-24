import { FormFieldDataType } from '../../types/formsTypes.ts';
import FormSelect from '../../UI/FormSelect';
import { ADD_PROFILE_LANGUAGE } from '../../apollo/mutations/userProfile.ts';
import { client } from '../../apollo/client.ts';
import { LANGUAGES, USER } from '../../apollo/queries/queries.ts';

export const languagesFormFields: FormFieldDataType[] = [
  {
    name: 'language',
    getLabel: (t) => t('languages', { count: 1 }),
    Element: FormSelect,
    getFullListData: () =>
      client
        .readQuery({ query: LANGUAGES })
        ?.languages.map(({ name }) => ({ name, id: name })),
    getFilteredListData: (currentUser) => {
      return client
        .readQuery({ query: LANGUAGES })
        ?.languages.filter(({ name: currentLanguage }) => {
          return !client
            .readQuery({ query: USER, variables: { userId: currentUser } })
            ?.user.profile.languages.find(
              ({ name: userLanguage }) => userLanguage === currentLanguage
            );
        })
        .map(({ name }) => ({ name, id: name }));
    },
  },
  {
    name: 'proficiency',
    getLabel: (t) => t('proficiency'),
    Element: FormSelect,
    getFullListData: () => [
      { name: 'A1', id: 'A1' },
      { name: 'A2', id: 'A2' },
      { name: 'B1', id: 'B1' },
      { name: 'B2', id: 'B2' },
      { name: 'C1', id: 'C1' },
      { name: 'C2', id: 'C2' },
      { name: 'Native', id: 'Native' },
    ],
  },
];
