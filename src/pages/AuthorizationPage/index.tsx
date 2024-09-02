import { SyntheticEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as ReactRouter from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tab } from '@mui/material';
import { TabList, TabContext } from '@mui/lab';
import './AuthorizationPage.styles.scss';

const { Outlet, useNavigate } = ReactRouter;

function AuthorizationPage() {
  const { pathname } = useLocation();

  const [value, setValue] = useState(
    pathname.endsWith('signup') ? 'signup' : 'login'
  );
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(`/auth/${newValue}`, { replace: true });
  };

  return (
    <div className="auth-page">
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="authorization tabs"
          centered
        >
          <Tab label={t('login')} value={'login'} />
          <Tab label={t('signup')} value={'signup'} />
        </TabList>
        <Outlet />
      </TabContext>
    </div>
  );
}

export default AuthorizationPage;
