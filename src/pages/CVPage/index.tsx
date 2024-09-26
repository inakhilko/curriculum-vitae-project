import { SyntheticEvent, useEffect, useState } from 'react';
import * as ReactRouter from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import { TabContext } from '@mui/lab';
import PrivatePageTabList from '../../components/PrivatePageTabList';
import { cvsPageTabList } from './variables.ts';

const { Outlet, useNavigate } = ReactRouter;

enum CVPageTabs {
  details = 'details',
  skills = 'skills',
  preview = 'preview',
}

function CVPage() {
  const { cvId } = useParams();

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [value, setValue] = useState(
    CVPageTabs[pathname.split('/').at(-1)] || 'details'
  );

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(`/cvs/${cvId}/${newValue}`);
  };

  useEffect(() => {
    navigate(value);
  }, [cvId]);

  return (
    <>
      <TabContext value={value}>
        <PrivatePageTabList
          handleChange={handleChange}
          tabData={cvsPageTabList}
        />
        <Outlet />
      </TabContext>
    </>
  );
}

export default CVPage;
