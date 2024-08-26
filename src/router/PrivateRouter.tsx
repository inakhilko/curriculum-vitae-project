import * as Router from 'react-router-dom';
import UsersPage from '../pages/UsersPage';
import { useSuspenseQuery } from '@apollo/client';
import { USER } from '../apollo/queries/queries.ts';

const { Routes, Route, Navigate } = Router;

function PrivateRouter() {
  // const { data } = useSuspenseQuery(USER, {
  //   variables: {
  //     userId: '428',
  //   },
  // });
  //
  // if (data && data.user) {
  //   return <Navigate to="/auth" />;
  // }
  return (
    <Routes>
      <Route path="users" element={<UsersPage />} />
      <Route path="*" element={<Navigate to="/users" />} />
    </Routes>
  );
}

export default PrivateRouter;
