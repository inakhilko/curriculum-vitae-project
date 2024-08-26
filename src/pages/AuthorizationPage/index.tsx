import { SyntheticEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as ReactRouter from 'react-router-dom';
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

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(`/auth/${newValue}`, { replace: true });
  };

  return (
    <div className="auth-page">
      <TabContext value={value}>
        <div className="auth-page__tabs">
          <TabList
            onChange={handleChange}
            aria-label="authorization tabs"
            centered
          >
            <Tab label="Login" value={'login'} />
            <Tab label="Sign Up" value={'signup'} />
          </TabList>
        </div>
        <Outlet />
      </TabContext>
    </div>
  );
}

export default AuthorizationPage;
