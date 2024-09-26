import { SyntheticEvent, useEffect, useState } from 'react';
import * as ReactRouter from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TabContext } from '@mui/lab';
import PrivatePageTabList from '../../components/PrivatePageTabList';
import { employeePageTabList } from './variables.ts';

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
        <PrivatePageTabList
          handleChange={handleChange}
          tabData={employeePageTabList}
        />
        <Outlet />
      </TabContext>
    </>
  );
}

export default EmployeePage;
