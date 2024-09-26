import { useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { useQuery } from '@apollo/client';
import { PROFILE } from '../../apollo/queries/user.ts';
import StyledLink from '../../UI/StyledLink';
import { CV } from '../../apollo/queries/queries.ts';

function PrivateBreadcrumbs() {
  const { pathname } = useLocation();
  const { userId, cvId } = useParams();

  const { data: userProfile } = useQuery(PROFILE, {
    variables: {
      userId: userId,
    },
  });
  const { data: cvData } = useQuery(CV, {
    variables: {
      cvId: cvId,
    },
  });

  const getDynamicBreadcrumbValue = (item) => {
    if (item === userId) {
      return (
        <>
          <PersonIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {userProfile?.profile.full_name}
        </>
      );
    }
    if (item === cvId) {
      return cvData?.cv.name;
    }
    return t(item === 'users' ? 'employees' : item);
  };

  const breadcrumbs = pathname.split('/').filter((item) => item !== '');
  const { t } = useTranslation();

  return (
    <Breadcrumbs
      separator="›"
      aria-label="breadcrumb"
      sx={{
        mb: 2,
        position: 'sticky',
        top: '72px',
        backgroundColor: 'background.default',
        zIndex: 1,
      }}
    >
      <StyledLink path="/">
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        {t('home')}
      </StyledLink>
      {breadcrumbs.map((item, index) => {
        const content = getDynamicBreadcrumbValue(item);
        if (index === breadcrumbs.length - 1) {
          return (
            <Typography
              sx={{
                color:
                  item === userId || item === cvId
                    ? 'primary.main'
                    : 'text.secondary',
                display: 'flex',
                alignItems: 'center',
              }}
              key={item}
            >
              {content}
            </Typography>
          );
        }
        return (
          <StyledLink
            path={`/${item}`}
            isRed={item === userId || item === cvId}
            key={item}
          >
            {content}
          </StyledLink>
        );
      })}
    </Breadcrumbs>
  );
}

export default PrivateBreadcrumbs;
