import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { CV, SKILL_CATEGORIES } from '../../apollo/queries/queries.ts';
import { EXPORT_CV_PDF } from '../../apollo/mutations/cv.ts';
import { filterArrayWithObjects } from '../../helpers/skillsFilterHelpers.ts';
import CVPreviewBlock from '../../components/CVPreviewBlock';
import Loader from '../../UI/Loader';

function CVSPreview() {
  const { cvId } = useParams();

  const { data: cvData, loading } = useQuery(CV, {
    variables: {
      cvId,
    },
  });

  const { data: skillCategories } = useQuery(SKILL_CATEGORIES);

  const [exportPdf] = useMutation(EXPORT_CV_PDF);

  const { t } = useTranslation();

  const isTablet = useMediaQuery('(max-width: 700px)');

  const onExportClick = async (event) => {
    if (event.target.id === 'export-cv-button') {
      event.target.disabled = true;
      const { data } = await exportPdf({
        variables: {
          pdf: {
            html:
              document.head.innerHTML +
              event.currentTarget.innerHTML.replace(
                /<button[^>]*>.*?<\/button>/g,
                ''
              ),
            margin: {
              top: '70',
              bottom: '70',
              right: '60',
              left: '60',
            },
          },
        },
      });
      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${data.exportPdf}`;
      link.download = `${cvData?.cv.name}.pdf` ?? 'cv.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      event.target.disabled = false;
    }
  };

  if (loading) return <Loader />;

  return (
    <Container
      sx={{ width: '100%', maxWidth: '1200px' }}
      onClick={onExportClick}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: isTablet ? 'flex-start' : 'space-between',
          alignItems: isTablet ? 'flex-start' : 'center',
          flexWrap: 'wrap',
          width: '100%',
          marginBottom: '20px',
          flexDirection: isTablet ? 'column' : 'row',
          gap: isTablet ? '20px' : 'unset',
        }}
      >
        <Box>
          <Typography
            component="h2"
            sx={{
              fontSize: '2.25rem',
              fontWeight: '600',
              marginBottom: '10px',
            }}
          >
            {cvData.cv.user.profile.full_name}
          </Typography>
          <Typography sx={{ textTransform: 'uppercase' }}>
            {cvData.cv.user.position_name}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          type="download"
          id="export-cv-button"
          sx={{
            '&[disabled]': {
              opacity: '0.5',
              cursor: 'unset',
              '&:hover': {
                backgroundColor: 'transparent',
                borderColor: 'rgba(206, 0, 0, 0.5)',
              },
            },
          }}
        >
          {`${t('export')} ${t('cvs', { count: 1 })}`}
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          flexDirection: isTablet ? 'column' : 'row',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: isTablet ? '100%' : '240px',
            borderRight: isTablet ? 'none' : '2px solid #ce0000',
            borderBottom: isTablet ? '2px solid #ce0000' : 'none',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <CVPreviewBlock title={t('education')}>
            {cvData.cv.education}
          </CVPreviewBlock>
          <CVPreviewBlock title={`${t('languages')} ${t('proficiency')}`}>
            {cvData.cv.languages.map(({ name, proficiency }) => (
              <Typography
                key={name}
                component="span"
              >{`${name} - ${proficiency}`}</Typography>
            ))}
          </CVPreviewBlock>
        </Box>
        <Box
          sx={{
            flex: 1,
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <CVPreviewBlock title={cvData.cv.name}>
            {cvData.cv.description}
          </CVPreviewBlock>
          {skillCategories &&
            [...skillCategories.skillCategories, { name: t('other'), id: null }]
              .map(({ name, id }) => {
                const currentCategorySkills = filterArrayWithObjects(
                  cvData.cv.skills,
                  'categoryId',
                  id
                ).map(({ name }) => name);
                if (currentCategorySkills.length > 0) {
                  return (
                    <CVPreviewBlock title={name}>
                      {currentCategorySkills.join(', ')}
                    </CVPreviewBlock>
                  );
                }
                return '';
              })
              .filter((element) => element !== '')}
        </Box>
      </Box>
    </Container>
  );
}

export default CVSPreview;
