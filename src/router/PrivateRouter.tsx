import * as Router from 'react-router-dom';
import UsersPage from '../pages/UsersPage';
import EmployeePage from '../pages/EmployeePage';

const { Routes, Route, Navigate } = Router;

function PrivateRouter() {
  return (
    <Routes>
      <Route path="users" element={<UsersPage />} />
      <Route path="users/:userId" element={<EmployeePage />}>
        {/*  <Route path="profile" element={} />*/}
        {/*  <Route path="skills" element={} />*/}
        {/*  <Route path="languages" element={} />*/}
        {/*  <Route path="cvs" element={} />*/}
      </Route>
      {/*<Route path="projects" element={< />} />*/}
      {/*<Route path="cvs" element={< />}>*/}
      {/*  <Route path=":cvId" element={}>*/}
      {/*    <Route path="skills" element={} />*/}
      {/*    <Route path="details" element={} />*/}
      {/*    <Route path="projects" element={} />*/}
      {/*    <Route path="preview" element={} />*/}
      {/*  </Route>*/}
      {/*</Route>*/}
      {/*  <Route path="departments" element={< />} />*/}
      {/*  <Route path="positions" element={< />} />*/}
      {/*  <Route path="skills" element={< />} />*/}
      {/*  <Route path="languages" element={< />} />*/}

      <Route path="*" element={<Navigate to="/users" />} />
    </Routes>
  );
}

export default PrivateRouter;
