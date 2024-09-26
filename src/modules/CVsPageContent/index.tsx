import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { CVSFormFields } from './variables.ts';
import { USER } from '../../apollo/queries/queries.ts';
import { CREATE_CV } from '../../apollo/mutations/user.ts';
import ButtonWithModalForm from '../../components/ButtonWithModalForm';
import TableTemplate from '../../components/TableTemplate';
import { CVsFormValues } from '../../types/formsTypes.ts';

function CVs() {
  const { userId } = useParams();
  const { t } = useTranslation();
  const transformToMutationData = (formData) => ({
    cv: {
      userId,
      name: formData.name,
      education: formData.education,
      description: formData.description,
    },
  });
  return (
    <TableTemplate
      columns={[
        { id: 'name', label: 'Name', sortable: true },
        { id: 'description', label: 'Description', sortable: false },
        { id: 'more', label: '', sortable: false },
      ]}
      query={USER}
      queryOptions={{ variables: { userId } }}
      searchFunction={(data, searchedData) => {
        return data?.user.cvs.filter((cv) => {
          if (
            (cv.name === null || cv.description === null) &&
            searchedData === ''
          ) {
            return true;
          }
          return (
            cv.name?.toLowerCase().includes(searchedData.toLowerCase()) ||
            cv.description?.toLowerCase().includes(searchedData.toLowerCase())
          );
        });
      }}
      createRows={(data) => {
        return data?.map((cv) => {
          return {
            id: cv.id,
            name: cv.name,
            description: cv.description,
          };
        });
      }}
      addButton={
        <ButtonWithModalForm<CVsFormValues>
          createOpenButton={(onClick) => (
            <Button
              onClick={onClick}
              variant="outlined"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                borderRadius: '20px',
              }}
            >
              <AddOutlinedIcon />
              {`${t('add')} ${t('cvs', { count: 1 })}`}
            </Button>
          )}
          modalTitle={`${t('add')} ${t('cvs', { count: 1 })}`}
          submitMutation={CREATE_CV}
          formFields={CVSFormFields}
          isUpdate={true}
          defaultFormValues={{
            name: '',
            education: '',
            description: '',
          }}
          transformToMutationData={transformToMutationData}
        />
      }
      getCellContent={(
        data,
        columnId: string,
        onClick: (id: string) => void
      ) => {
        if (columnId === 'more') {
          return (
            <IconButton onClick={() => onClick(`/cvs/${data['id']}`)}>
              <ArrowForwardIosOutlinedIcon
                sx={{ width: '1rem', height: '1rem' }}
              />
            </IconButton>
          );
        }
        return data[columnId];
      }}
      searchBlockTop="144px"
      tableTop="184px"
    />
  );
}

export default CVs;
