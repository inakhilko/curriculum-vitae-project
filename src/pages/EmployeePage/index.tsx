import { SyntheticEvent, useEffect, useState } from 'react';
import * as ReactRouter from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tab } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';

const { Outlet, useNavigate } = ReactRouter;

function EmployeePage() {
  const { userId } = useParams();
  const { pathname } = useLocation();

  const [value, setValue] = useState('profile');
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(`/users/${userId}/${newValue}`);
  };

  useEffect(() => {
    setValue('profile');
    navigate(`profile`);
  }, [userId]);

  return (
    <>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="user tabs"
          variant="scrollable"
          allowScrollButtonsMobile
          sx={{
            backgroundColor: 'background.default',
            boxShadow: 'unset',
            position: 'sticky',
            top: '96px',
            zIndex: 2,
            marginBottom: '10px',
          }}
        >
          <Tab label={t('profile')} value={'profile'} />
          <Tab label={t('skills')} value={'skills'} />
          <Tab label={t('languages')} value={'languages'} />
          <Tab label={t('cvs')} value={'cvs'} />
        </TabList>
        <Outlet />
      </TabContext>
    </>
  );
}

export default EmployeePage;
